'use client';
import { useEffect, useRef } from 'react';

const problems = [
    {
        title: 'Fragmented Information',
        desc: 'Government data is scattered across thousands of disconnected portals, PDFs, and local offices, making it impossible to find.',
        icon: 'bx-scatter-chart'
    },
    {
        title: 'Language Barrier',
        desc: 'Most official documentation is in technical English or Hindi, excluding millions who speak regional languages like Tamil, Telugu, or Kannada.',
        icon: 'bx-globe'
    },
    {
        title: 'Complex Eligibility',
        desc: 'Understanding criteria involving income slabs, caste categories, and land holding limits requires legal expertise that most citizens lack.',
        icon: 'bx-file-find'
    },
    {
        title: 'Zero Guidance',
        desc: 'Citizens often apply for the wrong schemes or miss deadlines simply because there is no one to guide them through the process.',
        icon: 'bx-help-circle'
    }
];

export default function ProblemSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
            { threshold: 0.1 }
        );
        sectionRef.current?.querySelectorAll('.reveal, .stagger-children').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="section-padding relative overflow-hidden" style={{ background: '#051E17' }}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="reveal font-megrim text-5xl sm:text-6xl font-normal text-white mb-6 tracking-wide">
                        The <span className="text-gradient">Visibility Gap</span>
                    </h2>
                    <p className="reveal text-white/60 text-xl font-mukta max-w-3xl mx-auto leading-relaxed">
                        Every year, ₹2.5 Lakh Crore of allocated government funds go unutilized simply because citizens don&apos;t know these schemes exist. The gap isn&apos;t in funding—it&apos;s in access.
                    </p>
                </div>

                <div className="stagger-children grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {problems.map((p, i) => (
                        <div key={i} className="glass-card p-8 group hover:bg-white/5 transition-colors">
                            <div className="w-14 h-14 rounded-2xl bg-forest-light/30 flex items-center justify-center mb-6 text-3xl text-leaf-light group-hover:scale-110 transition-transform duration-300">
                                <i className={`bx ${p.icon}`}></i>
                            </div>
                            <h3 className="font-mukta text-2xl font-bold text-white mb-4">{p.title}</h3>
                            <p className="text-white/40 text-base leading-relaxed font-mukta">{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
