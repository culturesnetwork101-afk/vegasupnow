import Image from 'next/image';
import { Radio, Mail, Phone } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Logo & Branding */}
                    <div className={styles.brandSection}>
                        <div className={styles.logoContainer}>
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
                            Hot 702.5 FM • Las Vegas, NV
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.linksSection}>
                        <h4 className={styles.sectionTitle}>Quick Links</h4>
                        <ul className={styles.linksList}>
                            <li><a href="#about">About</a></li>
                            <li><a href="#schedule">Schedule</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.contactSection}>
                        <h4 className={styles.sectionTitle}>Contact</h4>
                        <div className={styles.contactList}>
                            <a href="tel:702-551-5261" className={styles.contactItem}>
                                <Phone size={18} />
                                <span>702-551-5261</span>
                            </a>
                            <a href="mailto:BONAFIED@HOT7025FM.COM" className={styles.contactItem}>
                                <Mail size={18} />
                                <span>BONAFIED@HOT7025FM.COM</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className={styles.divider}></div>

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} Vegas Up Now. All rights reserved.
                    </p>
                    <p className={styles.tagline}>
                        Bringing you the best in Hip-Hop, R&B, Pop & Talk Radio
                    </p>
                </div>
            </div>
        </footer>
    );
}
