'use client';
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const ProblemSection = dynamic(() => import('@/components/sections/ProblemSection'), { ssr: false });
const SolutionSection = dynamic(() => import('@/components/sections/SolutionSection'), { ssr: false });
const HowItWorksSection = dynamic(() => import('@/components/sections/HowItWorksSection'), { ssr: false });
const ImpactSection = dynamic(() => import('@/components/sections/ImpactSection'), { ssr: false });
const CTASection = dynamic(() => import('@/components/sections/CTASection'), { ssr: false });
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), { ssr: false });
const TrustSection = dynamic(() => import('@/components/sections/TrustSection'), { ssr: false });
const IndiaMap = dynamic(() => import('@/components/IndiaMap'), { ssr: false });

export default function HomePage() {
    return (
        <>
            <Hero />
            {/* 
        Reordering Sections per user feedback:
        1. Trust (Social Proof) - Build credibility immediately
        2. Problem - Identify the pain point
        3. Solution - Introduce the AI
        4. How It Works - Explain the process
        5. Impact - Show results
        6. IndiaMap - Visualize scale
        7. Testimonials - More social proof
        8. CTA - Final conversion
      */}
            <TrustSection />
            <ProblemSection />
            <SolutionSection />
            <HowItWorksSection />
            <ImpactSection />
            <IndiaMap />
            <TestimonialsSection />
            <CTASection />
        </>
    );
}
