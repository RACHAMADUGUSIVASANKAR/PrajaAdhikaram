'use client';
import { useEffect, useRef } from 'react';

const solutions = [
    {
        title: 'Unified Intelligence',
        desc: 'Our AI aggregates live data from 500+ central and state portals into a single, searchable knowledge graph.',
        icon: 'bx-brain'
    },
    {
        title: 'Hyper-Personalization',
        desc: 'We analyze your profile against 150+ parameters—income, demographics, occupation—to find matches with 99% accuracy.',
        icon: 'bx-target-lock'
    },
    {
        title: 'Vernacular First',
        desc: 'Interact in your mother tongue. Our AI understands and speaks 12 Indian languages natively, breaking the literacy barrier.',
        icon: 'bx-chat'
    }
];

export default function SolutionSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
            { threshold: 0.1 }
        );
        sectionRef.current?.querySelectorAll('.reveal, .slide-left, .slide-right').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="section-padding relative overflow-hidden bg-mesh">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="reveal font-megrim text-5xl sm:text-7xl font-normal text-white mb-8 tracking-wide">
                            The <span className="text-gradient">AI Bridge</span>
                        </h2>
                        <p className="reveal text-white/60 text-xl font-mukta mb-12 leading-relaxed">
                            PrajaAdhikaram isn&apos;t just a search engine; it&apos;s an intelligent agent that advocates for you. We&apos;ve built the country&apos;s first Citizen-Scheme Fit engine.
                        </p>

                        <div className="space-y-8">
                            {solutions.map((s, i) => (
                                <div key={i} className={`slide-left flex gap-6 p-6 rounded-2xl transition-all hover:bg-white/5 border border-transparent hover:border-white/10`} style={{ transitionDelay: `${i * 100}ms` }}>
                                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-forest-light/40 flex items-center justify-center text-3xl text-leaf-light shadow-lg shadow-leaf/10">
                                        <i className={`bx ${s.icon}`}></i>
                                    </div>
                                    <div>
                                        <h3 className="font-mukta text-2xl font-bold text-white mb-2">{s.title}</h3>
                                        <p className="text-white/40 text-base leading-relaxed">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="slide-right relative h-[500px] flex items-center justify-center">
                        {/* Abstract visual representation of AI */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-leaf/20 to-transparent rounded-full blur-[100px]" />
                        <div className="glass-strong p-8 rounded-3xl w-full max-w-sm relative z-10 border border-leaf/30">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <span className="text-xs uppercase tracking-widest text-white/30">Processing</span>
                            </div>
                            <div className="space-y-4 font-mono text-sm">
                                <div className="flex justify-between items-center text-leaf-light">
                                    <span>&gt; Input Profile</span>
                                    <i className="bx bx-check-circle"></i>
                                </div>
                                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-leaf w-full" />
                                </div>
                                <div className="flex justify-between items-center text-leaf-light delay-75">
                                    <span>&gt; Scanning Schemes</span>
                                    <i className="bx bx-loader-alt animate-spin"></i>
                                </div>
                                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-leaf w-3/4 animate-pulse" />
                                </div>
                                <div className="p-4 bg-forest-dark/50 rounded-lg border border-white/5 mt-4">
                                    <span className="text-green-400 block mb-1">Match Found:</span>
                                    <span className="text-white block">PM Vishwakarma Yojana</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
