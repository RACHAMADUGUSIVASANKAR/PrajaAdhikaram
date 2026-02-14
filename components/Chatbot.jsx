'use client';
import { useState, useRef, useEffect } from 'react';
import { useSound } from './SoundSystem';

const RESPONSES = {
    en: {
        greeting: "Namaste! 🙏 I'm PrajaAdhikaram AI. I can help you find government schemes you're eligible for. Tell me about yourself — age, state, occupation, income — and I'll find matching schemes!",
        scheme_info: "We have 500+ schemes indexed including PM-KISAN, Ayushman Bharat, MGNREGA, PM Awas Yojana, Mudra Yojana, and many more. Would you like to check your eligibility or browse all schemes?",
        eligibility: "To check eligibility, I need:\n1️⃣ Your age\n2️⃣ State of residence\n3️⃣ Annual income\n4️⃣ Occupation\n5️⃣ Social category\n\nTry our Eligibility Wizard for a guided experience!",
        farmer: "As a farmer, you may be eligible for:\n✅ PM-KISAN (₹6,000/year)\n✅ PM Fasal Bima Yojana (Crop insurance)\n✅ PM Krishi Sinchai Yojana (Irrigation)\n✅ Kisan Credit Card\n\nWant me to check your full eligibility?",
        health: "For healthcare schemes:\n✅ Ayushman Bharat — ₹5L health coverage\n✅ PM Matru Vandana — ₹5,000 for mothers\n✅ Jan Aushadhi — Affordable medicines\n\nTell me about your family for personalized results.",
        default: "I can help with:\n🔍 Scheme eligibility checks\n📋 Document requirements\n🏛️ Application guidance\n🌐 Multi-language support\n\nTry asking: \"What schemes can a farmer in UP get?\"",
    },
    hi: {
        greeting: "नमस्ते! 🙏 मैं प्रजाAdhikaram AI हूं। मैं आपको सरकारी योजनाएं खोजने में मदद कर सकता हूं। अपनी उम्र, राज्य, व्यवसाय और आय बताएं!",
        scheme_info: "हमारे पास 500+ योजनाएं हैं — PM-KISAN, आयुष्मान भारत, मनरेगा, PM आवास योजना और बहुत कुछ। क्या आप पात्रता जांचना चाहेंगे?",
        eligibility: "पात्रता जांचने के लिए मुझे चाहिए:\n1️⃣ आपकी उम्र\n2️⃣ राज्य\n3️⃣ वार्षिक आय\n4️⃣ व्यवसाय\n5️⃣ सामाजिक श्रेणी",
        farmer: "किसान के लिए योजनाएं:\n✅ PM-KISAN (₹6,000/वर्ष)\n✅ PM फसल बीमा योजना\n✅ किसान क्रेडिट कार्ड\n✅ PM कृषि सिंचाई योजना",
        health: "स्वास्थ्य योजनाएं:\n✅ आयुष्मान भारत — ₹5 लाख स्वास्थ्य कवर\n✅ PM मातृ वंदना — ₹5,000\n✅ जन औषधि",
        default: "मैं इनमें मदद कर सकता हूं:\n🔍 योजना पात्रता\n📋 दस्तावेज़ जानकारी\n🏛️ आवेदन मार्गदर्शन\n\n\"UP में किसान को कौन सी योजनाएं मिल सकती हैं?\" पूछें",
    },
    ta: {
        greeting: "வணக்கம்! 🙏 நான் PrajaAdhikaram AI. அரசு திட்டங்களைக் கண்டறிய உங்களுக்கு உதவ முடியும். உங்கள் வயது, மாநிலம், தொழில், வருமானம் பற்றி சொல்லுங்கள்!",
        scheme_info: "500+ திட்டங்கள் உள்ளன — PM-KISAN, ஆயுஷ்மான் பாரத், MGNREGA மற்றும் பல. தகுதி சோதிக்க விரும்புகிறீர்களா?",
        eligibility: "தகுதி சரிபார்க்க:\n1️⃣ வயது\n2️⃣ மாநிலம்\n3️⃣ ஆண்டு வருமானம்\n4️⃣ தொழில்\n5️⃣ சமூக பிரிவு",
        default: "நான் உதவ முடியும்:\n🔍 திட்ட தகுதி\n📋 ஆவண தேவைகள்\n🏛️ விண்ணப்ப வழிகாட்டுதல்",
    },
    te: {
        greeting: "నమస్కారం! 🙏 నేను PrajaAdhikaram AI. ప్రభుత్వ పథకాలను కనుగొనడంలో మీకు సహాయం చేయగలను. మీ వయసు, రాష్ట్రం, వృత్తి, ఆదాయం చెప్పండి!",
        scheme_info: "500+ పథకాలు ఉన్నాయి — PM-KISAN, ఆయుష్మాన్ భారత్, MGNREGA మరియు మరిన్ని. అర్హత తనిఖీ చేయాలనుకుంటున్నారా?",
        default: "నేను సహాయం చేయగలను:\n🔍 పథక అర్హత\n📋 పత్ర అవసరాలు\n🏛️ దరఖాస్తు మార్గదర్శకత్వం",
    },
    kn: {
        greeting: "ನಮಸ್ಕಾರ! 🙏 ನಾನು PrajaAdhikaram AI. ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ನಿಮ್ಮ ವಯಸ್ಸು, ರಾಜ್ಯ, ಉದ್ಯೋಗ, ಆದಾಯ ಹೇಳಿ!",
        default: "ನಾನು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ:\n🔍 ಯೋಜನೆ ಅರ್ಹತೆ\n📋 ಡಾಕ್ಯುಮೆಂಟ್ ಅಗತ್ಯತೆಗಳು\n🏛️ ಅರ್ಜಿ ಮಾರ್ಗದರ್ಶನ",
    },
};

