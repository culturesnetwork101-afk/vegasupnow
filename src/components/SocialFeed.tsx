'use client';
import { motion } from 'framer-motion';
import styles from './SocialFeed.module.css';

const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

export default function SocialFeed() {
    return (
        <section id="socials" className={styles.section}>
            <div className={styles.container}>
                <motion.span
                    className="slate-eyebrow"
                    {...reveal}
                >
                    <span className="slate-dot" />
                    Stay connected
                </motion.span>
                <motion.h2
                    className={`${styles.title} neon-title neon-breathe-gold`}
                    {...reveal}
                    transition={{ ...reveal.transition, delay: 0.08 }}
                >
                    Follow the show
                </motion.h2>
                <motion.div
                    className={styles.divider}
                    {...reveal}
                    transition={{ ...reveal.transition, delay: 0.16 }}
                />
                <motion.p
                    className={styles.subtitle}
                    {...reveal}
                    transition={{ ...reveal.transition, delay: 0.24 }}
                >
                    Stay connected with Vegas Up Now on social media for behind-the-scenes content, show updates, and more.
                </motion.p>
            </div>
        </section>
    );
}
