import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';
import { auth } from '../lib/firebase';
import { useFinance } from '../lib/FinanceContext';
import { Zap, ArrowRight, CheckCircle2, Flame, Loader2, Target, X } from 'lucide-react';

const AlternativesPage = () => {
    const { analysis } = useFinance();
    const router = useRouter();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) router.push('/login');
        });
        return () => unsubscribe();
    }, [router]);

    const pivots = [
        { 
            cat: 'Food Delivery', 
            current: 'Daily Swiggy/Zomato', 
            cost: '₹450/day', 
            pivot: '10-Min Meal Prep', 
            pCost: '₹90/day', 
            impact: '₹6.2L in 5Y', 
            cta: 'View Recipe Hub',
            details: {
                title: "The 'High-Frequency' Meal Protocol",
                points: [
                    "00:00 - Boil 4 eggs & 100g broccoli simultaneously (High Protein, Low GI).",
                    "04:00 - Toast sourdough bread while proteins boil.",
                    "08:00 - Plate with zero-calorie hot sauce to spike metabolism.",
                    "10:00 - Meal ready. Net cost: ₹90. Net time saved: 25 minutes waiting for delivery."
                ],
                equipment: ["Egg Boiler (₹400)", "Silicone Spatula", "Macro Scale"],
                roi: "10x Cheaper • 2x Protein • Zero Delivery Fees"
            }
        },
        { 
            cat: 'Coffee', 
            current: 'Starbucks Morning', 
            cost: '₹380/cuppa', 
            pivot: 'Blue Tokai Moka Pot', 
            pCost: '₹40/cuppa', 
            impact: '₹4.8L in 5Y', 
            cta: 'Get Brew Kit',
            details: {
                title: "The Sovereign Caffeine Strategy",
                points: [
                    "00:00 - Grind 15g of Blue Tokai Silver Oak beans medium-fine.",
                    "01:00 - Heat filtered water to exactly 92°C to prevent acidic scorching.",
                    "02:00 - Plunge Moka Pot on medium heat until the golden crema appears.",
                    "05:00 - Pour into glass server. Supreme focus achieved for ₹40."
                ],
                equipment: ["Bialetti Moka Pot", "Timemore C3 Grinder", "Precision Scale"],
                roi: "Better Taste • 89% Cost Reduction • Brain Clarity"
            }
        },
        { 
            cat: 'Subscriptions', 
            current: '5 Streaming Services', 
            cost: '₹1200/mo', 
            pivot: 'The One-App Rule', 
            pCost: '₹199/mo', 
            impact: '₹1.1L in 5Y', 
            cta: 'Audit Subs',
            details: {
                title: "Dopamine Restriction Protocol",
                points: [
                    "Analysis: You only watch 1 platform per week despite paying for 5.",
                    "Action 1: Cancel Prime, Hotstar, and SonyLIV immediately.",
                    "Action 2: Keep Netflix Premium as the single 'High-Tier' dopamine source.",
                    "Execution: Rotate subscriptions monthly instead of hoarding them."
                ],
                equipment: ["Subscription Tracker", "Auto-Cancel Virtual Card"],
                roi: "Focused Content Consumption • Recovered Time"
            }
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] flex overflow-hidden cyber-grid">
            <Head><title>Smart Pivots | FINFUTURE</title></Head>
            <Sidebar />
            <main className="flex-1 h-screen overflow-y-auto p-6 pt-24 md:p-12 custom-scrollbar relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--gold)]/5 blur-[100px] pointer-events-none" />

                <header className="mb-20 animate-reveal">
                    <div className="flex items-center gap-3 text-[var(--gold)] mb-4">
                        <Zap size={24} className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Wealth Optimization</span>
                    </div>
                    <h1 className="text-6xl lg:text-8xl font-serif tracking-tighter italic mb-6">Lifestyle <span className="text-[var(--gold)]">Pivots</span></h1>
                    <p className="text-[var(--text-secondary)] max-w-xl text-lg leading-relaxed">Stop saving pennies. Start optimizing for lakhs. We've matched your spend patterns with high-impact lifestyle upgrades.</p>
                </header>

                <div className="grid grid-cols-1 gap-8 max-w-5xl">
                    {pivots.map((item, i) => (
                        <div key={i} className="flex flex-col animate-reveal" style={{ animationDelay: `${i*0.1}s` }}>
                            {/* BASE CARD */}
                            <div className="cyber-glass p-8 lg:p-12 rounded-[4rem] group flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 
                                border border-[var(--border)] hover:border-[var(--gold)]/30 transition-all shadow-xl">
                                
                                <div className="flex items-center gap-6 lg:gap-10">
                                    <div className="text-center w-28 lg:w-32">
                                        <div className="text-[10px] font-black uppercase text-[var(--text-secondary)] mb-3 tracking-widest">Current Burn</div>
                                        <div className="text-sm lg:text-xl font-bold opacity-40 group-hover:opacity-100 transition-opacity">{item.current}</div>
                                        <div className="text-[10px] lg:text-sm font-black text-red-500 mt-2">{item.cost}</div>
                                    </div>
                                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[var(--text-primary)]/5 flex items-center justify-center">
                                        <ArrowRight className="text-[var(--gold)] group-hover:translate-x-1 transition-transform" size={18} />
                                    </div>
                                    <div className="text-center w-28 lg:w-32">
                                        <div className="text-[10px] font-black uppercase text-[var(--gold)] mb-3 tracking-widest">The Pivot</div>
                                        <div className="text-sm lg:text-xl font-bold text-[var(--text-primary)]">{item.pivot}</div>
                                        <div className="text-[10px] lg:text-sm font-black text-green-500 mt-2">{item.pCost}</div>
                                    </div>
                                </div>

                                <div className="bg-[var(--gold)]/5 border border-[var(--gold)]/10 p-6 lg:p-8 rounded-[3rem] text-center lg:text-right w-full lg:w-auto">
                                    <div className="text-[10px] font-black uppercase text-[var(--text-secondary)] mb-2 tracking-widest">Projected Gain</div>
                                    <div className="text-3xl lg:text-5xl font-serif text-[var(--gold)] mb-4">{item.impact}</div>
                                    <button 
                                        onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                                        className="px-6 lg:px-8 py-3 bg-[var(--gold)] text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:scale-105 transition-transform"
                                    >
                                        {expandedIndex === i ? 'Close Intelligence' : item.cta}
                                    </button>
                                </div>
                            </div>

                            {/* EXPANDABLE PEAK DETAIL SECTION */}
                            <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedIndex === i ? 'max-h-[800px] opacity-100 -mt-10' : 'max-h-0 opacity-0'}`}>
                                <div className="pt-16 pb-12 px-12 bg-black/40 dark:bg-black/40 bg-[var(--bg-color)]/80 backdrop-blur-3xl rounded-b-[4rem] border-x border-b border-[var(--border)] relative overflow-hidden">
                                    
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />
                                    
                                    <h4 className="text-2xl font-serif italic text-[var(--text-primary)] flex items-center gap-4 mb-8">
                                        <Flame className="text-[var(--gold)]" /> {item.details.title}
                                    </h4>

                                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
                                        <div className="space-y-4">
                                            {item.details.points.map((point, idx) => (
                                                <div key={idx} className="flex gap-4 animate-reveal" style={{ animationDelay: `${idx*0.2}s` }}>
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mt-2 shrink-0 shadow-[0_0_10px_var(--gold)]" />
                                                    <p className="text-[var(--text-secondary)] leading-relaxed text-sm">{point}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-[var(--gold)]/5 p-8 rounded-3xl border border-[var(--gold)]/20 animate-reveal" style={{ animationDelay: '0.4s' }}>
                                            <div className="mb-6">
                                                <div className="text-[9px] font-black uppercase text-[var(--text-secondary)] tracking-widest mb-3">Required Arsenal</div>
                                                <ul className="space-y-2">
                                                    {item.details.equipment.map((eq, eI) => (
                                                        <li key={eI} className="text-xs font-bold flex flex-items-center gap-2 text-[var(--text-primary)]">
                                                            <Target size={12} className="text-[var(--gold)]" /> {eq}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="pt-6 border-t border-[var(--gold)]/20">
                                                <div className="text-[9px] font-black uppercase text-[var(--text-secondary)] tracking-widest mb-2">Outcome</div>
                                                <div className="text-sm font-bold text-green-500">{item.details.roi}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AlternativesPage;
