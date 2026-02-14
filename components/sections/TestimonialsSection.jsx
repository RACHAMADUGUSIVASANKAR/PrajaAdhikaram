'use client';
import { useEffect, useRef } from 'react';

const testimonials = [
    {
        name: 'Ramesh Kumar',
        role: 'Farmer, Uttar Pradesh',
        avatar: 'bx-user',
        text: 'I had no idea I was eligible for PM-KISAN and crop insurance. PrajaAdhikaram found 5 schemes for me in 2 minutes! The process was so simple.',
        schemes: 5,
        rating: 5,
    },
    {
        name: 'Lakshmi Devi',
        role: 'Homemaker, Tamil Nadu',
        avatar: 'bx-user-voice',
        text: 'The multi-language support helped me use it in Tamil. I applied for Ayushman Bharat health insurance for my family without needing an agent.',
        schemes: 3,
        rating: 5,
    },
    {
        name: 'Suresh Patil',
        role: 'Street Vendor, Maharashtra',
        avatar: 'bx-store-alt',
        text: 'Got my PM SVANidhi micro loan approved within weeks. This platform explained exactly what documents I needed and how to upload them.',
        schemes: 4,
        rating: 5,
    },
    {
        name: 'Anjali Sharma',
        role: 'College Student, Delhi',
        avatar: 'bx-book-reader',
        text: 'Found 3 scholarship schemes I never knew existed! The eligibility checker was intuitive and didn\'t ask for unnecessary details.',
        schemes: 3,
        rating: 4,
    },
    {
        name: 'Manoj Vishwakarma',
        role: 'Carpenter, Madhya Pradesh',
        avatar: 'bx-hammer',
        text: 'PM Vishwakarma Yojana gave me free tools and training. PrajaAdhikaram guided me through the entire application process step-by-step.',
        schemes: 6,
        rating: 5,
    },
    {
        name: 'Fatima Bi',
        role: 'Self-Help Group Leader, Karnataka',
        avatar: 'bx-group',
        text: 'Our SHG members found multiple livelihood schemes through this. The AI chatbot was very helpful in answering our questions in Kannada!',
        schemes: 8,
        rating: 5,
    },
    {
        name: 'Rajinder Singh',
        role: 'Ex-Serviceman, Punjab',
        avatar: 'bx-shield',
        text: 'The pension scheme discovery was excellent. It correctly identified my eligibility based on my service years and rank. Very impressed.',
        schemes: 2,
        rating: 5,
    },
    {
        name: 'Priya Das',
        role: 'Tech Entrepreneur, Bangalore',
        avatar: 'bx-laptop',
        text: 'Used the Startup India scheme finder. It filtered out irrelevant schemes perfectly. Saved me days of research.',
        schemes: 4,
        rating: 4,
    }
];

export default function TestimonialsSection() {
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
        <section ref={sectionRef} className="section-padding relative overflow-hidden" style={{ background: '#0B3D2E' }}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="reveal font-megrim text-5xl sm:text-7xl font-normal text-white mb-6 tracking-wide">
                        Citizens <span className="text-gradient">Love Us</span>
                    </h2>
                    <p className="reveal text-white/60 text-xl font-mukta max-w-xl mx-auto">
                        Real stories from 10,000+ citizens who discovered their rights through PrajaAdhikaram.
                    </p>
                </div>

                <div className="stagger-children grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((t, i) => (
                        <div key={i} className="glass-card p-6 flex flex-col justify-between hover:bg-white/5 transition-colors group">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-forest-dark flex items-center justify-center text-leaf-light border border-white/10">
                                        <i className={`bx ${t.avatar} text-xl`}></i>
                                    </div>
                                    <div>
                                        <h4 className="font-mukta font-bold text-white text-sm">{t.name}</h4>
                                        <span className="text-white/40 text-xs block font-mukta">{t.role}</span>
                                    </div>
                                </div>

                                <div className="flex gap-0.5 mb-3">
                                    {Array(5).fill(0).map((_, j) => (
                                        <i key={j} className={`bx bxs-star text-xs ${j < t.rating ? 'text-yellow-400' : 'text-white/10'}`}></i>
                                    ))}
                                </div>

                                <p className="text-white/60 text-sm leading-relaxed mb-6 font-mukta group-hover:text-white/80 transition-colors">
                                    &ldquo;{t.text}&rdquo;
                                </p>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-leaf-light font-bold">
                                <i className="bx bx-check-double text-base"></i>
                                <span>{t.schemes} schemes discovered</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
