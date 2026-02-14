'use client';
import { useState, useRef, useEffect } from 'react';
import { useSound } from '@/components/SoundSystem';

// User-provided SVG Path for India Map with updated viewBox and transform
// Note: Dots coordinates are approximated for the new 360x360 viewBox.
const STATES_DATA = [
    { name: 'Jammu & Kashmir', schemes: 38, x: 152, y: 56, color: '#4DAA6A' },
    { name: 'Punjab', schemes: 45, x: 132, y: 88, color: '#2F7D4F' },
    { name: 'Haryana', schemes: 44, x: 140, y: 104, color: '#4DAA6A' },
    { name: 'Delhi', schemes: 45, x: 148, y: 109, color: '#7BC08F' },
    { name: 'Uttarakhand', schemes: 35, x: 168, y: 92, color: '#2F7D4F' },
    { name: 'Himachal Pradesh', schemes: 32, x: 156, y: 76, color: '#4DAA6A' },
    { name: 'Rajasthan', schemes: 65, x: 104, y: 128, color: '#2F7D4F' },
    { name: 'Uttar Pradesh', schemes: 82, x: 184, y: 128, color: '#4DAA6A' },
    { name: 'Bihar', schemes: 48, x: 224, y: 132, color: '#2F7D4F' },
    { name: 'Assam', schemes: 40, x: 264, y: 116, color: '#4DAA6A' },
    { name: 'West Bengal', schemes: 58, x: 232, y: 160, color: '#2F7D4F' },
    { name: 'Jharkhand', schemes: 38, x: 216, y: 152, color: '#4DAA6A' },
    { name: 'Gujarat', schemes: 55, x: 72, y: 168, color: '#2F7D4F' },
    { name: 'Madhya Pradesh', schemes: 52, x: 152, y: 176, color: '#4DAA6A' },
    { name: 'Chhattisgarh', schemes: 42, x: 188, y: 184, color: '#2F7D4F' },
    { name: 'Odisha', schemes: 43, x: 208, y: 200, color: '#4DAA6A' },
    { name: 'Maharashtra', schemes: 76, x: 120, y: 208, color: '#2F7D4F' },
    { name: 'Telangana', schemes: 50, x: 160, y: 232, color: '#4DAA6A' },
    { name: 'Andhra Pradesh', schemes: 55, x: 168, y: 256, color: '#2F7D4F' },
    { name: 'Karnataka', schemes: 63, x: 128, y: 264, color: '#4DAA6A' },
    { name: 'Goa', schemes: 25, x: 104, y: 248, color: '#7BC08F' },
    { name: 'Kerala', schemes: 68, x: 132, y: 304, color: '#2F7D4F' },
    { name: 'Tamil Nadu', schemes: 71, x: 152, y: 296, color: '#4DAA6A' },
    { name: 'Arunachal Pradesh', schemes: 22, x: 280, y: 100, color: '#2F7D4F' },
    { name: 'Meghalaya', schemes: 28, x: 256, y: 124, color: '#4DAA6A' },
];

