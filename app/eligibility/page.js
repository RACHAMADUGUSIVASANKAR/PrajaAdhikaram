'use client';
import { useState } from 'react';
import { SCHEMES_DATA } from '@/data/schemes';
import { useSound } from '@/components/SoundSystem';

const steps = [
    {
        title: 'Basic Information',
        icon: 'bx-user',
        fields: [
            { name: 'age', label: 'Your Age', type: 'number', placeholder: 'e.g. 28', required: true },
            {
                name: 'gender', label: 'Gender', type: 'select', required: true, options: [
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'other', label: 'Other' },
                ]
            },
            {
                name: 'state', label: 'State of Residence', type: 'select', required: true, options: [
                    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
                    { value: 'assam', label: 'Assam' },
                    { value: 'bihar', label: 'Bihar' },
                    { value: 'chhattisgarh', label: 'Chhattisgarh' },
                    { value: 'delhi', label: 'Delhi' },
                    { value: 'goa', label: 'Goa' },
                    { value: 'gujarat', label: 'Gujarat' },
                    { value: 'haryana', label: 'Haryana' },
                    { value: 'himachal-pradesh', label: 'Himachal Pradesh' },
                    { value: 'jharkhand', label: 'Jharkhand' },
                    { value: 'karnataka', label: 'Karnataka' },
                    { value: 'kerala', label: 'Kerala' },
                    { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
                    { value: 'maharashtra', label: 'Maharashtra' },
                    { value: 'odisha', label: 'Odisha' },
                    { value: 'punjab', label: 'Punjab' },
                    { value: 'rajasthan', label: 'Rajasthan' },
                    { value: 'tamil-nadu', label: 'Tamil Nadu' },
                    { value: 'telangana', label: 'Telangana' },
                    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
                    { value: 'uttarakhand', label: 'Uttarakhand' },
                    { value: 'west-bengal', label: 'West Bengal' },
                ]
            },
        ],
    },
    {
        title: 'Economic Profile',
        icon: 'bx-wallet',
        fields: [
            {
                name: 'income', label: 'Annual Household Income', type: 'select', required: true, options: [
                    { value: 'below-1-lakh', label: 'Below ₹1,00,000' },
                    { value: '1-2.5-lakh', label: '₹1,00,000 — ₹2,50,000' },
                    { value: '2.5-5-lakh', label: '₹2,50,000 — ₹5,00,000' },
                    { value: '5-8-lakh', label: '₹5,00,000 — ₹8,00,000' },
                    { value: '8-10-lakh', label: '₹8,00,000 — ₹10,00,000' },
                    { value: '10-15-lakh', label: '₹10,00,000 — ₹15,00,000' },
                    { value: '15-25-lakh', label: '₹15,00,000 — ₹25,00,000' },
                    { value: 'above-25-lakh', label: 'Above ₹25,00,000' },
                ]
            },
            {
                name: 'occupation', label: 'Primary Occupation', type: 'select', required: true, options: [
                    { value: 'farmer', label: 'Farmer / Agricultural Worker' },
                    { value: 'laborer', label: 'Daily Wage Laborer' },
                    { value: 'self-employed', label: 'Self-Employed / Business' },
                    { value: 'salaried', label: 'Salaried Employee' },
                    { value: 'student', label: 'Student' },
                    { value: 'homemaker', label: 'Homemaker' },
                    { value: 'unemployed', label: 'Unemployed / Job Seeker' },
                    { value: 'retired', label: 'Retired / Senior Citizen' },
                    { value: 'artisan', label: 'Artisan / Craftsman' },
                    { value: 'vendor', label: 'Street Vendor / Hawker' },
                ]
            },
        ],
    },
    {
        title: 'Additional Details',
        icon: 'bx-detail',
        fields: [
            {
                name: 'category', label: 'Social Category', type: 'select', required: true, options: [
                    { value: 'general', label: 'General' },
                    { value: 'obc', label: 'OBC (Other Backward Classes)' },
                    { value: 'sc', label: 'SC (Scheduled Caste)' },
                    { value: 'st', label: 'ST (Scheduled Tribe)' },
                    { value: 'ews', label: 'EWS (Economically Weaker Section)' },
                ]
            },
            {
                name: 'residency', label: 'Area of Residence', type: 'select', required: true, options: [
                    { value: 'rural', label: 'Rural Village' },
                    { value: 'semi-urban', label: 'Semi-Urban / Town' },
                    { value: 'urban', label: 'Urban City' },
                    { value: 'tribal', label: 'Tribal Area' },
                ]
            },
            {
                name: 'education', label: 'Highest Education', type: 'select', required: true, options: [
                    { value: 'none', label: 'No Formal Education' },
                    { value: 'primary', label: 'Primary (1-5th)' },
                    { value: 'secondary', label: 'Secondary (6-10th)' },
                    { value: 'higher-secondary', label: 'Higher Secondary (11-12th)' },
                    { value: 'graduate', label: 'Graduate (BA/BSc/BCom+)' },
                    { value: 'post-graduate', label: 'Post Graduate (MA/MSc+)' },
                    { value: 'professional', label: 'Professional (Engineering/Medical)' },
                ]
            },
        ],
    },
];

