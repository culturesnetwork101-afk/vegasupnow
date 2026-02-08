'use client';
import { motion } from 'framer-motion';
import styles from './LatestEpisodes.module.css';

export default function LatestEpisodesClient() {
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
                    <p className={styles.subtitle}>Watch the latest Vegas Up Now episodes directly from the studio.</p>
                </motion.div>

                <motion.div
                    className={styles.playerWrapper}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <iframe
                        src="https://www.youtube.com/embed?listType=playlist&list=UU_oVuCQmHJkAKhYOqmMgXmQ"
                        title="Vegas Up Now - Latest Episodes"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className={styles.mainPlayer}
                    />
                </motion.div>
            </div>
        </section>
    );
}
