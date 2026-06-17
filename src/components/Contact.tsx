'use client';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2 } from 'lucide-react';
import { CONTACT_EMAIL } from '@/lib/social';
import styles from './Contact.module.css';

const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
    const [status, setStatus] = useState<Status>('idle');
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [honey, setHoney] = useState('');

    const update = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (honey) return; // honeypot tripped, silently drop
        setStatus('submitting');
        try {
            const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    message: form.message,
                    _subject: 'New message from vegasupnowradio.com',
                    _template: 'table',
                    _captcha: 'false',
                }),
            });
            const data = await res.json();
            if (res.ok && (data.success === 'true' || data.success === true)) {
                setStatus('success');
                setForm({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className={styles.section}>
            <div className={styles.container}>
                <motion.div className={styles.header} {...reveal}>
                    <span className={`slate-eyebrow ${styles.eyebrow}`}>
                        <span className="slate-dot" />
                        Say hello
                    </span>
                    <h2 className={`neon-title neon-breathe-gold ${styles.title}`}>Get in touch</h2>
                    <div className={`divider ${styles.divider}`} />
                    <p className={styles.lead}>
                        Real people you can reach. Send a note and we will get back to you.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.contactLayout}
                    {...reveal}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                >
                    {status === 'success' ? (
                        <div className={`glass ${styles.formCard} ${styles.stateCard}`} role="status">
                            <span className={styles.iconRing}>
                                <CheckCircle2 size={28} strokeWidth={1.6} />
                            </span>
                            <h3 className={styles.stateTitle}>Message sent</h3>
                            <p className={styles.stateText}>
                                Thanks for reaching out. We will get back to you soon.
                            </p>
                            <button type="button" className="btn btn-ghost" onClick={() => setStatus('idle')}>
                                Send another
                            </button>
                        </div>
                    ) : (
                        <form className={`glass ${styles.formCard}`} onSubmit={handleSubmit}>
                            <div className={styles.field}>
                                <label htmlFor="cf-name">Name</label>
                                <input
                                    id="cf-name"
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    value={form.name}
                                    onChange={update}
                                    placeholder="Your name"
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="cf-email">Email</label>
                                <input
                                    id="cf-email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={update}
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="cf-message">Message</label>
                                <textarea
                                    id="cf-message"
                                    name="message"
                                    required
                                    rows={5}
                                    value={form.message}
                                    onChange={update}
                                    placeholder="What's on your mind?"
                                />
                            </div>

                            {/* Honeypot: hidden from people, bots fill it and get dropped. */}
                            <input
                                type="text"
                                name="_honey"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                className={styles.honey}
                                value={honey}
                                onChange={(e) => setHoney(e.target.value)}
                            />

                            <button
                                type="submit"
                                className={`btn btn-primary ${styles.submitBtn}`}
                                disabled={status === 'submitting'}
                            >
                                {status === 'submitting' ? 'Sending...' : 'Send message'}
                            </button>

                            {status === 'error' && (
                                <p className={styles.errorMsg} role="alert">
                                    Something went wrong. Please email us at {CONTACT_EMAIL}.
                                </p>
                            )}
                        </form>
                    )}

                    {/* Direct email: secondary channel */}
                    <a href={`mailto:${CONTACT_EMAIL}`} className={`glass ${styles.contactCard}`}>
                        <span className={styles.cardSheen} aria-hidden="true" />
                        <span className={styles.cardChannel} aria-hidden="true">
                            <span className={styles.cardTally} />
                            On air mail
                        </span>
                        <span className={styles.iconRing}>
                            <Mail size={28} strokeWidth={1.6} />
                        </span>
                        <span className={styles.contactLabel}>Prefer email?</span>
                        <span className={styles.contactValue}>{CONTACT_EMAIL}</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