function getMatchedSchemes(data) {
    const results = [];
    const income = data.income || '';
    const occupation = data.occupation || '';
    const isBPL = income === 'below-1-lakh' || income === '1-2.5-lakh';
    const isFarmer = occupation === 'farmer';
    const isLaborer = occupation === 'laborer';
    const isVendor = occupation === 'vendor';
    const isArtisan = occupation === 'artisan';

    SCHEMES_DATA.forEach(scheme => {
        let score = 0.5;
        if (isFarmer && scheme.category === 'Agriculture') score += 0.4;
        if (isBPL && ['Healthcare', 'Housing', 'Food', 'Employment'].includes(scheme.category)) score += 0.3;
        if (isLaborer && scheme.category === 'Employment') score += 0.35;
        if (isVendor && scheme.name.includes('SVANidhi')) score += 0.45;
        if (isArtisan && scheme.name.includes('Vishwakarma')) score += 0.45;
        if (occupation === 'student' && scheme.category === 'Education') score += 0.35;
        if (data.category === 'sc' || data.category === 'st') {
            if (scheme.name.includes('Stand Up')) score += 0.3;
            if (scheme.category === 'Education') score += 0.15;
        }
        if (data.residency === 'rural') {
            if (scheme.name.includes('Gramin') || scheme.name.includes('MGNREGA') || scheme.name.includes('Gram')) score += 0.3;
        }
        if (data.gender === 'female') {
            if (scheme.name.includes('Beti') || scheme.name.includes('Matru') || scheme.name.includes('Sukanya')) score += 0.35;
        }
        score = Math.min(score, 0.99);
        results.push({ ...scheme, confidence_score: score });
    });
    return results.sort((a, b) => b.confidence_score - a.confidence_score).slice(0, 12);
}