const LANG_NAMES = {
    en: 'English',
    hi: 'हिंदी',
    ta: 'தமிழ்',
    te: 'తెలుగు',
    kn: 'ಕನ್ನಡ',
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState('en');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const endRef = useRef(null);
    const { playClick, playOpen } = useSound();

    // Reset messages when language changes
    useEffect(() => {
        const lang = RESPONSES[language] || RESPONSES.en;
        setMessages([{ role: 'bot', text: lang.greeting }]);
    }, [language]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing]);

    const getResponse = (msg) => {
        const lower = msg.toLowerCase();
        const lang = RESPONSES[language] || RESPONSES.en;

        if (lower.match(/hello|hi|namaste|helo|hey|नमस्ते|வணக்கம்|నమస్కారం/)) {
            return { text: lang.greeting, schemes: [] };
        }
        if (lower.match(/farmer|kisan|किसान|விவசாயி|రైతు/)) {
            return {
                text: lang.farmer || lang.default,
                schemes: [
                    { name: 'PM-KISAN', benefit: '₹6,000/year', match: '98%' },
                    { name: 'PM Fasal Bima', benefit: 'Crop Insurance', match: '94%' },
                    { name: 'PM Krishi Sinchai', benefit: 'Irrigation subsidy', match: '88%' },
                ],
            };
        }
        if (lower.match(/health|doctor|hospital|medical|स्वास्थ्य|ஆரோக்கியம்|ఆరోగ్యం/)) {
            return {
                text: lang.health || lang.default,
                schemes: [
                    { name: 'Ayushman Bharat', benefit: '₹5L cover', match: '96%' },
                    { name: 'PM Matru Vandana', benefit: '₹5,000', match: '90%' },
                ],
            };
        }
        if (lower.match(/eligib|qualify|check|पात्रता|योग्यता|தகுதி|అర్హత/)) {
            return { text: lang.eligibility || lang.default, schemes: [] };
        }
        if (lower.match(/scheme|yojana|योजना|திட்ட|పథక/)) {
            return { text: lang.scheme_info || lang.default, schemes: [] };
        }
        return {
            text: lang.default,
            schemes: [],
        };
    };

    const handleSend = () => {
        if (!input.trim()) return;
        playClick();
        setMessages(prev => [...prev, { role: 'user', text: input }]);
        const userMsg = input;
        setInput('');
        setTyping(true);

        setTimeout(() => {
            const response = getResponse(userMsg);
            setMessages(prev => [...prev, { role: 'bot', text: response.text, schemes: response.schemes }]);
            setTyping(false);
        }, 800 + Math.random() * 600);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => { setIsOpen(!isOpen); isOpen ? playClick() : playOpen(); }}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-glow-lg transition-all duration-300 hover:scale-105 glass-card !p-0"
                style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
                aria-label="Open chatbot"
            >
                <i className={`bx ${isOpen ? 'bx-x' : 'bx-message-dots'} text-white text-2xl`}></i>
            </button>

            {/* Chat Panel */}
            {isOpen && (
                <div
                    className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[540px] rounded-2xl flex flex-col overflow-hidden"
                    style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 0 24px 12px rgba(255, 255, 255, 0.02)',
                        animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    }}
                >
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(47, 125, 79, 0.2)', border: '1px solid rgba(47, 125, 79, 0.2)' }}>
                                <i className="bx bx-bot text-leaf-light text-lg"></i>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white font-mukta">PrajaAdhikaram AI</h3>
                                <span className="text-[10px] text-green-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                    Online
                                </span>
                            </div>
                        </div>
                        <select
                            value={language}
                            onChange={e => setLanguage(e.target.value)}
                            className="text-xs px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 outline-none"
                            style={{ cursor: 'none' }}
                        >
                            {Object.entries(LANG_NAMES).map(([code, name]) => (
                                <option key={code} value={code} className="bg-forest-700">{name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px]">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className="max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
                                    style={{
                                        background: msg.role === 'user'
                                            ? 'rgba(47, 125, 79, 0.2)'
                                            : 'rgba(255, 255, 255, 0.05)',
                                        border: `1px solid ${msg.role === 'user' ? 'rgba(47, 125, 79, 0.15)' : 'rgba(255, 255, 255, 0.06)'}`,
                                        color: '#E6F4EA',
                                        borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                                        borderBottomLeftRadius: msg.role === 'user' ? '16px' : '4px',
                                        fontFamily: "'Open Sans', sans-serif",
                                    }}
                                >
                                    {msg.text}
                                    {msg.schemes?.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {msg.schemes.map((s, j) => (
                                                <div key={j} className="glass-card !p-3 !rounded-xl">
                                                    <div className="flex justify-between items-center relative z-10">
                                                        <span className="font-bold text-white text-xs">{s.name}</span>
                                                        <span className="text-green-400 text-[10px] font-bold">{s.match}</span>
                                                    </div>
                                                    <span className="text-white/40 text-xs relative z-10">{s.benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {typing && (
                            <div className="flex justify-start">
                                <div className="px-4 py-3 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-leaf-light/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 rounded-full bg-leaf-light/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 rounded-full bg-leaf-light/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={endRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-white/5">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                placeholder={language === 'hi' ? 'योजना के बारे में पूछें...' : language === 'ta' ? 'திட்டங்கள் பற்றி கேளுங்கள்...' : 'Ask about schemes...'}
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-leaf/30 transition-colors"
                                style={{ cursor: 'none', fontFamily: "'Open Sans', sans-serif" }}
                            />
                            <button
                                onClick={handleSend}
                                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 glass-card !p-0"
                                style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
                            >
                                <i className="bx bx-send text-leaf-light relative z-10"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
