'use client';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Radio, Youtube, Facebook, Instagram } from 'lucide-react';
import styles from './Schedule.module.css';
import { SOCIAL } from '@/lib/social';

const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Schedule() {
    return (
        <section id="schedule" className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    {...reveal}
                    className={styles.header}
                >
                    <span className="slate-eyebrow slate-eyebrow--live">
                        <span className="slate-dot" />
                        On the dial
                    </span>
                    <h2 className={`${styles.title} neon-title`}>TUNE IN</h2>
                    <div className={styles.divider} />
                </motion.div>

                <motion.div
                    className={styles.scheduleCard}
                    {...reveal}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                >
                    {/* Live / next slot, lit like an ON AIR moment: red tally + gold glow */}
                    <div className={styles.liveSlot}>
                        <span className={styles.tally} aria-hidden="true" />
                        <span className={styles.liveBadge}>
                            <Radio size={14} className={styles.liveBadgeIcon} />
                            Live this week
                        </span>
                        <p className={styles.liveTime}>Saturday, 12:00 PM PST</p>
                        <p className={styles.liveMeta}>Vegas Up Now on Hot 702.5 FM</p>
                    </div>

                    <div className={styles.scheduleContent}>
                        <div className={styles.scheduleItem}>
                            <span className={styles.iconWrap}>
                                <Calendar size={26} className={styles.scheduleIcon} />
                            </span>
                            <div>
                                <h3 className={styles.scheduleLabel}>DAY</h3>
                                <p className={styles.scheduleValue}>Every Saturday</p>
                            </div>
                        </div>

                        <div className={styles.scheduleItem}>
                            <span className={styles.iconWrap}>
                                <Clock size={26} className={styles.scheduleIcon} />
                            </span>
                            <div>
                                <h3 className={styles.scheduleLabel}>TIME</h3>
                                <p className={styles.scheduleValue}>12:00 PM PST</p>
                            </div>
                        </div>

                        <div className={styles.scheduleItem}>
                            <span className={styles.iconWrap}>
                                <MapPin size={26} className={styles.scheduleIcon} />
                            </span>
                            <div>
                                <h3 className={styles.scheduleLabel}>NETWORK</h3>
                                <p className={styles.scheduleValue}>Global Network</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.streamingInfo}>
                        <h4 className={styles.streamingTitle}>Stream live on</h4>
                        <div className={styles.platforms}>
                            <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" className={styles.platform}>
                                <Youtube size={18} className={styles.platformIcon} />
                                YouTube
                            </a>
                            <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className={styles.platform}>
                                <Facebook size={18} className={styles.platformIcon} />
                                Facebook
                            </a>
                            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className={styles.platform}>
                                <Instagram size={18} className={styles.platformIcon} />
                                Instagram
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
