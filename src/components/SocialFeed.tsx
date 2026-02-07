'use client';
import styles from './SocialFeed.module.css';

export default function SocialFeed() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>FOLLOW THE SHOW</h2>
                <div className={styles.divider} />
                <p className={styles.subtitle}>
                    Stay connected with Vegas Up Now on social media for behind-the-scenes content, show updates, and more.
                </p>
            </div>
        </section>
    );
}
