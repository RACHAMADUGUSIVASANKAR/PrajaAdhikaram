'use client';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer
            className="relative border-t"
            style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255, 255, 255, 0.06)',
            }}
        >
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl glass-card !p-0 flex items-center justify-center font-mukta font-bold text-white text-sm relative"
                                style={{ border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                                <span className="relative z-10">प</span>
                            </div>
                            <span className="font-mukta text-lg font-bold">
                                <span className="text-leaf-light">Praja</span>
                                <span className="text-white/70">Adhikaram</span>
                            </span>
                        </div>
                        <p className="text-white/30 text-sm leading-relaxed max-w-md" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                            AI-powered platform connecting Indian citizens with government schemes they&apos;re eligible for. Making governance accessible, transparent, and inclusive.
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            <a href="#" className="w-9 h-9 rounded-xl glass-card !p-0 flex items-center justify-center relative hover:border-white/20 transition-all" style={{ border: '1px solid rgba(255, 255, 255, 0.08)', cursor: 'none' }}>
                                <i className="bx bxl-twitter text-white/40 hover:text-white relative z-10"></i>
                            </a>
                            <a href="#" className="w-9 h-9 rounded-xl glass-card !p-0 flex items-center justify-center relative hover:border-white/20 transition-all" style={{ border: '1px solid rgba(255, 255, 255, 0.08)', cursor: 'none' }}>
                                <i className="bx bxl-github text-white/40 hover:text-white relative z-10"></i>
                            </a>
                            <a href="#" className="w-9 h-9 rounded-xl glass-card !p-0 flex items-center justify-center relative hover:border-white/20 transition-all" style={{ border: '1px solid rgba(255, 255, 255, 0.08)', cursor: 'none' }}>
                                <i className="bx bxl-linkedin text-white/40 hover:text-white relative z-10"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4 font-mukta">Platform</h4>
                        <ul className="space-y-2.5">
                            {[
                                { href: '/', label: 'Home', icon: 'bx-home' },
                                { href: '/eligibility', label: 'Check Eligibility', icon: 'bx-search-alt-2' },
                                { href: '/schemes', label: 'Browse Schemes', icon: 'bx-grid-alt' },
                            ].map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-white/30 hover:text-leaf-light transition-colors flex items-center gap-2" style={{ fontFamily: "'Open Sans', sans-serif", cursor: 'none' }}>
                                        <i className={`bx ${link.icon} text-xs`}></i> {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4 font-mukta">Resources</h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'About', icon: 'bx-info-circle' },
                                { label: 'Privacy Policy', icon: 'bx-shield' },
                                { label: 'Terms of Use', icon: 'bx-file' },
                                { label: 'Contact', icon: 'bx-envelope' },
                            ].map(item => (
                                <li key={item.label}>
                                    <span className="text-sm text-white/30 hover:text-leaf-light transition-colors flex items-center gap-2" style={{ fontFamily: "'Open Sans', sans-serif", cursor: 'none' }}>
                                        <i className={`bx ${item.icon} text-xs`}></i> {item.label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/20" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    <span className="flex items-center gap-1"><i className="bx bx-copyright text-sm"></i> {currentYear} PrajaAdhikaram AI. Built for India.</span>
                    <span className="flex items-center gap-1"><i className="bx bx-chip text-sm"></i> Powered by AI · Open Government Data</span>
                </div>
            </div>
        </footer>
    );
}
