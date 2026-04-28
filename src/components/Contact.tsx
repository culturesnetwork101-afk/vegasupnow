'use client';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
    return (
        <section id="contact" className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.header}
                >
                    <h2 className={styles.title}>GET IN TOUCH</h2>
                    <div className={styles.divider} />
                </motion.div>

                <div className={styles.contactGrid}>
                    <motion.a
                        href="mailto:culturesnetwork101@gmail.com"
                        className={styles.contactCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Mail size={32} />
                        <span className={styles.contactLabel}>EMAIL</span>
                        <span className={styles.contactValue}>culturesnetwork101@gmail.com</span>
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
