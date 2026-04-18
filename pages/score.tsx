import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';
import { auth } from '../lib/firebase';
import { useFinance } from '../lib/FinanceContext';
import { Target, Trophy, ShieldCheck, Zap, Activity } from 'lucide-react';

const ScorePage = () => {
    const { analysis } = useFinance();
    const router = useRouter();

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) router.push('/login');
        });
        return () => unsubscribe();
    }, [router]);
    
    
    // CALCULATE REAL SCORE LOGIC
    const baseScore = 60;
    const leakModifier = analysis ? Math.max(-20, (10000 - analysis.totalLeak) / 500) : 0;
    const finalScore = Math.min(99, Math.round(baseScore + leakModifier));

    const metrics = [
        { label: 'Retention Aura', val: `${finalScore}%`, status: finalScore > 80 ? 'Elite' : 'Stable' },
        { label: 'Market Discipline', val: 'High', status: 'Elite' },
        { label: 'Leak Pressure', val: analysis ? `₹${analysis.totalLeak.toLocaleString()}` : '0', status: 'Critical' },
        { label: 'Temporal Gain', val: analysis ? `₹${(analysis.reclaimable5Y/100000).toFixed(1)}L` : '0', status: 'Stable' },
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] flex overflow-hidden cyber-grid">
            <Head><title>Prestige Dashboard | FINFUTURE</title></Head>
            <Sidebar />

            <main className="flex-1 h-screen overflow-y-auto p-6 pt-24 md:p-12 custom-scrollbar">
                
                <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 animate-reveal">
                    <div>
                        <div className="flex items-center gap-3 text-[#C5A55A] mb-4">
                            <Activity size={20} className="animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Biometric Wealth Metric</span>
                        </div>
                        <h1 className="text-8xl font-serif italic tracking-tighter leading-none">{finalScore}<span className="text-2xl opacity-20 NOT-italic">/100</span></h1>
                        <p className="text-white/40 mt-6 max-w-sm text-xs font-bold uppercase tracking-widest leading-relaxed">
                            Your financial aura is <span className={finalScore > 75 ? 'text-[#00FF94]' : 'text-[#FF0055]'}>{finalScore > 75 ? 'RADIANT' : 'FADING'}</span>. You are currently outperforming 82% of young earners in your bracket.
                        </p>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="w-24 h-24 cyber-glass rounded-full flex items-center justify-center border border-[#C5A55A]/30 shadow-[0_0_40px_rgba(197,165,90,0.1)]">
                            <Trophy className="text-[#C5A55A]" size={32} strokeWidth={1} />
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {metrics.map((m, i) => (
                        <div key={i} className="cyber-glass p-10 rounded-[3rem] border border-white/5 hover:border-[#C5A55A]/30 transition-all animate-reveal" style={{ animationDelay: `${i*0.1}s` }}>
                            <div className="text-[10px] font-black uppercase text-white/20 mb-6 tracking-widest">{m.label}</div>
                            <div className="text-4xl font-serif text-[#C5A55A] mb-4 tracking-tighter">{m.val}</div>
                            <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${m.status === 'Elite' ? 'text-[#00FF94]' : m.status === 'Critical' ? 'text-[#FF0055]' : 'text-white/40'}`}>
                                STATUS: {m.status}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
                    <div className="cyber-glass p-12 rounded-[5rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF94]/5 blur-[60px]" />
                        <h3 className="text-2xl font-serif mb-6 italic">Strategic Insight</h3>
                        <p className="text-white/50 text-sm leading-relaxed mb-8">
                            Your "Leak Pressure" is primarily driven by {analysis?.topCategory || 'undisclosed'} habits. By reducing this by just 15%, your Prestige Score will break the 85 threshold, unlocking "Elite Tier" advisor access.
                        </p>
                        <button className="flex items-center gap-3 text-[#00FF94] text-[10px] font-black uppercase tracking-[0.3em] group-hover:gap-5 transition-all">
                            Optimize Profile <Target size={14} />
                        </button>
                    </div>

                    <div className="cyber-glass p-12 rounded-[5rem] flex flex-col items-center justify-center text-center animate-reveal">
                        <ShieldCheck size={64} className="text-[#C5A55A]/10 mb-6" />
                        <h4 className="text-lg font-serif mb-2">Sovereign Guarantee</h4>
                        <p className="text-[10px] text-white/20 font-black uppercase tracking-widest leading-loose">
                            All scores are computed on local fabric. <br /> Encrypted • Private • Sovereign
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ScorePage;
