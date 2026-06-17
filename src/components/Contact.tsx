'use client';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import styles from './Contact.module.css';

const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Contact() {
    return (
        <section id="contact" className={styles.section}>
            <div className={styles.container}>
                <motion.div className={styles.header} {...reveal}>
                    <span className={`slate-eyebrow ${styles.eyebrow}`}>
                        <span className="slate-dot" />
                        Say hello
                    </span>
                    <h2 className={`neon-title neon-breathe-gold ${styles.title}`}>Get in touch</h2>
                    <div className={`divider ${styles.divider}`} />
                    <p className={styles.lead}>
                        Real people you can reach. Send a note and we will get back to you.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.contactGrid}
                    {...reveal}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                >
                    <a
                        href="mailto:culturesnetwork101@gmail.com"
                        className={`glass ${styles.contactCard}`}
                    >
                        <span className={styles.cardSheen} aria-hidden="true" />
                        <span className={styles.cardChannel} aria-hidden="true">
                            <span className={styles.cardTally} />
                            On air mail
                        </span>
                        <span className={styles.iconRing}>
                            <Mail size={28} strokeWidth={1.6} />
                        </span>
                        <span className={styles.contactLabel}>Email</span>
                        <span className={styles.contactValue}>culturesnetwork101@gmail.com</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
