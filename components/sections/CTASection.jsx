'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link'; // Standard Next.js Link
import { useSound } from '@/components/SoundSystem';

export default function CTASection() {
    const sectionRef = useRef(null);
    const { playClick } = useSound();

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
            { threshold: 0.1 }
        );
        sectionRef.current?.querySelectorAll('.reveal, .scale-in').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="section-padding relative overflow-hidden flex items-center justify-center min-h-[60vh] bg-forest-dark">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none" />

            {/* Ambient Glow */}
            <div className="ambient-orb w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-leaf/20 blur-[120px]" />

            <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
                <h2 className="reveal font-megrim text-6xl sm:text-8xl font-normal text-white mb-8 tracking-wide leading-tight drop-shadow-2xl">
                    Claim Your <span className="text-gradient">Rights</span>
                </h2>
                <p className="reveal text-white/70 text-xl font-mukta mb-12 max-w-2xl mx-auto leading-relaxed">
                    Don&apos;t let lack of information stand between you and your benefits.
                    Check your eligibility in 2 minutes and start your application today.
                </p>

                <div className="scale-in flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/eligibility"
                        className="btn-primary text-xl px-10 py-5 w-full sm:w-auto flex items-center justify-center gap-3 btn-ripple shadow-xl shadow-leaf/20"
                        onClick={playClick}
                    >
                        <i className="bx bx-check-circle text-2xl"></i> Check Eligibility Free
                    </Link>
                    <Link
                        href="/schemes"
                        className="btn-secondary text-xl px-10 py-5 w-full sm:w-auto flex items-center justify-center gap-3 btn-ripple"
                        onClick={playClick}
                    >
                        <i className="bx bx-search text-2xl"></i> Browse All Schemes
                    </Link>
                </div>

                <p className="reveal mt-10 text-white/30 text-sm font-mukta">
                    Join 10+ Million citizens empowering themselves with PrajaAdhikaram.
                </p>
            </div>
        </section>
    );
}
