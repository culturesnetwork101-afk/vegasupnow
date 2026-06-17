'use client';
import { motion } from 'framer-motion';
import { Mic, Users } from 'lucide-react';
import styles from './About.module.css';

const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

export default function About() {
    return (
        <section id="about" className={styles.section}>
            {/* Letterbox top edge — a thin film bar echoing the hero frame */}
            <div className={styles.letterbox} aria-hidden="true" />

            <div className={styles.container}>
                <motion.div
                    {...reveal}
                    className={styles.header}
                >
                    <span className="slate-eyebrow">
                        <span className="slate-dot" />
                        The studio
                    </span>
                    <h2 className={`${styles.title} neon-title`}>About the show</h2>
                    <div className={styles.divider} />
                </motion.div>

                <div className={styles.grid}>
                    {/* Host Card */}
                    <motion.div
                        className={styles.card}
                        {...reveal}
                        transition={{ ...reveal.transition, delay: 0.1 }}
                    >
                        <span className={styles.frameCorner} aria-hidden="true" />
                        <div className={styles.icon}>
                            <Mic size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className={styles.cardTitle}>The host</h3>
                        <p className={styles.cardText}>
                            <strong>BONAFIED100</strong> brings you unfiltered conversations, hot tracks, and real talk every Saturday.
                        </p>
                        <a href="https://instagram.com/vegasupnowradio" target="_blank" rel="noopener noreferrer" className={styles.link}>
                            @vegasupnowradio
                        </a>
                    </motion.div>


                    {/* Community Card */}
                    <motion.div
                        className={styles.card}
                        {...reveal}
                        transition={{ ...reveal.transition, delay: 0.22 }}
                    >
                        <span className={styles.frameCorner} aria-hidden="true" />
                        <div className={styles.icon}>
                            <Users size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className={styles.cardTitle}>The community</h3>
                        <p className={styles.cardText}>
                            Join thousands of listeners tuning in every Saturday for Hip-Hop, R&B, Pop, and real talk that matters.
                        </p>
                        <p className={styles.cardText}>
                            Streaming live on YouTube, Facebook, and Instagram.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
