'use client';
import { useState } from 'react';
import SchemeCard from '@/components/SchemeCard';
import { SCHEMES_DATA, CATEGORIES } from '@/data/schemes';

export default function SchemesPage() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = SCHEMES_DATA.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen pt-24 pb-16 px-6" style={{ background: 'linear-gradient(180deg, #051E17 0%, #0B3D2E 50%, #082D22 100%)' }}>
            {/* Floating background icons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <i className="bx bx-book-open bg-icon" style={{ top: '5%', left: '3%', animationDelay: '0s' }}></i>
                <i className="bx bx-shield-quarter bg-icon" style={{ top: '15%', right: '5%', animationDelay: '1.5s' }}></i>
                <i className="bx bx-home-alt bg-icon" style={{ bottom: '20%', left: '6%', animationDelay: '3s' }}></i>
                <i className="bx bx-rupee bg-icon" style={{ bottom: '10%', right: '8%', animationDelay: '2.5s' }}></i>
            </div>

            <div className="max-w-6xl mx-auto relative">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="font-megrim text-5xl sm:text-6xl font-normal text-white mb-4 tracking-wide">
                        Government <span className="text-gradient">Schemes</span>
                    </h1>
                    <p className="text-white/40 text-lg max-w-xl mx-auto" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                        Browse {SCHEMES_DATA.length} central and state government schemes. Click any scheme to visit its official portal.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-6 max-w-xl mx-auto">
                    <div className="glass-card !rounded-xl px-5 py-0 flex items-center gap-3 relative">
                        <i className="bx bx-search text-white/30 text-lg relative z-10"></i>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search schemes by name or description..."
                            className="w-full py-3.5 bg-transparent text-white placeholder-white/25 outline-none text-sm relative z-10"
                            style={{ cursor: 'none', fontFamily: "'Open Sans', sans-serif" }}
                        />
                        {search && (
                            <button onClick={() => setSearch('')} className="relative z-10">
                                <i className="bx bx-x text-white/30 hover:text-white transition-colors"></i>
                            </button>
                        )}
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className="px-4 py-2 rounded-xl text-sm font-medium transition-all glass-card !py-2 !px-4 !rounded-xl"
                            style={{
                                background: activeCategory === cat ? 'rgba(47, 125, 79, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                                border: `1px solid ${activeCategory === cat ? 'rgba(47, 125, 79, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
                                color: activeCategory === cat ? '#A8D5BA' : 'rgba(255, 255, 255, 0.4)',
                                cursor: 'none',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Results count */}
                <div className="mb-6 text-sm text-white/30 flex items-center gap-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    <i className="bx bx-filter-alt"></i>
                    Showing {filtered.length} of {SCHEMES_DATA.length} schemes
                </div>

                {/* Scheme Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map(scheme => (
                        <SchemeCard key={scheme.id} scheme={scheme} />
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16 glass-card">
                        <i className="bx bx-search-alt text-4xl text-white/20 mb-4 block relative z-10"></i>
                        <p className="text-white/40 text-lg relative z-10">No schemes found matching your criteria.</p>
                        <button
                            onClick={() => { setSearch(''); setActiveCategory('All'); }}
                            className="mt-4 text-leaf hover:text-leaf-light transition-colors text-sm flex items-center gap-1 mx-auto relative z-10"
                            style={{ cursor: 'none' }}
                        >
                            <i className="bx bx-reset"></i> Clear filters
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
