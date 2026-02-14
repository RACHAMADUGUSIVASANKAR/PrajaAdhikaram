'use client';
import { useEffect, useState } from 'react';
import { useSound } from './SoundSystem';
import Link from 'next/link';

const NAV_LINKS = [
    { href: '/', label: 'Home', icon: 'bx-home' },
    { href: '/eligibility', label: 'Check Eligibility', icon: 'bx-search-alt-2' },
    { href: '/schemes', label: 'Schemes', icon: 'bx-grid-alt' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { playClick } = useSound();

    useEffect(() => {
        const handler = () => setIsScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" // Increased z-index to 50
            style={{
                background: isScrolled ? 'rgba(5, 30, 23, 0.95)' : 'transparent', // darker bg on scroll
                backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
                boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.15)' : 'none',
                height: '80px', // Fixed height to prevent layout shifts
            }}
        >
            <nav className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative z-50">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group z-50" onClick={playClick}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-mukta font-bold text-white text-lg glass-card !p-0 relative"
                        style={{ border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                        <span className="relative z-10">प</span>
                    </div>
                    <span className="font-mukta text-xl font-bold tracking-wide">
                        <span className="text-leaf-light">Praja</span>
                        <span className="text-white/80">Adhikaram</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-2">
                    {NAV_LINKS.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="px-5 py-2.5 rounded-xl text-base font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2 z-50"
                            onClick={playClick}
                        >
                            <i className={`bx ${link.icon} text-leaf-light/70`}></i>
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-3 z-50">
                    <Link
                        href="/eligibility"
                        className="btn-primary !py-2.5 !px-6 !text-base flex items-center gap-2 btn-ripple"
                        onClick={playClick}
                    >
                        <i className="bx bx-search-alt-2"></i> Get Started
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center glass-card !p-0 relative z-50 btn-ripple"
                    onClick={() => { setMobileOpen(!mobileOpen); playClick(); }}
                    style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                    <i className={`bx ${mobileOpen ? 'bx-x' : 'bx-menu'} text-white text-2xl relative z-10`}></i>
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div
                    className="md:hidden absolute top-full left-0 right-0 px-6 pb-8 pt-4 shadow-2xl z-40"
                    style={{
                        background: 'rgba(5, 30, 23, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <div className="space-y-3">
                        {NAV_LINKS.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block px-5 py-4 rounded-xl text-lg font-medium text-white/80 hover:text-white hover:bg-white/5 transition-all flex items-center gap-4"
                                onClick={() => { setMobileOpen(false); playClick(); }}
                            >
                                <i className={`bx ${link.icon} text-leaf-light/60 text-xl`}></i>
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/eligibility"
                            className="block btn-primary !text-base text-center mt-6 w-full py-4 btn-ripple"
                            onClick={() => { setMobileOpen(false); playClick(); }}
                        >
                            <i className="bx bx-search-alt-2 mr-2"></i> Get Started
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
