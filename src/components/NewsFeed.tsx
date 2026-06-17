'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Radio } from 'lucide-react';
import NewsModal from './NewsModal';
import styles from './NewsFeed.module.css';

interface NewsItem {
    title: string;
    link: string;
    pubDate: string;
    source: string;
    contentSnippet: string;
    content?: string;
    image?: string;
}

const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

export default function NewsFeed() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);

    useEffect(() => {
        async function fetchNews() {
            try {
                const res = await fetch('/api/news');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setNews(data);
                }
            } catch (error) {
                console.error('Failed to fetch news:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, []);

    if (loading) {
        return (
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.loading}>Loading latest news</div>
                </div>
            </section>
        );
    }

    return (
        <section id="news" className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    {...reveal}
                    className={styles.header}
                >
                    <span className="slate-eyebrow">
                        <span className="slate-dot" />
                        From the wire
                    </span>
                    <h2 className={styles.title}>Hip hop news</h2>
                    <div className={styles.divider} />
                    <p className={styles.subtitle}>The latest headlines from across the culture</p>
                </motion.div>

                <div className={styles.grid}>
                    {news.slice(0, 6).map((item, index) => (
                        <motion.div
                            key={index}
                            role="button"
                            tabIndex={0}
                            aria-label={`Read: ${item.title}`}
                            onClick={() => setSelectedItem(item)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setSelectedItem(item);
                                }
                            }}
                            className={styles.card}
                            {...reveal}
                            transition={{ ...reveal.transition, delay: index * 0.08 }}
                        >
                            <span className={styles.topAccent} aria-hidden="true" />
                            <div className={styles.sourceBadge}>
                                <span className={styles.sourceDot} aria-hidden="true" />
                                <Radio size={13} strokeWidth={1.75} />
                                <span>{item.source}</span>
                            </div>
                            <h3 className={styles.newsTitle}>{item.title}</h3>
                            <p className={styles.snippet}>
                                {item.contentSnippet?.slice(0, 150)}
                                {item.contentSnippet?.length > 150 ? '...' : ''}
                            </p>
                            <div className={styles.footer}>
                                <span className={styles.date}>
                                    {new Date(item.pubDate).toLocaleDateString()}
                                </span>
                                <span className={styles.readCue}>
                                    <span className={styles.readLabel}>Read</span>
                                    <ExternalLink size={16} strokeWidth={1.5} />
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <NewsModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
            />
        </section>
    );
}
