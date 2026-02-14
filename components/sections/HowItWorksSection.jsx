'use client';
import { useEffect, useRef } from 'react';

const steps = [
    {
        title: 'Profile Analysis',
        desc: 'You provide basic details—age, location, occupation, and income. Our AI instantly segments you into one of 14,000+ socio-economic micro-clusters.',
        icon: 'bx-scan',
        color: '#4DAA6A'
    },
    {
        title: 'Eligibility Matching',
        desc: 'Our engine runs your profile against 3,500+ rules from Central and State scheme guidelines simultaneously. We differentiate between "eligible" and "highly likely to succeed".',
        icon: 'bx-cog',
        color: '#2F7D4F'
    },
    {
        title: 'Application Guidance',
        desc: 'Get a personalized checklist of documents. Our interactive guides walk you through the official portal application process step-by-step, minimizing rejection risk.',
        icon: 'bx-file-blank',
        color: '#7BC08F'
    },
    {
        title: 'Benefit Delivery',
        desc: 'Track status updates and receive direct benefit transfers (DBT) to your Aadhaar-linked bank account. We notify you of renewals and new opportunities.',
        icon: 'bx-rupee',
        color: '#A8D5BA'
    }
];

export default function HowItWorksSection() {
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
        <section ref={sectionRef} className="section-padding relative overflow-hidden" style={{ background: '#082D22' }}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="reveal font-megrim text-5xl sm:text-6xl font-normal text-white mb-6 tracking-wide">
                        How It <span className="text-gradient">Works</span>
                    </h2>
                    <p className="reveal text-white/60 text-xl font-mukta max-w-3xl mx-auto leading-relaxed">
                        From confusion to completion in 4 simple steps. Our platform simplifies the bureaucratic maze into a seamless digital journey.
                    </p>
                </div>

                <div className="stagger-children grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-leaf-light/30 to-transparent" />

                    {steps.map((step, i) => (
                        <div key={i} className="relative group">
                            {/* Step Number Badge */}
                            <div className="w-24 h-24 mx-auto rounded-full glass-strong flex items-center justify-center mb-8 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                                style={{ border: `1px solid ${step.color}40`, boxShadow: `0 0 30px ${step.color}20` }}>
                                <i className={`bx ${step.icon} text-4xl`} style={{ color: step.color }}></i>
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-forest-dark border border-white/10 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                                    {i + 1}
                                </div>
                            </div>

                            <div className="glass-card p-6 h-full text-center hover:bg-white/5 transition-colors">
                                <h3 className="font-mukta text-xl font-bold text-white mb-4">{step.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed font-mukta">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
