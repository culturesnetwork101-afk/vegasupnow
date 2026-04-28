'use client';
import { useRef, useEffect, useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import styles from './RadioPlayer.module.css';

// --- CONFIG ---
const SUPABASE_URL = 'https://qeqvkttwytyywabtzeyx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlcXZrdHR3eXR5eXdhYnR6ZXl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2ODM4OTIsImV4cCI6MjA4MTI1OTg5Mn0.DwpN8dzoLxLcHnEtmMJWdTJ4_az_j3xmngM3YbWQguo';

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const TRACKS = [
    { t: "Gimme Back My Lighter", a: "I Am Joe Jack ft. Camo Dinero", u: "https://storage.googleapis.com/msgsndr/fgqUWBM3YOy5aDcVShG4/media/68cc72522e5c6130d029cd24.wav" },
    { t: "It's Not Your Fault", a: "Hellz Flame ft. I Am Joe Jack", u: "https://storage.googleapis.com/msgsndr/fgqUWBM3YOy5aDcVShG4/media/68cc7243b8000328d3372513.mpeg" },
    { t: "Beauty In The Dirt (Remix)", a: "Camo Dinero ft. I Am Joe Jack", u: "https://storage.googleapis.com/msgsndr/fgqUWBM3YOy5aDcVShG4/media/68cc7284ea71181e44965c9d.mpeg" },
    { t: "Get Right (Remix)", a: "I Am Joe Jack", u: "https://storage.googleapis.com/msgsndr/fgqUWBM3YOy5aDcVShG4/media/68cc726deaa0585ef7b3c5b3.mpeg" },
    { t: "Her Man", a: "Hellz Flame", u: "https://storage.googleapis.com/msgsndr/fgqUWBM3YOy5aDcVShG4/media/68cc7240eaa0584c20b3c140.mpeg" }
];

const keyFromUrl = (u: string) => 'ctr_' + btoa(u).replace(/=/g, '');
const inc = (id: string) => sb.rpc('increment_counter', { id });

export default function RadioPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [idx, setIdx] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.85);
    const [currentTrack, setCurrentTrack] = useState(TRACKS[0]);

    // Track loading
    const loadTrack = useCallback((i: number, autoPlay: boolean) => {
        const newIdx = (i + TRACKS.length) % TRACKS.length;
        setIdx(newIdx);
        setCurrentTrack(TRACKS[newIdx]);
        localStorage.setItem('ctr_idx_v1', String(newIdx));

        if (audioRef.current) {
            audioRef.current.src = TRACKS[newIdx].u;
            if (autoPlay) {
                audioRef.current.play().catch(e => console.warn("Autoplay blocked", e));
            }
        }
    }, [setIdx, setCurrentTrack]);

    const playNext = useCallback(() => loadTrack(idx + 1, true), [idx, loadTrack]);
    const playPrev = useCallback(() => loadTrack(idx - 1, true), [idx, loadTrack]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (audioRef.current.paused) {
            // Signal regular videos to pause
            window.dispatchEvent(new CustomEvent('media:play', { detail: { source: 'radio' } }));

            // If src is empty (first load), set it
            if (!audioRef.current.src) {
                audioRef.current.src = currentTrack.u;
            }
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };


    // Load track state
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedIdx = parseInt(localStorage.getItem('ctr_idx_v1') || '0', 10);
            if (!isNaN(savedIdx) && savedIdx >= 0 && savedIdx < TRACKS.length) {
                setIdx(savedIdx);
                setCurrentTrack(TRACKS[savedIdx]);
            }
        }
    }, []);

    // Initialize audio
    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
            audioRef.current.crossOrigin = 'anonymous';
            audioRef.current.preload = 'none';
        }

        const audio = audioRef.current;

        const handleEnded = async () => {
            // Count play
            const k = keyFromUrl(TRACKS[idx].u);
            try {
                // Increment counters in Supabase
                await inc(k);
                await inc('ctr_total');
                await sb.from('track_plays_log').insert({ track_id: k });
            } catch (err) {
                console.warn('Analytics failed:', err);
            }

            // Next track
            playNext();
        };

        const handlePlay = () => {
            console.log("Radio started playing");
            setPlaying(true);
        };
        const handlePause = () => {
            console.log("Radio paused");
            setPlaying(false);
        };

        const handleExternalPlay = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            console.log("RadioPlayer received media:play from", detail?.source);
            if (detail?.source !== 'radio') {
                console.log("Pausing radio due to external media");
                audio.pause();
                setPlaying(false);
                // Also trigger dispatch just in case others are listening
            }
        };

        window.addEventListener('media:play', handleExternalPlay);
        // Backup global pause
        (window as any).pauseVegasRadio = () => {
            console.log("Global pause command received");
            audio.pause();
            setPlaying(false);
        };

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        return () => {
            window.removeEventListener('media:play', handleExternalPlay);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, [idx, playNext]);

    const [totalPlays, setTotalPlays] = useState<string>('--');
    const [trackCounts, setTrackCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        async function fetchStats() {
            try {
                const { data: counters } = await sb.from('counters').select('*');
                if (counters) {
                    const countsMap: Record<string, number> = {};
                    counters.forEach(c => {
                        countsMap[c.id] = c.value;
                    });
                    setTrackCounts(countsMap);

                    const total = counters.find(c => c.id === 'ctr_total');
                    if (total) {
                        setTotalPlays(total.value.toLocaleString());
                    }
                }
            } catch (e) {
                console.error("Error fetching stats", e);
            }
        }
        fetchStats();
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    // Volume control
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Top Tracks logic: Map tracks to counts, sort and take top 3
    const topTracksSorted = [...TRACKS]
        .map(t => ({ ...t, count: trackCounts[keyFromUrl(t.u)] || 0 }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

    return (
        <section id="radio" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.title}>VEGAS UP NOW RADIO</h2>
                    <p className={styles.subtitle}>LIVE FROM VEGASUPNOW.COM</p>
                </div>

                <div className={styles.radioGrid}>
                    {/* MAIN PLAYER PANEL */}
                    <div className={styles.panel}>
                        <div className={styles.nowPlaying}>
                            <span className={styles.nowTitle}>{currentTrack.t}</span>
                            <span className={styles.nowArtist}>{currentTrack.a}</span>
                        </div>

                        <div className={styles.visualizerWrap}>
                            <div className={styles.visualizer} style={{ opacity: playing ? 1 : 0.3, height: '60px', gap: '4px', width: '100%', justifyContent: 'center' }}>
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={styles.bar}
                                        style={{
                                            animationDuration: `${0.4 + (i % 5) * 0.1}s`,
                                            height: `${20 + (i * 7) % 80}%`,
                                            width: '6px'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className={styles.sliderContainer} style={{ marginTop: '2rem' }}>
                            <span>🔊</span>
                            <input
                                type="range"
                                min="0" max="1" step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className={styles.slider}
                            />
                        </div>

                        <div className={styles.controls}>
                            <button onClick={playPrev} className={styles.btn}>⏮ Prev</button>
                            <button onClick={togglePlay} className={`${styles.btn} ${styles.playBtn}`}>
                                {playing ? '❚❚ PAUSE' : '▶ PLAY RADIO'}
                            </button>
                            <button onClick={playNext} className={styles.btn}>Next ⏭</button>
                        </div>
                    </div>

                    {/* PLAYLIST PANEL */}
                    <div className={styles.panel}>
                        <h3 className={styles.playlistHeader}>Session Playlist</h3>
                        <div className={styles.playlist}>
                            {TRACKS.map((t, i) => {
                                const count = trackCounts[keyFromUrl(t.u)] || 0;
                                return (
                                    <div
                                        key={i}
                                        className={`${styles.trackItem} ${idx === i ? styles.active : ''}`}
                                        onClick={() => loadTrack(i, true)}
                                    >
                                        <div className={styles.trackItemHeader}>
                                            <div>
                                                <div className={styles.trackName}>{t.t}</div>
                                                <div className={styles.trackArtist}>{t.a}</div>
                                                <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '2px' }}>Plays: {count.toLocaleString()}</div>
                                            </div>
                                            <button className={styles.trackPlayBtn}>
                                                {idx === i && playing ? 'PLAYING' : 'PLAY'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* STATS ROW */}
                <div className={styles.statsRow}>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>TOTAL RADIO PLAYS</div>
                        <div className={styles.statValue}>{totalPlays}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>TOP REQUESTED</div>
                        <ul className={styles.statList}>
                            {topTracksSorted.map((t, i) => (
                                <li key={i} className={styles.statListItem}>
                                    <span>{i + 1}. {t.t}</span>
                                    <span style={{ opacity: 0.5 }}>{t.count.toLocaleString()}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
