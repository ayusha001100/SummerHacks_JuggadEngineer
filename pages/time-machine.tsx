import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';
import { auth } from '../lib/firebase';
import { useFinance } from '../lib/FinanceContext';
import { Hourglass, Rocket, Shield, TrendingUp } from 'lucide-react';

const TimeMachinePage = () => {
    const { analysis } = useFinance();
    const router = useRouter();
    const [sliderVal, setSliderVal] = useState(50); 
    const [isWarping, setIsWarping] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) router.push('/login');
        });
        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsWarping(false);
        }, 1500); 
        return () => clearTimeout(timer);
    }, []);

    const baseLeak = analysis?.totalLeak || 0;
    const futureWealth = (years: number) => {
        if (!baseLeak) return 0;
        const monthly = baseLeak * (sliderVal / 100);
        const r = 0.12 / 12;
        const n = years * 12;
        return Math.round(monthly * ((Math.pow(1 + r, n) - 1) / r));
    };

    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] flex overflow-hidden cyber-grid">
            <Head><title>Wealth Time Machine | FINFUTURE</title></Head>
            <Sidebar />
            
            <main className="flex-1 h-screen overflow-y-auto p-6 pt-24 md:p-12 custom-scrollbar relative flex flex-col items-center">
                
                {!analysis ? (
                    <div className="h-full flex flex-col items-center justify-center animate-reveal text-center">
                        <Hourglass className="text-[var(--gold)]/20 mb-8" size={80} strokeWidth={0.5} />
                        <h1 className="text-4xl lg:text-6xl font-serif tracking-tighter italic mb-6 text-[var(--text-primary)]">
                            Temporal Data <span className="text-red-500">Deprived</span>
                        </h1>
                        <p className="text-[var(--text-secondary)] text-sm max-w-md mx-auto mb-12">
                            The Time Machine requires real-world data to calculate your 20-year trajectory. We don't do static estimates.
                        </p>
                        <button 
                            onClick={() => window.location.href = '/dashboard'}
                            className="px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-color)] font-black uppercase tracking-[0.4em] rounded-3xl hover:bg-[var(--gold)] transition-all shadow-xl text-xs"
                        >
                            Infuse Bank CSV
                        </button>
                    </div>
                ) : (
                    <>
                        {isWarping && (
                            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-color)] animate-warp backdrop-blur-3xl">
                                <div className="relative mb-8 text-center">
                                    <div className="absolute inset-0 bg-[var(--gold)]/20 blur-[60px] animate-pulse rounded-full" />
                                    <Hourglass size={64} className="text-[var(--gold)] animate-spin mx-auto mb-6" />
                                    <h2 className="text-3xl font-serif italic tracking-widest text-[var(--gold)]">Temporal Calibration</h2>
                                </div>
                            </div>
                        )}

                        {!isWarping && (
                            <div className="w-full max-w-6xl animate-reveal pt-10">
                                <header className="mb-24 text-center">
                                    <div className="inline-flex items-center gap-4 text-[var(--gold)] mb-8 px-6 py-2 bg-[var(--gold)]/5 rounded-full border border-[var(--gold)]/20 shadow-xl">
                                        <Rocket size={18} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.5em]">20-Year Accumulation Phase</span>
                                    </div>
                                    <h1 className="text-8xl lg:text-[10rem] font-serif tracking-tighter italic mb-10 text-[var(--text-primary)] leading-none select-none">
                                        ₹{futureWealth(20).toLocaleString()}
                                    </h1>
                                    <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-xs font-black uppercase tracking-[0.6em] italic leading-loose">
                                        Projected Sovereign Worth <br />
                                        <span className="text-[var(--gold)] opacity-50">at {sliderVal}% reclamation level</span>
                                    </p>
                                </header>

                                <div className="cyber-glass p-16 rounded-[5rem] mb-12 relative group shadow-2xl overflow-hidden border border-[var(--gold)]/10">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold)]/5 blur-[100px] pointer-events-none" />
                                    <div className="flex justify-between items-end mb-16 relative z-10">
                                        <div>
                                            <h3 className="text-sm font-black tracking-widest text-[var(--gold)] uppercase mb-2">Commitment Slider</h3>
                                            <p className="text-[10px] text-[var(--text-secondary)] uppercase">Slide to adjust your daily habit pivot intensity</p>
                                        </div>
                                        <div className="text-6xl font-serif text-[var(--text-primary)]">{sliderVal}%</div>
                                    </div>
                                    
                                    <input 
                                        type="range" min="0" max="100" value={sliderVal} 
                                        onChange={(e) => setSliderVal(parseInt(e.target.value))}
                                        className="w-full h-1 bg-[var(--border)] rounded-full appearance-none cursor-pointer accent-[var(--gold)] mb-20 relative z-10"
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                                        {[
                                            { label: '5 Year Milestone', val: futureWealth(5), icon: Shield },
                                            { label: '10 Year Horizon', val: futureWealth(10), icon: Rocket },
                                            { label: '20 Year Zenith', val: futureWealth(20), icon: TrendingUp },
                                        ].map((item, i) => (
                                            <div key={i} className="text-center p-10 bg-[var(--bg-color)]/5 border border-[var(--border)] rounded-[2.5rem] group hover:border-[var(--gold)]/30 transition-all shadow-lg">
                                                <item.icon className="mx-auto mb-6 text-[var(--gold)]/40" size={28} strokeWidth={1} />
                                                <div className="text-[9px] font-black uppercase text-[var(--text-secondary)] mb-4 tracking-[0.2em]">{item.label}</div>
                                                <div className="text-3xl font-serif text-[var(--text-primary)] tracking-tighter">₹{item.val.toLocaleString()}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-center pb-20 mt-10">
                                    <div className="text-[8px] font-black uppercase tracking-[0.8em] text-[var(--text-secondary)]/30 mb-4 italic">Geometric Engine: 12% Annualized Growth</div>
                                    <div className="w-16 h-[1px] bg-[var(--gold)]/20 mx-auto" />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default TimeMachinePage;
