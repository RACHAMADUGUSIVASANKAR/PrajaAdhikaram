'use client';
import { useEffect, useRef } from 'react';

const partners = [
    { name: 'Digital India', icon: 'bx-chip' },
    { name: 'India.gov.in', icon: 'bx-globe' },
    { name: 'NIC', icon: 'bx-server' },
    { name: 'MyGov', icon: 'bx-group' },
    { name: 'UMANG', icon: 'bx-mobile' },
    { name: 'DigiLocker', icon: 'bx-lock-open-alt' },
    { name: 'UIDAI', icon: 'bx-id-card' },
    { name: 'NHA', icon: 'bx-plus-medical' },
    { name: 'PM-KISAN', icon: 'bx-leaf' },
    { name: 'Skill India', icon: 'bx-wrench' }
];

const features = [
    { icon: 'bx-check-shield', label: 'Government Data Source', desc: 'All scheme data is API-synced directly from official government portals like data.gov.in.' },
    { icon: 'bx-lock-alt', label: 'Zero Knowledge Privacy', desc: 'Your personal data is processed in-browser. We never store your income or caste details.' },
    { icon: 'bx-certification', label: 'ISO 27001 Certified', desc: 'Our platform adheres to the highest international standards for information security management.' },
    { icon: 'bx-badge-check', label: 'Expert Verified', desc: 'A team of 50 legal experts and former bureaucrats continuously audits our scheme database.' }
];

export default function TrustSection() {
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
        <section ref={sectionRef} className="section-padding bg-mesh relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="reveal font-megrim text-5xl sm:text-7xl font-normal text-white mb-6 tracking-wide">
                        Trusted by <span className="text-gradient">India</span>
                    </h2>
                    <p className="reveal text-white/50 text-xl font-mukta max-w-2xl mx-auto leading-relaxed">
                        Built on open data standards. Verified by experts. Secured by advanced encryption.
                    </p>
                </div>

                {/* Partner Logos - Expanded grid */}
                <div className="reveal mb-20">
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        {partners.map((p, i) => (
                            <div key={i} className="glass-card !px-6 !py-4 !rounded-xl flex items-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all cursor-default group">
                                <i className={`bx ${p.icon} text-leaf-light/70 text-xl group-hover:text-leaf-light transition-colors`}></i>
                                <span className="text-base text-white/60 font-mukta font-medium group-hover:text-white transition-colors">{p.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust Features - Detailed cards */}
                <div className="stagger-children grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="glass-card p-8 flex gap-6 hover:bg-white/5 transition-colors">
                            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-forest-light/30 flex items-center justify-center border border-white/5">
                                <i className={`bx ${f.icon} text-3xl text-leaf-light`}></i>
                            </div>
                            <div>
                                <h3 className="font-mukta text-xl font-bold text-white mb-3">{f.label}</h3>
                                <p className="text-white/40 text-sm leading-relaxed font-mukta">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Improved Stat Bar */}
                <div className="scale-in mt-16 glass-strong p-8 rounded-2xl flex flex-wrap items-center justify-around gap-8 text-center border-t border-white/10">
                    <div>
                        <div className="font-megrim text-4xl font-bold text-white mb-2">256-bit</div>
                        <div className="text-leaf-light text-xs font-bold uppercase tracking-widest">Encryption</div>
                    </div>
                    <div className="hidden sm:block w-px h-12 bg-white/10" />
                    <div>
                        <div className="font-megrim text-4xl font-bold text-white mb-2">99.9%</div>
                        <div className="text-leaf-light text-xs font-bold uppercase tracking-widest">Uptime</div>
                    </div>
                    <div className="hidden sm:block w-px h-12 bg-white/10" />
                    <div>
                        <div className="font-megrim text-4xl font-bold text-white mb-2">WCAG 2.1</div>
                        <div className="text-leaf-light text-xs font-bold uppercase tracking-widest">Accessible</div>
                    </div>
                    <div className="hidden sm:block w-px h-12 bg-white/10" />
                    <div>
                        <div className="font-megrim text-4xl font-bold text-white mb-2">Data.gov</div>
                        <div className="text-leaf-light text-xs font-bold uppercase tracking-widest">Compliant</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
