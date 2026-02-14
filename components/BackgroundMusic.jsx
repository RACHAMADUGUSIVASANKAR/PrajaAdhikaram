'use client';
import { useRef, useCallback, useState, useEffect } from 'react';

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioCtxRef = useRef(null);
    const nodesRef = useRef([]);
    const masterGainRef = useRef(null);

    const startMusic = useCallback(() => {
        if (audioCtxRef.current) return;

        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;

        // Peaceful ambient chord — A minor pentatonic
        const freqs = [110, 130.81, 164.81, 196, 220, 261.63, 329.63];
        freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = i % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.015 / (i + 1), ctx.currentTime);

            // Gentle LFO for organic movement
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            lfo.type = 'sine';
            lfo.frequency.setValueAtTime(0.08 + i * 0.03, ctx.currentTime);
            lfoGain.gain.setValueAtTime(0.004, ctx.currentTime);
            lfo.connect(lfoGain);
            lfoGain.connect(gain.gain);
            lfo.start();

            osc.connect(gain);
            gain.connect(masterGain);
            osc.start();
            nodesRef.current.push(osc, lfo);
        });

        // Filtered noise for wind/breeze texture
        const bufferSize = ctx.sampleRate * 4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.008;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(250, ctx.currentTime);
        filter.Q.setValueAtTime(0.5, ctx.currentTime);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.2, ctx.currentTime);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(masterGain);
        noise.start();
        nodesRef.current.push(noise);

        setIsPlaying(true);
    }, []);

    const stopMusic = useCallback(() => {
        nodesRef.current.forEach(n => { try { n.stop(); } catch (e) { } });
        nodesRef.current = [];
        if (audioCtxRef.current) {
            audioCtxRef.current.close().catch(() => { });
            audioCtxRef.current = null;
        }
        masterGainRef.current = null;
        setIsPlaying(false);
    }, []);

    const toggle = useCallback(() => {
        isPlaying ? stopMusic() : startMusic();
    }, [isPlaying, startMusic, stopMusic]);

    useEffect(() => () => stopMusic(), [stopMusic]);

    return (
        <button
            onClick={toggle}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 glass-card !p-0"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
            title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
            <i className={`bx ${isPlaying ? 'bx-pause' : 'bx-play'} text-leaf-light text-xl relative z-10`}></i>
            {isPlaying && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            )}
        </button>
    );
}
