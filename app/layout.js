import './globals.css';
import { SoundProvider } from '@/components/SoundSystem';
import LenisProvider from '@/components/LenisProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const Chatbot = dynamic(() => import('@/components/Chatbot'), { ssr: false });
// Removed CustomCursor import as requested
const SoundToggle = dynamic(() => import('@/components/SoundToggle'), { ssr: false });
const RippleEffect = dynamic(() => import('@/components/RippleEffect'), { ssr: false });

export const metadata = {
    title: 'PrajaAdhikaram AI — Intelligent Government Scheme Eligibility Engine',
    description: 'AI-powered platform connecting Indian citizens with government schemes they are eligible for. Discover, understand, and apply instantly.',
    keywords: 'government schemes, India, eligibility, AI, PrajaAdhikaram',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
                {/* Preconnect for Google Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className="min-h-screen" style={{ background: '#0B3D2E' }}>
                <SoundProvider>
                    <LenisProvider>
                        {/* Removed SmoothCursor component usage */}
                        <RippleEffect />
                        <Navbar />
                        <main>{children}</main>
                        <Footer />
                        <Chatbot />
                        <SoundToggle />
                    </LenisProvider>
                </SoundProvider>
            </body>
        </html>
    );
}
