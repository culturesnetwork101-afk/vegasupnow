'use client';
import { motion } from 'framer-motion';
import { Mic, Users } from 'lucide-react';
import styles from './About.module.css';

export default function About() {
    return (
        <section id="about" className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.header}
                >
                    <h2 className={styles.title}>ABOUT THE SHOW</h2>
                    <div className={styles.divider} />
                </motion.div>

                <div className={styles.grid}>
                    {/* Host Card */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className={styles.icon}>
                            <Mic size={32} />
                        </div>
                        <h3 className={styles.cardTitle}>THE HOST</h3>
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
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className={styles.icon}>
                            <Users size={32} />
                        </div>
                        <h3 className={styles.cardTitle}>THE COMMUNITY</h3>
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