export default function EligibilityPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [analyzing, setAnalyzing] = useState(false);
    const [results, setResults] = useState(null);
    const { playClick } = useSound();

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name]) {
            setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
        }
    };

    const validateStep = () => {
        const currentFields = steps[currentStep].fields;
        const newErrors = {};
        let valid = true;

        currentFields.forEach(field => {
            if (field.required) {
                const val = formData[field.name];
                if (!val || val.toString().trim() === '') {
                    newErrors[field.name] = `${field.label} is required`;
                    valid = false;
                }
                if (field.name === 'age' && val) {
                    const age = parseInt(val);
                    if (isNaN(age) || age < 1 || age > 120) {
                        newErrors[field.name] = 'Please enter a valid age (1-120)';
                        valid = false;
                    }
                }
            }
        });

        setErrors(newErrors);
        return valid;
    };

    const handleNext = () => {
        if (!validateStep()) return;
        playClick();

        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setAnalyzing(true);
            setTimeout(() => {
                setAnalyzing(false);
                setResults(getMatchedSchemes(formData));
            }, 2500);
        }
    };

    const handleBack = () => {
        playClick();
        setCurrentStep(prev => prev - 1);
    };

    return (
        <main className="min-h-screen pt-24 pb-16 px-6 relative flex flex-col items-center" style={{ background: 'linear-gradient(180deg, #051E17 0%, #0B3D2E 50%, #082D22 100%)' }}>
            {/* Floating background icons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <i className="bx bx-user bg-icon" style={{ top: '8%', left: '5%', animationDelay: '0s' }}></i>
                <i className="bx bx-check-shield bg-icon" style={{ top: '20%', right: '8%', animationDelay: '2s' }}></i>
                <i className="bx bx-wallet bg-icon" style={{ bottom: '25%', left: '4%', animationDelay: '1s' }}></i>
                <i className="bx bx-file bg-icon" style={{ bottom: '15%', right: '6%', animationDelay: '3s' }}></i>
            </div>

            <div className="w-full max-w-2xl mx-auto relative">
                {/* Header — centered */}
                <div className="text-center mb-10">
                    <h1 className="font-megrim text-5xl sm:text-6xl font-normal text-white mb-4 tracking-wide">
                        Eligibility <span className="text-gradient">Wizard</span>
                    </h1>
                    <p className="text-white/40 text-lg" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                        Answer a few questions to discover government schemes you&apos;re eligible for.
                    </p>
                </div>

                {/* Progress Steps — centered */}
                {!results && !analyzing && (
                    <div className="mb-10 flex items-center justify-center">
                        <div className="flex items-center gap-0">
                            {steps.map((step, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="glass-card !rounded-full !p-0 w-12 h-12 flex items-center justify-center relative"
                                            style={{
                                                background: i < currentStep ? 'rgba(77, 170, 106, 0.25)' : i === currentStep ? 'rgba(47, 125, 79, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                                                border: `2px solid ${i <= currentStep ? 'rgba(77, 170, 106, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
                                            }}
                                        >
                                            {i < currentStep ? (
                                                <i className="bx bx-check text-green-400 text-xl relative z-10"></i>
                                            ) : (
                                                <i className={`bx ${step.icon} text-lg relative z-10`} style={{ color: i === currentStep ? '#A8D5BA' : 'rgba(255,255,255,0.2)' }}></i>
                                            )}
                                        </div>
                                        <span className="text-[10px] mt-2 text-center max-w-[70px] leading-tight" style={{
                                            color: i <= currentStep ? '#A8D5BA' : 'rgba(255,255,255,0.2)',
                                            fontFamily: "'Open Sans', sans-serif",
                                        }}>{step.title}</span>
                                    </div>
                                    {i < steps.length - 1 && (
                                        <div className="w-16 sm:w-24 h-[2px] mx-2 mb-6" style={{
                                            background: i < currentStep
                                                ? 'linear-gradient(90deg, rgba(77, 170, 106, 0.4), rgba(77, 170, 106, 0.4))'
                                                : 'rgba(255,255,255,0.05)',
                                        }} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Form Card — centered */}
                {!results && !analyzing && (
                    <div className="glass-card p-8 mx-auto">
                        <h2 className="font-mukta text-2xl font-bold text-white mb-1 flex items-center gap-2 relative z-10">
                            <i className={`bx ${steps[currentStep].icon} text-leaf`}></i>
                            {steps[currentStep].title}
                        </h2>
                        <p className="text-white/30 text-sm mb-6 relative z-10" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                            Step {currentStep + 1} of {steps.length} — All fields are mandatory <span className="text-red-400">*</span>
                        </p>

                        <div className="space-y-5 relative z-10">
                            {steps[currentStep].fields.map(field => (
                                <div key={field.name}>
                                    <label className="block text-sm text-white/50 mb-2 flex items-center gap-1" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                                        {field.label} <span className="text-red-400">*</span>
                                    </label>
                                    {field.type === 'select' ? (
                                        <select
                                            value={formData[field.name] || ''}
                                            onChange={e => handleChange(field.name, e.target.value)}
                                            className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white outline-none focus:border-leaf/30 transition-colors ${errors[field.name] ? 'border-red-400/50' : 'border-white/10'
                                                }`}
                                            style={{ cursor: 'none', fontFamily: "'Open Sans', sans-serif" }}
                                        >
                                            <option value="" style={{ background: '#0B3D2E' }}>Select {field.label}...</option>
                                            {field.options.map(opt => (
                                                <option key={opt.value} value={opt.value} style={{ background: '#0B3D2E' }}>{opt.label}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type}
                                            value={formData[field.name] || ''}
                                            onChange={e => handleChange(field.name, e.target.value)}
                                            placeholder={field.placeholder}
                                            className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-white/20 outline-none focus:border-leaf/30 transition-colors ${errors[field.name] ? 'border-red-400/50' : 'border-white/10'
                                                }`}
                                            style={{ cursor: 'none', fontFamily: "'Open Sans', sans-serif" }}
                                        />
                                    )}
                                    {errors[field.name] && (
                                        <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                            <i className="bx bx-error-circle"></i> {errors[field.name]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex items-center justify-between relative z-10">
                            {currentStep > 0 ? (
                                <button onClick={handleBack} className="btn-secondary text-sm flex items-center gap-1 btn-ripple">
                                    <i className="bx bx-left-arrow-alt"></i> Back
                                </button>
                            ) : <div />}
                            <button onClick={handleNext} className="btn-primary text-sm flex items-center gap-1 btn-ripple">
                                {currentStep === steps.length - 1 ? (
                                    <><i className="bx bx-analyse"></i> Analyze Eligibility</>
                                ) : (
                                    <>Next <i className="bx bx-right-arrow-alt"></i></>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Analyzing — centered */}
                {analyzing && (
                    <div className="glass-card p-12 text-center mx-auto">
                        <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center animate-pulse relative z-10"
                            style={{ background: 'rgba(47, 125, 79, 0.2)', border: '1px solid rgba(47, 125, 79, 0.2)' }}>
                            <i className="bx bx-analyse text-3xl text-leaf-light" style={{ animation: 'spin 2s linear infinite' }}></i>
                        </div>
                        <h3 className="font-mukta text-2xl font-bold text-white mb-3 relative z-10">Analyzing Your Profile</h3>
                        <p className="text-white/40 mb-6 relative z-10" style={{ fontFamily: "'Open Sans', sans-serif" }}>Checking against {SCHEMES_DATA.length} government schemes...</p>
                        <div className="w-64 h-1.5 mx-auto rounded-full bg-white/5 overflow-hidden relative z-10">
                            <div className="h-full rounded-full bg-gradient-to-r from-leaf-moss to-leaf" style={{ animation: 'loadBar 2.5s ease-in-out forwards' }} />
                        </div>
                    </div>
                )}

                {/* Results — centered */}
                {results && (
                    <div className="mx-auto">
                        <div className="glass-card p-6 mb-6 text-center">
                            <div className="text-3xl mb-2 relative z-10">🎉</div>
                            <h3 className="font-mukta text-2xl font-bold text-white mb-2 relative z-10">
                                {results.length} Schemes Matched!
                            </h3>
                            <p className="text-white/40 text-sm relative z-10" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                                Click any scheme to visit its official portal and apply.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {results.map((scheme, i) => (
                                <div key={i} className="glass-card p-5 group btn-ripple"
                                    onClick={() => window.open(scheme.url, '_blank', 'noopener,noreferrer')}
                                    style={{ cursor: 'none' }}>
                                    <div className="flex items-start justify-between mb-3 relative z-10">
                                        <div>
                                            <span className="text-xs px-2 py-0.5 rounded-lg inline-flex items-center gap-1 mb-2"
                                                style={{ background: 'rgba(47, 125, 79, 0.12)', color: '#A8D5BA', border: '1px solid rgba(47, 125, 79, 0.15)' }}>
                                                <i className={`bx ${scheme.icon || 'bx-file'}`}></i> {scheme.category}
                                            </span>
                                            <h4 className="font-mukta text-base font-bold text-white group-hover:text-leaf-light transition-colors">{scheme.name}</h4>
                                        </div>
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold text-green-400"
                                            style={{ background: 'rgba(47, 125, 79, 0.2)', border: '2px solid rgba(77, 170, 106, 0.3)' }}>
                                            {Math.round(scheme.confidence_score * 100)}%
                                        </div>
                                    </div>
                                    <p className="text-white/35 text-xs mb-3 line-clamp-2 relative z-10" style={{ fontFamily: "'Open Sans', sans-serif" }}>{scheme.description}</p>
                                    <div className="flex items-center justify-between relative z-10">
                                        <span className="text-leaf font-semibold text-sm">{scheme.benefit}</span>
                                        <span className="text-xs text-white/30 flex items-center gap-1 group-hover:text-leaf-light transition-colors"><i className="bx bx-link-external"></i> Apply</span>
                                    </div>
                                    <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden relative z-10">
                                        <div className="h-full rounded-full" style={{ width: `${scheme.confidence_score * 100}%`, background: 'linear-gradient(90deg, #1F5C3A, #4DAA6A)' }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <button onClick={() => { setResults(null); setCurrentStep(0); setFormData({}); setErrors({}); playClick(); }}
                                className="btn-secondary flex items-center gap-2 mx-auto btn-ripple" style={{ cursor: 'none' }}>
                                <i className="bx bx-reset"></i> Start Over
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
