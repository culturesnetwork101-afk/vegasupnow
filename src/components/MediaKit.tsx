'use client';
import { motion } from 'framer-motion';
import { Target, Megaphone, CheckCircle, Calendar, Mail, Instagram, Radio, Mic, Award, Plus } from 'lucide-react';
import styles from './MediaKit.module.css';
import { SOCIAL } from '@/lib/social';

const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

const packages = [
    {
        title: 'On-air mentions',
        items: ['Your business mentioned on the show'],
    },
    {
        title: 'On-air interview',
        items: [
            'A sponsored interview once per month',
            'On-air mentions',
            'Logo displayed on our website',
            'Logo displayed in our promo graphics',
        ],
    },
    {
        title: 'Silver package',
        items: [
            'Sponsored interview once per month',
            'Increased on-air mentions',
            'Website and graphic placement',
            'Social media promo mention',
        ],
    },
    {
        title: 'Gold package',
        featured: true,
        items: [
            'Sponsored interview once per month',
            'Premium on-air mentions',
            'Maximum website/promo visibility',
            'Sponsored social media posts',
        ],
    },
];

const addons = ['Show sponsorship', 'Sponsored interview', 'Social media post', 'Audio promo'];

export default function MediaKit() {
    return (
        <section id="media-kit" className={styles.section}>
            <div className={styles.container}>
                {/* Header */}
                <motion.div {...reveal} className={styles.header}>
                    <span className="slate-eyebrow">
                        <span className="slate-dot" />
                        Partner with us
                    </span>
                    <h2 className={styles.title}>MEDIA KIT</h2>
                    <div className={styles.divider} />
                    <p className={styles.subtitle}>Sponsorship opportunities for a high-impact urban entertainment platform</p>
                </motion.div>

                {/* 1. About the Show */}
                <div className={styles.singleContent}>
                    <motion.div {...reveal} className={styles.missionSection}>
                        <div className={styles.cardHeading}>
                            <Radio className={styles.cardHeadingIcon} size={22} aria-hidden="true" />
                            <h3 className={styles.sectionHeading}>About the show</h3>
                        </div>
                        <p className={styles.description}>
                            Vegas Up Now is an urban entertainment platform built to highlight artists, businesses, and community entities while educating listeners on current events and trending topics.
                        </p>
                        <p className={styles.description}>
                            The show also spotlights surprise celebrity guest interviews, drops valuable gems, and showcases local and indie music.
                        </p>
                        <div className={styles.airingInfo}>
                            <Calendar size={18} aria-hidden="true" />
                            <span>Airing 2 hours each week, 12 PM PST on Saturdays</span>
                        </div>
                    </motion.div>
                </div>

                <motion.div {...reveal} className={styles.stationDescription}>
                    <p>Vegas Up Now is a digital-first platform built for intensive community engagement and cultural impact across on-air and online channels.</p>
                </motion.div>

                {/* 3. Opportunities & Why Sponsor */}
                <div className={styles.detailsGrid}>
                    <motion.div {...reveal} className={styles.detailCard}>
                        <div className={styles.detailHeader}>
                            <Megaphone className={styles.detailIcon} size={26} aria-hidden="true" />
                            <h4 className={styles.detailTitle}>ADVERTISING</h4>
                        </div>
                        <ul className={styles.list}>
                            <li><span className={styles.bullet} aria-hidden="true" />Show sponsorship</li>
                            <li><span className={styles.bullet} aria-hidden="true" />Commercials (30s or 60s)</li>
                            <li><span className={styles.bullet} aria-hidden="true" />In-show reads</li>
                            <li><span className={styles.bullet} aria-hidden="true" />Station website banners</li>
                            <li><span className={styles.bullet} aria-hidden="true" />Social media promotion*</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        {...reveal}
                        transition={{ ...reveal.transition, delay: 0.1 }}
                        className={styles.detailCard}
                    >
                        <div className={styles.detailHeader}>
                            <Target className={styles.detailIcon} size={26} aria-hidden="true" />
                            <h4 className={styles.detailTitle}>WHY SPONSOR?</h4>
                        </div>
                        <ul className={styles.list}>
                            <li><CheckCircle size={16} aria-hidden="true" /> Associate with a trusted community voice</li>
                            <li><CheckCircle size={16} aria-hidden="true" /> Reach an urban and multicultural audience</li>
                            <li><CheckCircle size={16} aria-hidden="true" /> Promote minority culture in a positive way</li>
                            <li><CheckCircle size={16} aria-hidden="true" /> Aid local and indie musicians and businesses</li>
                            <li><CheckCircle size={16} aria-hidden="true" /> Build brand awareness on a growing show</li>
                        </ul>
                    </motion.div>
                </div>

                {/* 4. Sponsorship Packages */}
                <div className={styles.packagesSection}>
                    <motion.div {...reveal} className={styles.cardHeading}>
                        <Award className={styles.cardHeadingIcon} size={22} aria-hidden="true" />
                        <h3 className={styles.sectionHeading}>Sponsorship packages</h3>
                    </motion.div>
                    <div className={styles.packagesGrid}>
                        {packages.map((pkg, i) => (
                            <motion.div
                                key={pkg.title}
                                {...reveal}
                                transition={{ ...reveal.transition, delay: i * 0.08 }}
                                className={`${styles.packageCard} ${pkg.featured ? styles.packageCardFeatured : ''}`}
                            >
                                {pkg.featured && (
                                    <span className={styles.packageFlag}>
                                        <span className={styles.packageFlagDot} aria-hidden="true" />
                                        Most visibility
                                    </span>
                                )}
                                <h4 className={styles.packageTitle}>{pkg.title}</h4>
                                <div className={styles.packagePrice}>Contact for pricing</div>
                                <ul className={styles.packageList}>
                                    {pkg.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 5. Add-ons */}
                <motion.div {...reveal} className={styles.addonsSection}>
                    <div className={styles.cardHeading}>
                        <Plus className={styles.cardHeadingIcon} size={22} aria-hidden="true" />
                        <h3 className={styles.sectionHeading}>Add-ons</h3>
                    </div>
                    <div className={styles.addonsGrid}>
                        {addons.map((label) => (
                            <div key={label} className={styles.addonItem}>
                                <span className={styles.addonLabel}>{label}</span>
                                <span className={styles.addonPrice}>Contact for pricing</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* 6. Advertise with us (sponsor-specific direct line) */}
                <motion.div {...reveal} className={styles.contactFooter}>
                    <div className={styles.cardHeading}>
                        <Mic className={styles.cardHeadingIcon} size={22} aria-hidden="true" />
                        <h3 className={styles.sectionHeading}>Ready to advertise?</h3>
                    </div>
                    <p className={styles.contactLead}>
                        Email Terry directly to talk sponsorship and pricing.
                    </p>
                    <div className={styles.contactGrid}>
                        <div className={styles.contactItem}>
                            <span className={styles.contactName}>Terry &quot;Bonafied100&quot; Walston</span>
                        </div>
                        <a
                            href="mailto:culturesnetwork101@gmail.com?subject=Advertising%20with%20Vegas%20Up%20Now"
                            className={styles.contactLink}
                        >
                            <Mail size={20} aria-hidden="true" /> culturesnetwork101@gmail.com
                        </a>
                        <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                            <Instagram size={20} aria-hidden="true" /> @vegasupnowradio
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
