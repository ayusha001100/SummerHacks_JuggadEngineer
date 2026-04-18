import React from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import { ChefHat, Flame, Zap, ShoppingCart, Timer, TrendingUp, Info } from 'lucide-react';

const FuelHubPage = () => {
    const fuelSources = [
        { 
            tier: 'SURVIVAL', 
            name: 'The 4-Min Wealth Oats', 
            cost: '₹18', 
            savings: '₹162/meal', 
            macros: 'High Fiber • Slow Burn', 
            benefit: 'Neural Stability',
            details: 'Oats + Water + Peanut Butter. Zero friction.' 
        },
        { 
            tier: 'PERFORMANCE', 
            name: 'Elite Scrambled Protocol', 
            cost: '₹35', 
            savings: '₹285/meal', 
            macros: '24g Protein • Lean', 
            benefit: 'Muscle Recovery',
            details: '5 Eggs + Spinach + Turmeric. Peak biological fuel.' 
        },
        { 
            tier: 'FOCUS', 
            name: 'Bulletproof Chai Fix', 
            cost: '₹12', 
            savings: '₹368/session', 
            macros: 'Caffeine • Healthy Fats', 
            benefit: 'Cognitive Sharpness',
            details: 'Home brew + Grass-fed Butter/Ghee. Kill the Starbucks habit.' 
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] flex overflow-hidden cyber-grid">
            <Head><title>Fuel Hub | FINFUTURE</title></Head>
            <Sidebar />

            <main className="flex-1 h-screen overflow-y-auto p-6 pt-24 md:p-12 custom-scrollbar">
                
                <header className="mb-20 animate-reveal">
                    <div className="flex items-center gap-3 text-orange-500 mb-6 px-4 py-2 bg-orange-500/5 rounded-full border border-orange-500/20 w-fit">
                        <Flame size={18} className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em]">Biological Optimization</span>
                    </div>
                    <h1 className="text-7xl lg:text-9xl font-serif tracking-tighter italic mb-8">Fuel <span className="text-orange-500">Hub</span></h1>
                    <p className="text-[var(--text-secondary)] max-w-xl text-lg leading-relaxed">
                        Food is an expense. Fuel is an investment. <br />
                        <span className="text-[var(--text-primary)] italic">Stop eating for taste. Start fueling for the 0.1% Club.</span>
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
                    {fuelSources.map((fuel, i) => (
                        <div key={i} className="cyber-glass p-12 rounded-[4rem] group hover:border-orange-500/30 transition-all animate-reveal shadow-2xl" style={{ animationDelay: `${i*0.1}s` }}>
                            <div className="flex justify-between items-start mb-12">
                                <div className={`text-[9px] font-black uppercase tracking-[0.3em] px-4 py-1 rounded-full ${fuel.tier === 'SURVIVAL' ? 'bg-[var(--text-primary)]/10' : fuel.tier === 'PERFORMANCE' ? 'bg-orange-500 text-black' : 'bg-blue-500 text-black'}`}>
                                    {fuel.tier}
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] uppercase text-[var(--text-secondary)] font-black mb-1">Unit Cost</div>
                                    <div className="text-2xl font-serif text-[var(--text-primary)]">{fuel.cost}</div>
                                </div>
                            </div>

                            <h3 className="text-3xl font-serif italic mb-4 group-hover:text-orange-500 transition-colors uppercase leading-none">{fuel.name}</h3>
                            <p className="text-xs text-[var(--text-secondary)] mb-8 leading-relaxed font-medium">{fuel.details}</p>

                            <div className="space-y-4 mb-10 pt-6 border-t border-[var(--border)]">
                                <div className="flex items-center gap-3 text-xs font-bold text-[var(--text-secondary)]">
                                    <Zap size={14} className="text-orange-500" /> {fuel.macros}
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold text-[var(--text-secondary)]">
                                    <Info size={14} className="text-[var(--gold)]" /> Benefit: {fuel.benefit}
                                </div>
                            </div>

                            <div className="bg-green-500/5 border border-green-500/10 p-6 rounded-3xl text-center">
                                <div className="text-[10px] font-black uppercase text-green-500/60 mb-1 tracking-widest">Compounded Savings (5Y)</div>
                                <div className="text-3xl font-serif text-green-500">₹{Math.round(parseInt(fuel.savings.replace('₹','')) * 1200).toLocaleString()}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 mb-20 animate-reveal">
                    <div className="cyber-glass p-12 rounded-[5rem] border-l-4 border-l-[var(--gold)] shadow-xl">
                        <h3 className="text-3xl font-serif italic mb-8">The Millionaire's Bulk List</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { item: 'Rolled Oats (5KG)', reason: 'Low GI, Infinite Energy', cost: '₹550' },
                                { item: 'Egg Tray (30pk)', reason: 'Pure Performance Protein', cost: '₹180' },
                                { item: 'Peanut Butter (1KG)', reason: 'Satiety & Brain Fats', cost: '₹350' },
                                { item: 'Whey Isolate', reason: 'Zero Friction Protein', cost: '₹1800' },
                            ].map((g, i) => (
                                <div key={i} className="flex justify-between items-center p-6 bg-[var(--text-primary)]/[0.02] border border-[var(--border)] rounded-3xl group hover:bg-[var(--text-primary)]/[0.04]">
                                    <div>
                                        <div className="text-sm font-bold text-[var(--text-primary)]">{g.item}</div>
                                        <div className="text-[10px] text-[var(--text-secondary)] uppercase font-black tracking-widest mt-1">{g.reason}</div>
                                    </div>
                                    <div className="text-lg font-serif text-[var(--gold)]">{g.cost}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-orange-500/5 border border-orange-500/20 p-12 rounded-[5rem] flex flex-col justify-between shadow-xl">
                        <div>
                            <Timer size={48} className="text-orange-500/20 mb-8" />
                            <h4 className="text-2xl font-serif mb-4 italic leading-tight">Time is Wealth.</h4>
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
                                Average Zomato order takes <span className="text-[var(--text-primary)] font-bold">35 minutes</span> to arrive. <br />
                                Our 'Survival Tier' meal takes <span className="text-[var(--text-primary)] font-bold">4 minutes</span>. <br />
                                You just earned <span className="text-orange-500 font-bold">31 minutes</span> of extra deep-work time.
                            </p>
                        </div>
                        <button className="w-full py-5 bg-orange-500 text-black font-black uppercase tracking-[0.3em] rounded-3xl hover:scale-105 active:scale-95 transition-all text-[10px]">
                            Export To Shopping List
                        </button>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default FuelHubPage;
