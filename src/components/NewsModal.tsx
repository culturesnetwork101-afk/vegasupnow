'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Radio } from 'lucide-react';
import styles from './NewsModal.module.css';

interface NewsItem {
    title: string;
    link: string;
    pubDate: string;
    source: string;
    contentSnippet: string;
    content?: string;
    image?: string;
}

interface NewsModalProps {
    item: NewsItem | null;
    onClose: () => void;
}

export default function NewsModal({ item, onClose }: NewsModalProps) {
    if (!item) return null;

    return (
        <AnimatePresence>
            <div className={styles.overlay} onClick={onClose}>
                <motion.div
                    className={styles.modal}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={24} />
                    </button>

                    <span className={styles.topAccent} aria-hidden="true" />

                    <div className={styles.content}>
                        <div className={styles.meta}>
                            <div className={styles.sourceBadge}>
                                <span className={styles.sourceDot} aria-hidden="true" />
                                <Radio size={14} />
                                <span>{item.source}</span>
                            </div>
                            <div className={styles.date}>
                                <Calendar size={14} />
                                <span>{new Date(item.pubDate).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <h2 className={styles.title}>{item.title}</h2>

                        {item.image && (
                            <div className={styles.imageWrapper}>
                                <img src={item.image} alt={item.title} className={styles.image} />
                            </div>
                        )}

                        <div
                            className={styles.articleBody}
                            dangerouslySetInnerHTML={{ __html: item.content || item.contentSnippet }}
                        />

                        <div className={styles.footer}>
                            <p className={styles.footerText}>
                                Want to read more? View the full story on {item.source}.
                            </p>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.readMoreBtn}
                            >
                                Read Full Article <ExternalLink size={16} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
