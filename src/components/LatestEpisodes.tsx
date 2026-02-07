'use client';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import styles from './LatestEpisodes.module.css';

export default function LatestEpisodes() {
    const episodes = [
        {
            id: 1,
            title: 'Episode 45 - New Year Special',
            date: 'January 27, 2026',
            thumbnail: '/placeholder-episode.jpg',
            duration: '2:15:30'
        },
        {
            id: 2,
            title: 'Episode 44 - Year in Review',
            date: 'December 30, 2025',
            thumbnail: '/placeholder-episode.jpg',
            duration: '2:05:15'
        },
        {
            id: 3,
            title: 'Episode 43 - Holiday Vibes',
            date: 'December 23, 2025',
            thumbnail: '/placeholder-episode.jpg',
            duration: '2:10:45'
        },
        {
            id: 4,
            title: 'Episode 42 - Special Guest',
            date: 'December 16, 2025',
            thumbnail: '/placeholder-episode.jpg',
            duration: '2:20:00'
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.header}
                >
                    <h2 className={styles.title}>LATEST EPISODES</h2>
                    <div className={styles.divider} />
                </motion.div>

                <div className={styles.grid}>
                    {episodes.map((episode, index) => (
                        <motion.article
                            key={episode.id}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={styles.thumbnail}>
                                <div className={styles.placeholderImage}>
                                    <Play size={48} />
                                </div>
                                <div className={styles.duration}>{episode.duration}</div>
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.episodeTitle}>{episode.title}</h3>
                                <p className={styles.date}>{episode.date}</p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
