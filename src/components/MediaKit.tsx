'use client';
import { motion } from 'framer-motion';
import { Target, Megaphone, CheckCircle, Calendar, Mail, Instagram } from 'lucide-react';
import styles from './MediaKit.module.css';

export default function MediaKit() {
    return (
        <section id="media-kit" className={styles.section}>
            <div className={styles.container}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.header}
                >
                    <h2 className={styles.title}>MEDIA KIT</h2>
                    <div className={styles.divider} />
                    <p className={styles.subtitle}>Sponsorship Opportunities • High-Impact Urban Entertainment Platform</p>
                </motion.div>

                {/* 1. About the Show */}
                <div className={styles.singleContent}>
                    <motion.div
                        className={styles.missionSection}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className={styles.sectionHeading}>ABOUT THE SHOW</h3>
                        <p className={styles.description}>
                            Vegas Up Now is an urban entertainment platform built to highlight artists, businesses, and community entities while educating listeners on current events and trending topics.
                        </p>
                        <p className={styles.description}>
                            The show also spotlights surprise celebrity guest interviews, drops valuable gems, and showcases local and indie music.
                        </p>
                        <div className={styles.airingInfo}>
                            <Calendar size={18} />
                            <span>Airing 2 hours each week • 12 PM PST on Saturdays</span>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className={styles.stationDescription}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p>Vegas Up Now is a digital-first platform built for intensive community engagement and cultural impact across on-air and online channels.</p>
                </motion.div>

                {/* 3. Opportunities & Why Sponsor */}
                <div className={styles.detailsGrid}>
                    <motion.div
                        className={styles.detailCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className={styles.detailHeader}>
                            <Megaphone className={styles.detailIcon} />
                            <h4 className={styles.detailTitle}>ADVERTISING</h4>
                        </div>
                        <ul className={styles.list}>
                            <li>Show sponsorship</li>
                            <li>Commercials (30s or 60s)</li>
                            <li>In-show reads</li>
                            <li>Station website banners</li>
                            <li>Social media promotion*</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className={styles.detailCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className={styles.detailHeader}>
                            <Target className={styles.detailIcon} />
                            <h4 className={styles.detailTitle}>WHY SPONSOR?</h4>
                        </div>
                        <ul className={styles.list}>
                            <li><CheckCircle size={14} /> Associate with a trusted community voice</li>
                            <li><CheckCircle size={14} /> Reach an urban and multicultural audience</li>
                            <li><CheckCircle size={14} /> Promote minority culture in positive way</li>
                            <li><CheckCircle size={14} /> Aid local/indie musicians & businesses</li>
                            <li><CheckCircle size={14} /> Build brand awareness on a growing show</li>
                        </ul>
                    </motion.div>
                </div>

                {/* 4. Sponsorship Packages */}
                <div className={styles.packagesSection}>
                    <h3 className={styles.sectionHeading}>SPONSORSHIP PACKAGES</h3>
                    <div className={styles.packagesGrid}>
                        <motion.div className={styles.packageCard} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                            <h4 className={styles.packageTitle}>On-Air Mentions</h4>
                            <div className={styles.packagePrice}>Contact for Pricing</div>
                            <ul className={styles.packageList}>
                                <li>Your business mentioned on the show</li>
                            </ul>
                        </motion.div>

                        <motion.div className={styles.packageCard} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            <h4 className={styles.packageTitle}>On-Air Interview</h4>
                            <div className={styles.packagePrice}>Contact for Pricing</div>
                            <ul className={styles.packageList}>
                                <li>A sponsored interview once per month</li>
                                <li>On-air mentions</li>
                                <li>Logo displayed on our website</li>
                                <li>Logo displayed in our promo graphics</li>
                            </ul>
                        </motion.div>

                        <motion.div className={styles.packageCard} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <h4 className={styles.packageTitle}>Silver Package</h4>
                            <div className={styles.packagePrice}>Contact for Pricing</div>
                            <ul className={styles.packageList}>
                                <li>Sponsored interview once per month</li>
                                <li>Increased on-air mentions</li>
                                <li>Website and graphic placement</li>
                                <li>Social media promo mention</li>
                            </ul>
                        </motion.div>

                        <motion.div className={styles.packageCard} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                            <h4 className={styles.packageTitle}>Gold Package</h4>
                            <div className={styles.packagePrice}>Contact for Pricing</div>
                            <ul className={styles.packageList}>
                                <li>Sponsored interview once per month</li>
                                <li>Premium on-air mentions</li>
                                <li>Maximum website/promo visibility</li>
                                <li>Sponsored social media posts</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>

                {/* 5. Add-ons */}
                <motion.div
                    className={styles.addonsSection}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className={styles.sectionHeading}>ADD-ONS</h3>
                    <div className={styles.addonsGrid}>
                        <div className={styles.addonItem}>
                            <span className={styles.addonLabel}>Show Sponsorship</span>
                            <span className={styles.addonPrice}>Contact for Pricing</span>
                        </div>
                        <div className={styles.addonItem}>
                            <span className={styles.addonLabel}>Sponsored Interview</span>
                            <span className={styles.addonPrice}>Contact for Pricing</span>
                        </div>
                        <div className={styles.addonItem}>
                            <span className={styles.addonLabel}>Social Media Post</span>
                            <span className={styles.addonPrice}>Contact for Pricing</span>
                        </div>
                        <div className={styles.addonItem}>
                            <span className={styles.addonLabel}>Audio Promo</span>
                            <span className={styles.addonPrice}>Contact for Pricing</span>
                        </div>
                    </div>
                </motion.div>

                {/* 6. Contact */}
                <motion.div
                    className={styles.contactFooter}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h3 className={styles.sectionHeading}>CONTACT</h3>
                    <div className={styles.contactGrid}>
                        <div className={styles.contactItem}>
                            <span className={styles.contactName}>Terry &quot;Bonafied100&quot; Walston</span>
                        </div>
                        <a href="mailto:culturesnetwork101@gmail.com" className={styles.contactLink}>
                            <Mail size={20} /> culturesnetwork101@gmail.com
                        </a>
                        <a href="https://instagram.com/vegasupnowradio" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                            <Instagram size={20} /> @vegasupnowradio
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
