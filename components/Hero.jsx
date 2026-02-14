'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link'; // Ensure Link is imported

const ParticleBackground = dynamic(() => import('./ParticleBackground'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-forest-700" />,
});

export default function Hero() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const children = el.querySelectorAll('.reveal-hero');
        children.forEach((child, i) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(30px)';
            setTimeout(() => {
                child.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, 300 + i * 200);
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" // added pt-20 for navbar space
            style={{ background: 'linear-gradient(180deg, #051E17 0%, #0B3D2E 40%, #082D22 100%)' }}
        >
            <div className="absolute inset-0 z-0">
                <ParticleBackground />
            </div>

            {/* Ambient orbs */}
            <div className="ambient-orb w-96 h-96 top-20 left-10 z-0" style={{ background: '#2F7D4F' }} />
            <div className="ambient-orb w-80 h-80 bottom-20 right-20 z-0" style={{ background: '#1F5C3A' }} />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Headline — Bebas Neue display font */}
                <h1 className="reveal-hero font-megrim text-6xl sm:text-7xl lg:text-9xl font-normal leading-tight tracking-wide mb-8 drop-shadow-lg">
                    <span className="text-white">AI That Connects</span>
                    <br />
                    <span className="text-gradient">Every Citizen</span>
                    <br />
                    <span className="text-white/90">to Their Rights.</span>
                </h1>

                {/* Subtext — Source Sans Pro */}
                <p className="reveal-hero text-xl sm:text-2xl text-leaf-light/80 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                    Discover, understand, and apply for government schemes instantly —
                    powered by AI that speaks your language. Bridging the gap between
                    policy and people across all 28 states and 8 union territories.
                </p>

                {/* CTA Buttons - Ensure correct Link usage */}
                <div className="reveal-hero flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link href="/eligibility" className="btn-primary text-xl px-12 py-5 flex items-center gap-3 btn-ripple z-20">
                        <i className="bx bx-search-alt-2"></i> Check Eligibility Now
                    </Link>
                    <Link href="/schemes" className="btn-secondary text-xl px-12 py-5 flex items-center gap-3 btn-ripple z-20">
                        <i className="bx bx-grid-alt"></i> Browse Schemes
                    </Link>
                </div>

                {/* Trust Badges */}
                <div className="reveal-hero mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-leaf-light/50 uppercase tracking-widest font-semibold">
                    <span className="flex items-center gap-2"><i className="bx bx-data text-lg"></i> 500+ Schemes</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-leaf-light/30" />
                    <span className="flex items-center gap-2"><i className="bx bx-map text-lg"></i> Pan-India</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-leaf-light/30" />
                    <span className="flex items-center gap-2"><i className="bx bx-bot text-lg"></i> AI-Powered</span>
                </div>
            </div>

            {/* Scroll indicator removed requested by user */}
        </section>
    );
}
