'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Radio, Mail } from 'lucide-react';
import styles from './Footer.module.css';

const revealContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const revealItem = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    },
};

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <motion.div
                    className={styles.grid}
                    variants={revealContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* Logo & Branding */}
                    <motion.div className={styles.brandSection} variants={revealItem}>
                        <div className={styles.logoContainer}>
                            <span className={styles.logoHalo} aria-hidden="true" />
                            <Image
                                src="/logo-chip.jpg"
                                alt="Vegas Up Now Logo"
                                width={80}
                                height={80}
                                className={styles.logo}
                            />
                        </div>
                        <h3 className={styles.brandName}>VEGAS UP NOW</h3>
                        <p className={styles.brandTagline}>
                            <Radio size={16} className={styles.radioIcon} />
                            Weekly urban entertainment, Las Vegas, NV
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div className={styles.linksSection} variants={revealItem}>
                        <span className="slate-eyebrow">
                            <span className="slate-dot" />
                            Quick links
                        </span>
                        <ul className={styles.linksList}>
                            <li><a href="#about">About</a></li>
                            <li><a href="#schedule">Schedule</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div className={styles.contactSection} variants={revealItem}>
                        <span className="slate-eyebrow">
                            <span className="slate-dot" />
                            Contact
                        </span>
                        <div className={styles.contactList}>
                            <a href="mailto:culturesnetwork101@gmail.com" className={styles.contactItem}>
                                <Mail size={16} />
                                <span>culturesnetwork101@gmail.com</span>
                            </a>
                        </div>
                    </motion.div>
                </motion.div>


                {/* Divider */}
                <div className={styles.divider}></div>

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} Vegas Up Now. All rights reserved.
                    </p>
                    <p className={styles.tagline}>
                        <span className={styles.stationTally} aria-hidden="true" />
                        Bringing you the best in Hip-Hop, R&B, Pop & Talk Radio
                    </p>
                </div>
            </div>
        </footer>
    );
}
