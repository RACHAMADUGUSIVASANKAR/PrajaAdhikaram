'use client';
import { useEffect, useRef } from 'react';

const stats = [
    { value: '10M+', label: 'Citizens Reached', desc: 'Across 28 states' },
    { value: '₹500Cr', label: 'Benefits Unlocked', desc: 'Direct to beneficiaries' },
    { value: '14,000+', label: 'Schemes Indexed', desc: 'Central & State' },
    { value: '4.8/5', label: 'User Rating', desc: 'From 50k+ reviews' }
];

export default function ImpactSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
            { threshold: 0.1 }
        );
        sectionRef.current?.querySelectorAll('.reveal, .stagger-children, .scale-in').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="section-padding relative overflow-hidden bg-mesh">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    <div>
                        <h2 className="reveal font-megrim text-5xl sm:text-7xl font-normal text-white mb-8 tracking-wide leading-tight">
                            Real <span className="text-gradient">Impact</span><br />
                            Real Lives.
                        </h2>
                        <p className="reveal text-white/60 text-xl font-mukta mb-8 leading-relaxed">
                            We measure our success not just in traffic, but in livelihoods improved. From a farmer in Vidarbha getting crop insurance to a student in Chennai securing a scholarship—every interaction matters.
                        </p>
                        <div className="reveal p-6 glass-card border-l-4 border-leaf-light rounded-r-xl">
                            <p className="text-lg text-white/90 italic font-mukta">
                                &ldquo;Development is about transforming the lives of people, not just transforming economies.&rdquo;
                            </p>
                            <p className="text-sm text-leaf-light mt-2 font-bold uppercase tracking-wider">— Our Vision</p>
                        </div>
                    </div>

                    <div className="stagger-children grid grid-cols-2 gap-6">
                        {stats.map((s, i) => (
                            <div key={i} className="glass-card p-6 text-center hover:transform hover:-translate-y-2 transition-transform duration-300">
                                <div className="font-megrim text-5xl font-bold text-white mb-2 counter-value">{s.value}</div>
                                <div className="text-leaf-light font-bold text-sm uppercase tracking-wider mb-2">{s.label}</div>
                                <div className="text-white/30 text-xs">{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Aggregation Visual */}
                <div className="scale-in glass-strong p-10 rounded-3xl text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-leaf/10 to-transparent pointer-events-none" />
                    <h3 className="font-mukta text-3xl font-bold text-white mb-4 relative z-10">Join the Movement</h3>
                    <p className="text-white/50 max-w-2xl mx-auto mb-8 relative z-10 font-mukta text-lg">
                        We are building the digital infrastructure for a more inclusive India. Partner with us to bring governance to the last mile.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 relative z-10 text-xs font-bold text-white/70 uppercase tracking-wider">
                        <span className="px-5 py-2.5 rounded-full glass bg-white/5 hover:bg-leaf/20 transition-colors cursor-default">NGOs</span>
                        <span className="px-5 py-2.5 rounded-full glass bg-white/5 hover:bg-leaf/20 transition-colors cursor-default">CSCs</span>
                        <span className="px-5 py-2.5 rounded-full glass bg-white/5 hover:bg-leaf/20 transition-colors cursor-default">Self Help Groups</span>
                        <span className="px-5 py-2.5 rounded-full glass bg-white/5 hover:bg-leaf/20 transition-colors cursor-default">Local Bodies</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
