'use client';
import { motion } from 'framer-motion';
import styles from './LatestEpisodes.module.css';

const EASE_LUXURY = [0.16, 1, 0.3, 1] as const;

export default function LatestEpisodesClient() {
    return (
        <section id="episodes" className={`section ${styles.section}`}>
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ staggerChildren: 0.12 }}
                >
                    <motion.span
                        className={`slate-eyebrow ${styles.eyebrow}`}
                        variants={{
                            hidden: { opacity: 0, y: 24 },
                            show: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.9, ease: EASE_LUXURY }}
                    >
                        <span className="slate-dot" />
                        Now showing
                    </motion.span>
                    <motion.h2
                        className={`neon-title ${styles.title}`}
                        variants={{
                            hidden: { opacity: 0, y: 24 },
                            show: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.9, ease: EASE_LUXURY }}
                    >
                        Latest episodes
                    </motion.h2>
                    <motion.p
                        className={styles.subtitle}
                        variants={{
                            hidden: { opacity: 0, y: 24 },
                            show: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.9, ease: EASE_LUXURY }}
                    >
                        Watch the latest Vegas Up Now episodes directly from the studio.
                    </motion.p>
                </motion.div>

                <motion.div
                    className={styles.playerWrapper}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.9, ease: EASE_LUXURY, delay: 0.1 }}
                >
                    <div className={styles.marquee} aria-hidden="true">
                        <span className={styles.marqueeTally} />
                        <span className={styles.marqueeLabel}>On air</span>
                        <span className={styles.marqueeDot}>&#9670;</span>
                        <span className={styles.marqueeMeta}>Featured broadcast</span>
                        <span className={styles.marqueeDot}>&#9670;</span>
                        <span className={styles.marqueeMeta}>Vegas Up Now</span>
                    </div>
                    <span className={`${styles.corner} ${styles.cornerTopLeft}`} aria-hidden="true" />
                    <span className={`${styles.corner} ${styles.cornerTopRight}`} aria-hidden="true" />
                    <span className={`${styles.corner} ${styles.cornerBottomLeft}`} aria-hidden="true" />
                    <span className={`${styles.corner} ${styles.cornerBottomRight}`} aria-hidden="true" />
                    <div className={styles.frame}>
                        <span className={`${styles.letterbox} ${styles.letterboxTop}`} aria-hidden="true" />
                        <span className={`${styles.letterbox} ${styles.letterboxBottom}`} aria-hidden="true" />
                        <iframe
                            src="https://www.youtube.com/embed?listType=playlist&list=UU_oVuCQmHJkAKhYOqmMgXmQ"
                            title="Vegas Up Now - Latest Episodes"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className={styles.mainPlayer}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
