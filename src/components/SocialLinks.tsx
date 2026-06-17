'use client';
import { motion } from 'framer-motion';
import { Youtube, Facebook, Instagram, Music2 } from 'lucide-react';
import styles from './SocialLinks.module.css';
import { SOCIAL } from '@/lib/social';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export default function SocialLinks() {
    const platforms = [
        { name: 'YouTube', icon: Youtube, url: SOCIAL.youtube, color: '#FF0000' },
        { name: 'Facebook', icon: Facebook, url: SOCIAL.facebook, color: '#1877F2' },
        { name: 'Instagram', icon: Instagram, url: SOCIAL.instagram, color: '#E4405F' },
        { name: 'TikTok', icon: Music2, url: SOCIAL.tiktok, color: '#000000' },
    ];

    const streamingLinks = [
        { name: 'YouTube Live', icon: Youtube, url: SOCIAL.youtube },
        { name: 'Facebook Live', icon: Facebook, url: SOCIAL.facebook },
    ];

    return (
        <section id="socials" className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: LUXURY_EASE }}
                    className={styles.header}
                >
                    <span className="slate-eyebrow">
                        <span className="slate-dot" />
                        Find us everywhere
                    </span>
                    <h2 className={`${styles.title} neon-title neon-breathe-gold`}>Connect with us</h2>
                    <p className={styles.subtitle}>Follow Vegas Up Now on social media and stream live</p>
                </motion.div>

                {/* Social Media Links */}
                <div className={styles.socialGrid}>
                    {platforms.map((platform, index) => (
                        <motion.a
                            key={platform.name}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialCard}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: LUXURY_EASE, delay: index * 0.08 }}
                            whileHover={{ y: -6 }}
                        >
                            <div className={styles.iconWrapper} style={{ '--platform-color': platform.color } as React.CSSProperties}>
                                <platform.icon size={32} />
                            </div>
                            <span className={styles.platformName}>{platform.name}</span>
                        </motion.a>
                    ))}
                </div>

                {/* Streaming Platforms */}
                <motion.div
                    className={styles.streamingSection}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: LUXURY_EASE }}
                >
                    <h3 className={styles.streamingTitle}>
                        <span className={styles.liveTally} aria-hidden="true" />
                        Stream live on
                    </h3>
                    <div className={styles.streamingGrid}>
                        {streamingLinks.map((platform, index) => (
                            <motion.a
                                key={platform.name}
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.streamingCard}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.9, ease: LUXURY_EASE, delay: index * 0.08 }}
                                whileHover={{ y: -4 }}
                            >
                                <platform.icon size={24} />
                                <span>{platform.name}</span>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
