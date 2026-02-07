'use client';
import { motion } from 'framer-motion';
import { User, Radio, Music, Calendar, Phone, Mail } from 'lucide-react';
import styles from './ShowInfo.module.css';

export default function ShowInfo() {
    return (
        <section id="about" className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.header}
                >
                    <h2 className={styles.title}>About The Show</h2>
                    <div className={styles.divider}></div>
                </motion.div>

                <div className={styles.grid}>
                    {/* Host Card */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className={styles.cardIcon}>
                            <User size={32} />
                        </div>
                        <h3 className={styles.cardTitle}>Your Host</h3>
                        <p className={styles.cardText}>
                            <strong>BONAFIED100</strong> brings you the hottest tracks and realest talk every Saturday on Hot 702.5 FM.
                        </p>
                        <div className={styles.socialHandle}>@OFFICIALBONAFIED100</div>
                    </motion.div>

                    {/* Station Card */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className={styles.cardIcon}>
                            <Radio size={32} />
                        </div>
                        <h3 className={styles.cardTitle}>The Station</h3>
                        <p className={styles.cardText}><strong>Hot 702.5 FM</strong></p>
                        <p className={styles.cardText}>Risky Radio • Las Vegas, NV</p>
                        <p className={`${styles.cardText} ${styles.highlight}`}>2.5+ Million Monthly Listeners</p>
                        <p className={styles.cardText}>Reaching 70+ Counties Nationwide</p>
                        <a href="https://hot7025fm.com" target="_blank" rel="noopener noreferrer" className={styles.socialHandle}>@HOT7025FM</a>
                    </motion.div>

                    {/* Music Card */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className={styles.cardIcon}>
                            <Music size={32} />
                        </div>
                        <h3 className={styles.cardTitle}>What We Play</h3>
                        <p className={styles.cardText}>
                            Hip-Hop • R&B • Pop • Risky Talk Shows
                        </p>
                        <p className={styles.cardSubtext}>
                            The best mix of music and conversation in Vegas
                        </p>
                    </motion.div>
                </div>

                {/* Schedule Section */}
                <motion.div
                    id="schedule"
                    className={styles.scheduleSection}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.scheduleCard}>
                        <Calendar size={48} className={styles.scheduleIcon} />
                        <div className={styles.scheduleContent}>
                            <h3 className={styles.scheduleTitle}>Tune In Every Saturday</h3>
                            <p className={styles.scheduleTime}>12:00 PM PST</p>
                            <p className={styles.scheduleDescription}>
                                Catch Vegas Up Now live on Hot 702.5 FM or stream on YouTube, Facebook Live, and more.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Section */}
                <motion.div
                    id="contact"
                    className={styles.contactSection}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className={styles.contactTitle}>Get In Touch</h3>
                    <div className={styles.contactGrid}>
                        <a href="tel:702-551-5261" className={styles.contactCard}>
                            <Phone size={24} />
                            <span>702-551-5261</span>
                        </a>
                        <a href="mailto:culturesnetwork101@gmail.com" className={styles.contactCard}>
                            <Mail size={24} />
                            <span>culturesnetwork101@gmail.com</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
