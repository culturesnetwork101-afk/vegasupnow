'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Calendar, Play, Volume2, X } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
    const containerRef = useRef(null);
    const [isVideoActive, setIsVideoActive] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    // Handle body scroll locking when theater is open
    useEffect(() => {
        if (isVideoActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isVideoActive]);

    return (
        <section ref={containerRef} className={styles.hero}>
            {/* Immersive Background */}
            <motion.div style={{ y, scale }} className={styles.backgroundContainer}>
                <div className={styles.backgroundOverlay} />
                <div className={styles.videoAtmosphere}>
                    <div className={styles.grainOverlay} />
                </div>
            </motion.div>

            <div className={styles.heroContent}>
                {/* Luxury Reveal Title */}
                <div className={styles.uxTitleWrapper}>
                    <motion.span
                        className={styles.eyebrow}
                        initial={{ opacity: 0, letterSpacing: "1em", y: 20 }}
                        animate={{ opacity: 1, letterSpacing: "0.4em", y: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        THE PREMIERE URBAN FREQUENCY
                    </motion.span>
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
                        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        VEGAS UP NOW
                    </motion.h1>
                    <motion.div
                        className={styles.titleDivider}
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    />
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        Luxury in Motion • Airing Weekly on Hot 702.5 FM
                    </motion.p>
                </div>

                {/* Cinematic Player Trigger */}
                <motion.div
                    className={styles.playerTrigger}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className={styles.playerPreview} onClick={() => setIsVideoActive(true)}>
                        <div className={styles.glimmer} />
                        <div className={styles.playButton}>
                            <Play size={20} fill="currentColor" />
                        </div>
                        <span className={styles.playText}>EXPERIENCE LIVE</span>
                    </div>
                </motion.div>

                {/* Info Bar */}
                <motion.div
                    className={styles.luxuryInfoBar}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <div className={styles.infoItem}>
                        <Calendar size={14} />
                        <span>SATURDAYS 12PM PST</span>
                    </div>
                    <div className={styles.infoDivider} />
                    <div className={styles.infoItem}>
                        <Volume2 size={14} />
                        <span>HOT 702.5 FM</span>
                    </div>
                </motion.div>

                {/* Host Spotlight */}
                <motion.div
                    className={styles.hostSpotlight}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className={styles.hostLabel}>CURATED BY</span>
                    <span className={styles.hostName}>BONAFIED100</span>
                    <div className={styles.hostLine} />
                </motion.div>
            </div>

            {/* Cinematic Video Theater (Full Modal) */}
            <AnimatePresence>
                {isVideoActive && (
                    <motion.div
                        className={styles.videoTheater}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.button
                            className={styles.theaterClose}
                            onClick={() => setIsVideoActive(false)}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <X size={24} />
                            <span>EXIT LOUNGE</span>
                        </motion.button>

                        <motion.div
                            className={styles.theaterContent}
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <iframe
                                className={styles.theaterPlayer}
                                src="https://www.youtube.com/embed/videoseries?list=UU9P_60_D2B_M_iN0_W_j_S_Q&autoplay=1"
                                title="Vegas Up Now Gallery"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll Indicator */}
            <motion.div
                className={styles.scrollPrompt}
                style={{ opacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <motion.div
                    className={styles.scrollLine}
                    animate={{ height: ["0px", "60px", "0px"], top: ["0%", "100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span>EXPLORE</span>
            </motion.div>
        </section>
    );
}
