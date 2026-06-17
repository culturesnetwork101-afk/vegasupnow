'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Radio } from 'lucide-react';
import styles from './NewsModal.module.css';
import DOMPurify from 'isomorphic-dompurify';
import { useFocusTrap } from '@/hooks/useFocusTrap';

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
    const modalRef = useFocusTrap<HTMLDivElement>(!!item, onClose);

    if (!item) return null;

    return (
        <AnimatePresence>
            <div className={styles.overlay} onClick={onClose}>
                <motion.div
                    ref={modalRef}
                    className={styles.modal}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="news-modal-title"
                    tabIndex={-1}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className={styles.closeButton} onClick={onClose} aria-label="Close">
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

                        <h2 id="news-modal-title" className={styles.title}>{item.title}</h2>

                        {item.image && (
                            <div className={styles.imageWrapper}>
                                <img src={item.image} alt={item.title} className={styles.image} />
                            </div>
                        )}

                        <div
                            className={styles.articleBody}
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content || item.contentSnippet || '') }}
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
