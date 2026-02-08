'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpRight, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './LatestEpisodes.module.css';

interface Video {
    id: string;
    title: string;
    link: string;
    published: string;
    thumbnail: string;
}

interface LatestEpisodesClientProps {
    videos: Video[];
}

export default function LatestEpisodesClient({ videos = [] }: LatestEpisodesClientProps) {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    // Default Fallback Data if fetch fails
    const fallbackEpisodes = [
        {
            id: '1',
            title: 'Ep. 51 - LIVE Experience',
            date: 'Jan 25, 2026',
            image: 'https://img.youtube.com/vi/R_0G_1_Q7zE/maxresdefault.jpg',
            duration: 'LIVE',
            videoUrl: 'https://www.youtube.com/embed/R_0G_1_Q7zE'
        },
        {
            id: '2',
            title: 'Ep. 50 - Year in Review',
            date: 'Dec 30, 2025',
            image: 'https://img.youtube.com/vi/f6qWd-p709U/maxresdefault.jpg',
            duration: '2:05:15',
            videoUrl: 'https://www.youtube.com/embed/f6qWd-p709U'
        },
        {
            id: '3',
            title: 'Ep. 49 - Urban Frequency',
            date: 'Dec 23, 2025',
            image: 'https://img.youtube.com/vi/Kz6E0qX8W6k/maxresdefault.jpg',
            duration: '2:10:45',
            videoUrl: 'https://www.youtube.com/embed/Kz6E0qX8W6k'
        },
        {
            id: '4',
            title: 'Ep. 48 - Radio Culture',
            date: 'Dec 16, 2025',
            image: 'https://img.youtube.com/vi/f6qWd-p709U/hqdefault.jpg',
            duration: '2:20:00',
            videoUrl: 'https://www.youtube.com/embed/videoseries?list=UU9P_60_D2B_M_iN0_W_j_S_Q&index=3'
        }
    ];

    // Use fetched videos if available, otherwise fallback
    const episodes = videos.length > 0 ? videos.map((video: Video) => ({
        id: video.id,
        title: video.title,
        date: video.published, // Assuming format is handled in fetch
        image: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
        duration: 'On Demand', // RSS doesn't give duration, so we use a placeholder
        videoUrl: `https://www.youtube.com/embed/${video.id}`
    })) : fallbackEpisodes;

    // Handle body scroll locking and media coordination
    useEffect(() => {
        if (activeVideo) {
            console.log("Video active: dispatching media:play");
            document.body.style.overflow = 'hidden';
            // Signal radio to pause
            window.dispatchEvent(new CustomEvent('media:play', { detail: { source: 'video' } }));
        } else {
            document.body.style.overflow = 'auto';
        }

        const handleExternalPlay = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            if (detail?.source === 'radio') {
                setActiveVideo(null);
            }
        };

        window.addEventListener('media:play', handleExternalPlay);
        return () => window.removeEventListener('media:play', handleExternalPlay);
    }, [activeVideo]);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className={styles.eyebrow}>PREVIOUS BROADCASTS</span>
                    <h2 className={styles.title}>LATEST EPISODES</h2>
                    <p className={styles.subtitle}>Relive the energy and insights from the lounge</p>
                </motion.div>

                <div className={styles.episodesGrid}>
                    {episodes.map((episode, index) => (
                        <motion.div
                            key={episode.id}
                            className={styles.episodeCard}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            onClick={() => setActiveVideo(episode.videoUrl)}
                        >
                            <div className={styles.imageWrapper}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={episode.image}
                                        alt={episode.title}
                                        fill
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.imageOverlay} />
                                <div className={styles.playIcon}>
                                    <Play fill="currentColor" size={24} />
                                </div>
                                <span className={styles.durationBadge}>{episode.duration}</span>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.meta}>
                                    <span className={styles.date}>{episode.date}</span>
                                    <ArrowUpRight size={14} className={styles.arrow} />
                                </div>
                                <h3 className={styles.episodeTitle}>{episode.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {activeVideo && (
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveVideo(null)}
                    >
                        <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                            <button className={styles.closeButton} onClick={() => setActiveVideo(null)}>
                                <X size={32} />
                            </button>
                            <div className={styles.videoWrapper}>
                                <iframe
                                    src={`${activeVideo}${activeVideo.includes('?') ? '&' : '?'}autoplay=1`}
                                    title="Episode Player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