export default function IndiaMap() {
    const [hoveredState, setHoveredState] = useState(null);
    const sectionRef = useRef(null);
    const { playHover } = useSound();

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
            { threshold: 0.1 }
        );
        sectionRef.current?.querySelectorAll('.reveal, .scale-in').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-12 relative overflow-hidden" style={{ background: '#051E17' }}> {/* Reduced padding */}
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-10">
                    <h2 className="reveal font-megrim text-5xl sm:text-6xl font-normal text-white mb-4 tracking-wide">
                        Coverage Across <span className="text-gradient">Bharat</span>
                    </h2>
                    <p className="reveal text-white/60 text-lg font-mukta max-w-2xl mx-auto">
                        From Kashmir to Kanyakumari, our AI indexes schemes for every region.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* SVG India Map with User Provided Path */}
                    <div className="scale-in relative flex items-center justify-center">
                        <svg viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[400px] h-auto drop-shadow-2xl">
                            <defs>
                                <filter id="india-glow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <linearGradient id="mapFill" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(47, 125, 79, 0.15)" />
                                    <stop offset="100%" stopColor="rgba(47, 125, 79, 0.25)" />
                                </linearGradient>
                            </defs>

                            <g transform="translate(0,360) scale(0.1,-0.1)">
                                <path
                                    d="M1016 3385 c-84 -30 -136 -68 -136 -99 0 -27 18 -46 43 -46 11 0 39 -18 63 -40 l43 -39 -34 -21 c-41 -25 -45 -35 -45 -119 0 -79 2 -81 109 -137 l73 -38 -40 -17 c-41 -18 -58 -45 -48 -77 9 -27 -60 -139 -89 -146 -16 -4 -27 -18 -36 -43 -18 -57 -153 -188 -201 -197 -33 -6 -38 -4 -38 12 0 24 -25 35 -48 23 -9 -5 -39 -32 -66 -59 -40 -42 -48 -55 -42 -76 3 -14 19 -32 36 -41 32 -17 35 -22 21 -44 -12 -18 6 -59 29 -66 10 -3 25 -25 34 -48 28 -73 18 -111 -23 -85 -15 9 -23 9 -34 0 -8 -7 -27 -10 -43 -8 -102 17 -112 16 -117 -3 -3 -14 -11 -17 -30 -14 -19 4 -27 0 -32 -16 -9 -29 7 -52 70 -106 51 -44 56 -46 86 -36 39 13 49 14 49 2 0 -14 -60 -31 -86 -25 -26 7 -54 -10 -54 -32 0 -7 15 -28 32 -47 18 -19 48 -52 67 -75 19 -22 48 -48 65 -57 30 -16 35 -16 103 4 39 12 76 28 83 36 6 8 14 33 16 56 2 23 6 45 9 47 5 6 9 -41 6 -73 -1 -11 3 -36 10 -56 9 -30 8 -41 -6 -69 -21 -41 -17 -92 20 -230 13 -52 25 -111 25 -130 0 -58 19 -111 70 -195 32 -53 50 -97 55 -130 12 -87 41 -164 79 -205 19 -22 38 -52 42 -67 4 -16 15 -44 24 -63 10 -19 23 -59 29 -88 21 -100 49 -149 102 -182 27 -16 57 -30 66 -30 29 0 83 49 83 75 0 27 23 43 70 49 39 4 47 13 34 33 -17 27 15 82 48 83 47 0 58 9 47 37 -5 13 -9 53 -9 87 0 53 6 74 35 129 l35 65 -19 57 c-14 41 -18 74 -14 118 6 70 16 87 49 87 15 0 33 13 50 35 22 29 33 35 64 35 41 0 66 21 72 60 2 16 16 32 43 47 22 12 45 34 51 49 6 15 28 39 49 53 21 14 59 53 85 86 25 33 57 65 70 70 106 45 142 83 144 152 1 32 6 37 66 69 39 20 72 31 85 28 38 -9 45 14 31 99 -8 42 -20 87 -28 100 -12 17 -13 28 -4 46 8 20 7 26 -13 42 -13 11 -29 19 -37 19 -32 0 4 52 45 65 32 10 25 30 -24 71 -25 20 -43 39 -40 43 9 9 75 9 81 -1 3 -4 16 -8 30 -8 21 0 24 -4 24 -39 0 -22 4 -42 9 -45 15 -10 72 -10 159 -2 l83 8 -7 -28 c-7 -30 -46 -70 -76 -80 -55 -17 -8 -153 48 -142 13 2 19 13 19 41 1 20 5 40 8 44 9 9 33 -54 41 -107 14 -91 40 -125 71 -93 12 11 15 31 13 73 -2 37 2 63 11 74 8 9 12 30 9 51 -4 32 -2 35 23 35 15 0 31 6 36 12 16 21 43 109 43 142 1 17 7 42 15 56 8 14 14 42 15 64 0 27 7 45 23 60 12 12 31 34 42 49 18 25 23 27 55 17 44 -13 68 6 51 38 -8 16 -7 27 7 52 17 30 17 31 -7 51 -13 10 -34 19 -46 19 -18 0 -22 4 -18 19 6 25 -11 57 -43 77 -24 16 -26 16 -54 -11 -29 -28 -31 -28 -71 -15 -40 13 -42 13 -60 -9 -11 -13 -19 -29 -19 -37 0 -8 -8 -15 -17 -15 -10 -1 -25 -2 -33 -3 -8 0 -19 -10 -25 -21 -18 -34 -76 -85 -98 -87 -12 0 -29 2 -39 6 -11 5 -17 2 -20 -11 -7 -31 4 -53 28 -59 16 -4 24 -13 24 -29 0 -18 -7 -24 -37 -29 -21 -3 -55 -6 -75 -6 -20 0 -48 -4 -62 -10 -37 -14 -100 8 -102 35 -3 66 -6 76 -27 90 -19 12 -30 13 -55 4 -27 -9 -30 -14 -22 -29 7 -13 6 -27 -2 -45 -10 -21 -9 -31 5 -55 21 -34 21 -35 3 -53 -11 -11 -26 -12 -68 -5 -184 32 -211 40 -232 73 -19 28 -68 38 -117 24 -33 -10 -41 -9 -64 9 -15 12 -43 24 -64 28 -20 4 -52 21 -71 38 -32 28 -57 42 -113 60 -14 5 -16 10 -7 25 5 11 10 30 10 44 0 15 9 28 26 37 14 8 30 23 36 33 12 23 6 30 -72 80 -30 20 -67 45 -82 57 -14 11 -31 20 -37 20 -6 0 -11 9 -11 20 0 12 -7 34 -14 49 -14 27 -14 28 8 24 15 -3 33 4 52 20 26 22 27 27 16 52 -7 14 -10 31 -7 36 4 5 -5 14 -18 20 -29 13 -35 69 -7 62 12 -3 25 7 39 31 13 20 28 39 34 43 7 5 20 25 30 47 16 35 16 40 2 62 -29 44 -59 57 -117 49 -29 -4 -70 -16 -90 -26 -45 -23 -58 -24 -58 -4 0 10 -10 15 -29 15 -23 0 -30 5 -33 22 -2 14 -16 29 -34 38 -16 8 -46 32 -65 53 -46 51 -89 56 -183 22z"
                                    fill="url(#mapFill)"
                                    stroke="rgba(168, 213, 186, 0.4)"
                                    strokeWidth="20" // Increased stroke width because of 0.1 scale? No, strokeWidth is in user coordinates. If inside scale(0.1), expected visible width needs to be huge. 
                                    // Wait, transform applies to stroke width too if vector-effect is not non-scaling-stroke.
                                    // Scale 0.1 means 20 stroke width becomes 2. That seems right compared to previous '2'.
                                    filter="url(#india-glow)"
                                    style={{ transition: 'all 0.5s ease' }}
                                />
                            </g>

                            {/* State dots - Need to ensure they are on top of the transformed group? 
                  The group has transform. Dots are separate.
                  Dots use the raw viewBox coordinates (0-360).
                  The group renders the map into the 0-360 box.
                  So we just need dots to match the visual map location.
                  I approximated the dot coordinates by scaling old ones by ~0.8.
              */}
                            {STATES_DATA.map((state, i) => (
                                <g key={i}
                                    onMouseEnter={() => { setHoveredState(state.name); playHover(); }}
                                    onMouseLeave={() => setHoveredState(null)}
                                    style={{ cursor: 'pointer' }} // Normal cursor since custom one is removed
                                >
                                    {hoveredState === state.name && (
                                        <>
                                            <circle cx={state.x} cy={state.y} r="18" fill="none" stroke={state.color} strokeWidth="1" opacity="0.6">
                                                <animate attributeName="r" from="8" to="22" dur="1.2s" repeatCount="indefinite" />
                                                <animate attributeName="opacity" from="0.6" to="0" dur="1.2s" repeatCount="indefinite" />
                                            </circle>
                                        </>
                                    )}

                                    <circle
                                        cx={state.x} cy={state.y}
                                        r={hoveredState === state.name ? 6 : 3.5}
                                        fill={hoveredState === state.name ? '#7BC08F' : state.color}
                                        stroke="white"
                                        strokeWidth="1"
                                        className="transition-all duration-300"
                                    />

                                    {hoveredState === state.name && (
                                        <g transform={`translate(${state.x}, ${state.y - 45})`}>
                                            <rect x="-60" y="-15" width="120" height="34" rx="8" fill="rgba(5, 30, 23, 0.95)" stroke="rgba(77, 170, 106, 0.4)" strokeWidth="1" />
                                            <text x="0" y="4" textAnchor="middle" fill="#E6F4EA" fontSize="11" fontWeight="600" fontFamily="Source Sans Pro, sans-serif">{state.name}</text>
                                            <text x="0" y="14" textAnchor="middle" fill="#A8D5BA" fontSize="9" fontFamily="Source Sans Pro, sans-serif">{state.schemes} schemes</text>
                                        </g>
                                    )}
                                </g>
                            ))}
                        </svg>
                    </div>

                    {/* Expanded State List */}
                    <div className="reveal">
                        <div className="glass-card p-6 max-h-[450px] overflow-y-auto relative gradient-border">
                            <h3 className="font-megrim text-3xl font-normal text-white mb-6 flex items-center gap-3">
                                <i className="bx bx-map-alt text-leaf-light"></i> Regional Index
                            </h3>
                            <div className="space-y-2 relative z-10 pr-2">
                                {STATES_DATA.sort((a, b) => b.schemes - a.schemes).map((state, i) => (
                                    <div key={i}
                                        className="flex items-center justify-between p-3 rounded-xl transition-all duration-200 hover:bg-white/5 border border-transparent hover:border-white/10 group"
                                        onMouseEnter={() => { setHoveredState(state.name); playHover(); }}
                                        onMouseLeave={() => setHoveredState(null)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]" style={{ background: state.color, color: state.color }} />
                                            <span className="text-sm text-white/90 font-mukta font-medium group-hover:text-white transition-colors">{state.name}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-1.5 rounded-full bg-white/5 overflow-hidden">
                                                <div className="h-full rounded-full transition-all duration-500 group-hover:bg-leaf-light" style={{ width: `${(state.schemes / 82) * 100}%`, background: state.color }} />
                                            </div>
                                            <span className="text-xs font-mono text-white/50 w-6 text-right group-hover:text-white transition-colors">{state.schemes}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
