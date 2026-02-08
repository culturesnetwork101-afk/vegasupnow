'use client';
import { motion } from 'framer-motion';
import { Play, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import styles from './LatestEpisodes.module.css';

export default function LatestEpisodes() {
    const episodes = [
        {
            id: 1,
            title: 'Ep. 51 - New Year Special',
            date: 'Jan 25, 2026',
            image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop',
            duration: '2:15:30'
        },
        {
            id: 2,
            title: 'Ep. 50 - Year in Review',
            date: 'Dec 30, 2025',
            image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop',
            duration: '2:05:15'
        },
        {
            id: 3,
            title: 'Ep. 49 - Holiday Vibes',
            date: 'Dec 23, 2025',
            image: 'https://images.unsplash.com/photo-1514525253344-f85671742981?q=80&w=2070&auto=format&fit=crop',
            duration: '2:10:45'
        },
        {
            id: 4,
            title: 'Ep. 48 - Special Guest',
            date: 'Dec 16, 2025',
            image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop',
            duration: '2:20:00'
        }
    ];

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
        </section>
    );
}
