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

        const handlePlay = () => setPlaying(true);
        const handlePause = () => setPlaying(false);

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, [idx, playNext]);

    // Volume control
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    return (
        <div className={styles.playerContainer}>
            {/* Visualizer (CSS Animation based on play state) */}
            <div className={styles.visualizer} style={{ opacity: playing ? 1 : 0.3 }}>
                <div className={styles.bar} style={{ animationDuration: '0.4s' }} />
                <div className={styles.bar} style={{ animationDuration: '0.6s' }} />
                <div className={styles.bar} style={{ animationDuration: '0.5s' }} />
                <div className={styles.bar} style={{ animationDuration: '0.7s' }} />
            </div>

            <div className={styles.trackInfo}>
                <div className={styles.trackTitle}>{currentTrack.t}</div>
                <div className={styles.trackArtist}>{currentTrack.a}</div>
            </div>

            <div className={styles.controls}>
                <button onClick={playPrev} className={styles.controlButton}>⏮</button>
                <button onClick={togglePlay} className={`${styles.controlButton} ${styles.playButton}`}>
                    {playing ? '❚❚' : '▶'}
                </button>
                <button onClick={playNext} className={styles.controlButton}>⏭</button>
            </div>

            <div className={styles.volumeControl}>
                <span>🔊</span>
                <input
                    type="range"
                    min="0" max="1" step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className={styles.volumeInput}
                />
            </div>
        </div>
    );
}
