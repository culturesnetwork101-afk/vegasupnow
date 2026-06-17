'use client';
import styles from './Marquee.module.css';

const DEFAULT_ITEMS = [
    'Hot 702.5 FM',
    'Hip-Hop',
    'R&B',
    'Pop',
    'Risky talk',
    'Live from Las Vegas',
    'Saturdays 12PM PST',
    'Vegas Up Now',
];

type MarqueeProps = {
    /** Ticker strings, separated by gold diamond glyphs. */
    items?: string[];
    /** Accent tone for the diamond separators + hairline borders. */
    tone?: 'gold' | 'red';
};

/**
 * Broadcast marquee ticker — a thin, full-width section divider that echoes the
 * hero's bottom marquee. Items scroll seamlessly (the group is duplicated and the
 * track translates -50%), separated by a gold diamond glyph. Decorative only
 * (aria-hidden); the scroll holds static under prefers-reduced-motion.
 */
export default function Marquee({ items = DEFAULT_ITEMS, tone = 'gold' }: MarqueeProps) {
    const toneClass = tone === 'red' ? styles.toneRed : styles.toneGold;
    return (
        <div className={`${styles.marquee} ${toneClass}`} aria-hidden="true">
            <div className={styles.track}>
                {[0, 1].map((copy) => (
                    <span className={styles.group} key={copy}>
                        {items.map((item, i) => (
                            <span className={styles.item} key={`${copy}-${i}`}>
                                {item}
                                <span className={styles.dot}>&#9670;</span>
                            </span>
                        ))}
                    </span>
                ))}
            </div>
        </div>
    );
}
