'use client';
import { useSound } from './SoundSystem';

export default function SchemeCard({ scheme }) {
    const { playClick, playHover } = useSound();

    const handleClick = () => {
        playClick();
        if (scheme.url) {
            window.open(scheme.url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div
            className="glass-card p-6 group relative"
            onClick={handleClick}
            onMouseEnter={playHover}
            style={{ cursor: 'none' }}
        >
            {/* Category + Icon */}
            <div className="flex items-center justify-between mb-4 relative z-10">
                <span
                    className="text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                    style={{
                        background: 'rgba(47, 125, 79, 0.12)',
                        color: '#A8D5BA',
                        border: '1px solid rgba(47, 125, 79, 0.15)',
                    }}
                >
                    <i className={`bx ${scheme.icon || 'bx-file'} text-sm`}></i>
                    {scheme.category}
                </span>
                {scheme.scope && (
                    <span className="text-[10px] text-white/30 px-2 py-0.5 rounded-full bg-white/5 font-medium uppercase tracking-wider">
                        {scheme.scope}
                    </span>
                )}
            </div>

            {/* Name */}
            <h3 className="font-mukta text-lg font-bold text-white mb-2 group-hover:text-leaf-light transition-colors relative z-10">
                {scheme.name}
            </h3>

            {/* Benefit */}
            <div className="flex items-center gap-2 mb-3 relative z-10">
                <i className="bx bx-gift text-leaf text-sm"></i>
                <span className="text-leaf text-sm font-semibold">{scheme.benefit}</span>
            </div>

            {/* Description */}
            <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2 relative z-10" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                {scheme.description}
            </p>

            {/* Documents */}
            {scheme.documents && (
                <div className="relative z-10">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {scheme.documents.slice(0, 3).map((doc, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-white/30">
                                {doc}
                            </span>
                        ))}
                        {scheme.documents.length > 3 && (
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-white/30">
                                +{scheme.documents.length - 3} more
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Visit Portal CTA */}
            <div className="flex items-center gap-1 text-xs text-leaf-light/40 group-hover:text-leaf-light transition-colors relative z-10">
                <i className="bx bx-link-external"></i>
                <span>Visit Official Portal</span>
                <i className="bx bx-right-arrow-alt ml-auto group-hover:translate-x-1 transition-transform"></i>
            </div>

            {/* Match score if present */}
            {scheme.confidence_score && (
                <div className="absolute top-4 right-4 z-10">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold text-green-400"
                        style={{ background: 'rgba(47, 125, 79, 0.2)', border: '2px solid rgba(77, 170, 106, 0.3)' }}>
                        {Math.round(scheme.confidence_score * 100)}%
                    </div>
                </div>
            )}
        </div>
    );
}
