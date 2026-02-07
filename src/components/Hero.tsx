'use client';
import { motion } from 'framer-motion';
import { Calendar, Play } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            {/* Casino Floor Background */}
            <div className={styles.backgroundOverlay} />

            <div className={styles.heroContent}>
                {/* Main Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.titleSection}
                >
                    <h1 className={styles.title}>VEGAS UP NOW</h1>
                    <p className={styles.subtitle}>
                        Hot 702.5 FM • Risky Radio
                    </p>
                    <div className={styles.scheduleInfo}>
                        <Calendar size={20} />
                        <span>Saturdays 12PM PST</span>
                    </div>
                </motion.div>

                {/* Clean Video Player */}
                <motion.div
                    className={styles.videoContainer}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className={styles.videoWrapper}>
                        <iframe
                            className={styles.videoPlayer}
                            src="https://www.youtube.com/embed/live_stream?channel=UCvegasupnow&autoplay=0&mute=0"
                            title="Vegas Up Now Live Stream"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        <div className={styles.playOverlay}>
                            <Play size={64} className={styles.playIcon} />
                        </div>
                    </div>
                </motion.div>

                {/* Host Info */}
                <motion.div
                    className={styles.hostInfo}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <span className={styles.hostedBy}>HOSTED BY</span>
                    <h2 className={styles.hostName}>BONAFIED100</h2>
                    <p className={styles.hostHandle}>@OFFICIALBONAFIED100</p>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    className={styles.statsBar}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className={styles.stat}>
                        <span className={styles.statNumber}>2.5M+</span>
                        <span className={styles.statLabel}>Monthly Listeners</span>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.stat}>
                        <span className={styles.statNumber}>70+</span>
                        <span className={styles.statLabel}>Counties Nationwide</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
