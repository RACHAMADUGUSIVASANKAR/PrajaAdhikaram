'use client';
import { useSound } from '@/components/SoundSystem';

export default function SoundToggle() {
    const { isMuted, toggleMute, playClick } = useSound();

    const handleToggle = () => {
        playClick();
        toggleMute();
    };

    return (
        <button
            onClick={handleToggle}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 glass-card !p-0 btn-ripple"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
            aria-label={isMuted ? 'Unmute Sounds' : 'Mute Sounds'}
            title={isMuted ? 'Unmute Sounds' : 'Mute Sounds'}
        >
            <i className={`bx ${isMuted ? 'bx-volume-mute' : 'bx-volume-full'} text-leaf-light text-xl relative z-10`}></i>
        </button>
    );
}
