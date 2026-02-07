'use client';
import { motion } from 'framer-motion';
import { Youtube, Facebook, Instagram, Smartphone, Music2 } from 'lucide-react';
import styles from './SocialLinks.module.css';

export default function SocialLinks() {
    const platforms = [
        { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@hot7025fm', color: '#FF0000' },
        { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/hot7025fm', color: '#1877F2' },
        { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/officialbonafied100', color: '#E4405F' },
        { name: 'TikTok', icon: Music2, url: 'https://www.tiktok.com/@hot7025fm', color: '#000000' },
    ];

    const streamingPlatforms = [
        { name: 'Apple Music', icon: Music2, label: 'Apple' },
        { name: 'Google Play', icon: Smartphone, label: 'Google Play' },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.header}
                >
                    <h2 className={styles.title}>Connect With Us</h2>
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
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className={styles.streamingTitle}>Stream Live On</h3>
                    <div className={styles.streamingGrid}>
                        {streamingPlatforms.map((platform) => (
                            <div key={platform.name} className={styles.streamingCard}>
                                <platform.icon size={24} />
                                <span>{platform.label}</span>
                            </div>
                        ))}
                        <div className={styles.streamingCard}>
                            <Youtube size={24} />
                            <span>YouTube Live</span>
                        </div>
                        <div className={styles.streamingCard}>
                            <Facebook size={24} />
                            <span>Facebook Live</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
