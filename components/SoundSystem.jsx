'use client';
import { useRef, useCallback, useState, useEffect, createContext, useContext } from 'react';

const SoundCtx = createContext(null);
export const useSound = () => useContext(SoundCtx) || { playClick: () => { }, playHover: () => { }, playOpen: () => { }, isMuted: false, toggleMute: () => { } };

export function SoundProvider({ children }) {
    const [isMuted, setIsMuted] = useState(false);
    const audioCtxRef = useRef(null);

    const getCtx = useCallback(() => {
        if (isMuted) return null; // Don't create or use if muted
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
        return audioCtxRef.current;
    }, [isMuted]);

    const toggleMute = useCallback(() => {
        setIsMuted(prev => !prev);
        // If playing any loop (like background music would, but that's gone now), we'd stop it here.
        // For one-off sounds, the check in playTone handles it.
    }, []);

    const playTone = useCallback((freq, dur, vol = 0.08, type = 'sine') => {
        if (isMuted) return;
        try {
            const ctx = getCtx();
            if (!ctx) return;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(vol, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + dur);
        } catch (e) { }
    }, [getCtx, isMuted]);

    const playClick = useCallback(() => {
        playTone(880, 0.08, 0.06, 'sine');
        playTone(1320, 0.06, 0.03, 'sine');
    }, [playTone]);

    const playHover = useCallback(() => {
        playTone(660, 0.05, 0.025, 'sine');
    }, [playTone]);

    const playOpen = useCallback(() => {
        playTone(440, 0.12, 0.05, 'sine');
        setTimeout(() => { if (!isMuted) playTone(660, 0.1, 0.04, 'sine') }, 60);
        setTimeout(() => { if (!isMuted) playTone(880, 0.08, 0.03, 'sine') }, 120);
    }, [playTone, isMuted]);

    return (
        <SoundCtx.Provider value={{ playClick, playHover, playOpen, isMuted, toggleMute }}>
            {children}
        </SoundCtx.Provider>
    );
}
