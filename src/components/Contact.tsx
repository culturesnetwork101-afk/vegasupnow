'use client';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
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
                        href="tel:702-551-5261"
                        className={styles.contactCard}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Phone size={32} />
                        <span className={styles.contactLabel}>CALL IN</span>
                        <span className={styles.contactValue}>702-551-5261</span>
                    </motion.a>

                    <motion.a
                        href="mailto:culturesnetwork101@gmail.com"
                        className={styles.contactCard}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
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
