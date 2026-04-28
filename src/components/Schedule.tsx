'use client';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import styles from './Schedule.module.css';

export default function Schedule() {
    return (
        <section id="schedule" className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.header}
                >
                    <h2 className={styles.title}>TUNE IN</h2>
                    <div className={styles.divider} />
                </motion.div>

                <motion.div
                    className={styles.scheduleCard}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.scheduleContent}>
                        <div className={styles.scheduleItem}>
                            <Calendar size={32} className={styles.scheduleIcon} />
                            <div>
                                <h3 className={styles.scheduleLabel}>DAY</h3>
                                <p className={styles.scheduleValue}>Every Saturday</p>
                            </div>
                        </div>

                        <div className={styles.scheduleItem}>
                            <Clock size={32} className={styles.scheduleIcon} />
                            <div>
                                <h3 className={styles.scheduleLabel}>TIME</h3>
                                <p className={styles.scheduleValue}>12:00 PM PST</p>
                            </div>
                        </div>

                        <div className={styles.scheduleItem}>
                            <MapPin size={32} className={styles.scheduleIcon} />
                            <div>
                                <h3 className={styles.scheduleLabel}>NETWORK</h3>
                                <p className={styles.scheduleValue}>Global Network</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.streamingInfo}>
                        <h4 className={styles.streamingTitle}>STREAM LIVE ON:</h4>
                        <div className={styles.platforms}>
                            <a href="https://www.youtube.com/@vegasupnow" target="_blank" rel="noopener noreferrer" className={styles.platform}>
                                YouTube
                            </a>
                            <a href="https://facebook.com/BunafiedCulture" target="_blank" rel="noopener noreferrer" className={styles.platform}>
                                Facebook
                            </a>
                            <a href="https://instagram.com/vegasupnowradio" target="_blank" rel="noopener noreferrer" className={styles.platform}>
                                Instagram
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
