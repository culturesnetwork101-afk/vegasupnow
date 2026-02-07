'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Newspaper } from 'lucide-react';
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
                    <div className={styles.loading}>Loading Latest News...</div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.header}
                >
                    <h2 className={styles.title}>HIP HOP NEWS</h2>
                    <div className={styles.divider} />
                    <p className={styles.subtitle}>The latest headlines from across the culture</p>
                </motion.div>

                <div className={styles.grid}>
                    {news.slice(0, 6).map((item, index) => (
                        <motion.div
                            key={index}
                            onClick={() => setSelectedItem(item)}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div className={styles.sourceBadge}>
                                <Newspaper size={14} />
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
                                <ExternalLink size={16} />
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
