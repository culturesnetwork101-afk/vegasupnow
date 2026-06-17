'use client';
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Calendar, Play, X, Radio } from 'lucide-react';
import styles from './Hero.module.css';
import { useFocusTrap } from '@/hooks/useFocusTrap';

const EASE = [0.16, 1, 0.3, 1] as const;

// Decorative live-audio waveform. Heights/delays are index-derived so server and
// client render identically (no Math.random at render time).
const WAVE_BARS = Array.from({ length: 56 }, (_, i) => {
    const base = 26 + Math.abs(Math.sin(i * 1.7) * 64);
    const dur = 0.9 + ((i % 7) * 0.12);
    const delay = (i % 11) * 0.08;
    return { h: Math.round(base), dur: dur.toFixed(2), delay: delay.toFixed(2) };
});

const MARQUEE_ITEMS = [
    'Hot 702.5 FM',
    'Hip-Hop',
    'R&B',
    'Pop',
    'Risky radio',
    'Live from Las Vegas',
    'Saturdays 12PM PST',
    'Vegas Up Now',
];

export default function Hero() {
    const containerRef = useRef(null);
    const [isVideoActive, setIsVideoActive] = useState(false);
    const [isLive, setIsLive] = useState(false);
    const theaterRef = useFocusTrap<HTMLDivElement>(isVideoActive, () => setIsVideoActive(false));

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const prefersReduced = useReducedMotion();
    const y = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1, 1.05]);

    // Check live status
    useEffect(() => {
        async function checkLive() {
            try {
                const res = await fetch('/api/youtube/live');
                const data = await res.json();
                setIsLive(data.isLive);
            } catch (e) {
                console.warn("Live check failed", e);
            }
        }
        checkLive();
        const interval = setInterval(checkLive, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    // Handle body scroll locking and media coordination
    useEffect(() => {
        if (isVideoActive) {
            document.body.style.overflow = 'hidden';
            // Signal radio to pause
            window.dispatchEvent(new CustomEvent('media:play', { detail: { source: 'video' } }));
        } else {
            document.body.style.overflow = 'auto';
        }

        const handleExternalPlay = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            if (detail?.source === 'radio') {
                setIsVideoActive(false);
            }
        };

        window.addEventListener('media:play', handleExternalPlay);
        return () => window.removeEventListener('media:play', handleExternalPlay);
    }, [isVideoActive]);

    return (
        <section id="home" ref={containerRef} className={styles.hero}>
            {/* Cinematic background stack */}
            <motion.div style={{ y, scale }} className={styles.backgroundContainer}>
                <div className={styles.kenburns} />
                <div className={styles.cinemaGrade} />
                <div className={styles.ambientGlow} aria-hidden="true" />
                <div className={styles.grainOverlay} aria-hidden="true" />
            </motion.div>

            {/* Letterbox bars for a cinema frame */}
            <div className={styles.letterboxTop} aria-hidden="true" />
            <div className={styles.letterboxBottom} aria-hidden="true" />

            {/* Broadcast status: ON AIR tally light */}
            <motion.div
                className={styles.statusRow}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: EASE }}
            >
                <span className={`${styles.onAir} ${isLive ? styles.onAirLive : ''}`}>
                    <span className={styles.tally} />
                    {isLive ? 'On air now' : 'Hot 702.5 FM'}
                </span>
                <span className={styles.statusMeta}>
                    <Radio size={13} />
                    Las Vegas
                </span>
            </motion.div>

            <div className={styles.heroContent}>
                <motion.span
                    className={`${styles.eyebrow} neon-breathe-gold`}
                    initial={{ opacity: 0, letterSpacing: "1em", y: 16 }}
                    animate={{ opacity: 1, letterSpacing: "0.4em", y: 0 }}
                    transition={{ duration: 1.5, ease: EASE }}
                >
                    The premiere urban frequency
                </motion.span>

                <span className={`${styles.titleGlow} neon-breathe-marquee`}>
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
                    >
                        Vegas Up Now
                    </motion.h1>
                    <span className={styles.sheen} aria-hidden="true" />
                </span>

                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    Vegas Up Now radio, airing weekly on Hot 702.5 FM
                </motion.p>

                {/* Live audio waveform */}
                <motion.div
                    className={`${styles.waveform} ${isLive ? styles.waveformLive : ''}`}
                    aria-hidden="true"
                    initial={{ opacity: 0, scaleY: 0.4 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
                >
                    {WAVE_BARS.map((b, i) => (
                        <span
                            key={i}
                            className={styles.waveBar}
                            style={{
                                height: `${b.h}%`,
                                animationDuration: `${b.dur}s`,
                                animationDelay: `${b.delay}s`,
                            }}
                        />
                    ))}
                </motion.div>

                {/* Primary CTA */}
                <motion.div
                    className={styles.ctaRow}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9, ease: EASE }}
                >
                    <button
                        type="button"
                        className={`${styles.listenBtn} ${isLive ? styles.listenBtnLive : ''}`}
                        onClick={() => setIsVideoActive(true)}
                    >
                        <span className={styles.listenDisc}>
                            {isLive ? <span className={styles.liveIndicator} /> : <Play size={18} fill="currentColor" />}
                        </span>
                        <span className={styles.listenText}>
                            {isLive ? 'Watch live now' : 'Step into the lounge'}
                        </span>
                    </button>

                    <div className={styles.scheduleChip}>
                        <Calendar size={14} />
                        <span>Saturdays 12PM PST</span>
                    </div>
                </motion.div>
            </div>

            {/* Host credit */}
            <motion.div
                className={styles.hostSpotlight}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 1.2, ease: EASE }}
            >
                <span className={styles.hostLabel}>Curated by</span>
                <span className={styles.hostName}>Cultures Network Connections</span>
                <div className={styles.hostLine} />
            </motion.div>

            {/* Cinematic Video Theater (Full Modal) */}
            <AnimatePresence>
                {isVideoActive && (
                    <motion.div
                        ref={theaterRef}
                        className={styles.videoTheater}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Vegas Up Now video player"
                        tabIndex={-1}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setIsVideoActive(false);
                        }}
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
                            <span>Exit lounge</span>
                        </motion.button>

                        <motion.div
                            className={styles.theaterContent}
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
                        >
                            <iframe
                                className={styles.theaterPlayer}
                                src={isLive
                                    ? "https://www.youtube.com/embed/live_stream?channel=UC_oVuCQmHJkAKhYOqmMgXmQ&autoplay=1"
                                    : "https://www.youtube.com/embed/videoseries?list=UU_oVuCQmHJkAKhYOqmMgXmQ&autoplay=1"
                                }
                                title="Vegas Up Now Live"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Broadcast marquee ticker */}
            <div className={styles.marquee} aria-hidden="true">
                <div className={styles.marqueeTrack}>
                    {[0, 1].map((copy) => (
                        <span className={styles.marqueeGroup} key={copy}>
                            {MARQUEE_ITEMS.map((item, i) => (
                                <span className={styles.marqueeItem} key={`${copy}-${i}`}>
                                    {item}
                                    <span className={styles.marqueeDot}>&#9670;</span>
                                </span>
                            ))}
                        </span>
                    ))}
                </div>
            </div>

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
                <span>Explore</span>
            </motion.div>
        </section>
    );
}
