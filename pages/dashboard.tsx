import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';
import { useFinance } from '../lib/FinanceContext';
import { processCSV } from '../lib/engine';
import { 
    Upload, 
    Wallet, 
    Zap, 
    ShieldAlert, 
    TrendingDown, 
    Target, 
    Activity, 
    Loader2, 
    RotateCcw, 
    Plus, 
    ArrowUpRight, 
    X,
    CreditCard,
    Newspaper,
    PlusCircle
} from 'lucide-react';

const mockNews = [
    { source: "Bloomberg", headline: "Nifty 50 hits record high as FII inflows surge.", time: "10m ago", impact: "positive" },
    { source: "FINFUTURE API", headline: "CPI inflation cools to 4.8%. Rate cut expectations rise.", time: "45m ago", impact: "positive" },
    { source: "Reuters", headline: "Startups face funding winter extending into Q3.", time: "2h ago", impact: "negative" },
    { source: "WSJ Markets", headline: "Gold rally stalls as Sovereign bonds become attractive.", time: "4h ago", impact: "neutral" }
];

const EcosystemPage = () => {
    const router = useRouter();
    const { 
        analysis, setAnalysis, isLoading, setIsLoading, 
        walletBalance, setWalletBalance, walletHistory, addWalletTransaction,
        profile 
    } = useFinance();

    const [showWallet, setShowWallet] = useState(false);
    const [newsIdx, setNewsIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setNewsIdx(prev => (prev + 1) % mockNews.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    const [amtInput, setAmtInput] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((u) => {
            if (!u) router.push('/login');
        });
        return () => unsubscribe();
    }, [router]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = async (event) => {
            const csvText = event.target?.result as string;
            const lines = csvText.split('\n');
            const data = lines.slice(1).map(line => {
                const values = line.split(',');
                const obj: any = {};
                lines[0].split(',').forEach((h, i) => obj[h.trim()] = values[i]?.trim());
                return obj;
            }).filter(row => Object.keys(row).length > 1);

            setTimeout(async () => {
                const results = await processCSV(data);
                setAnalysis(results);
                setIsLoading(false);
            }, 1500);
        };
        reader.readAsText(file);
    };

    const handleAddMoney = () => {
        const amt = parseFloat(amtInput);
        if (isNaN(amt) || amt <= 0) return;
        const newVal = walletBalance + amt;
        setWalletBalance(newVal);
        addWalletTransaction({
            id: Math.random().toString(36).substr(2, 9),
            type: 'ADD',
            amount: amt,
            description: 'Capital Infusion',
            timestamp: Date.now()
        });
        setAmtInput('');
    };

    const handleSpendMoney = () => {
        const amt = parseFloat(amtInput);
        if (isNaN(amt) || amt <= 0 || amt > walletBalance) return;
        const newVal = walletBalance - amt;
        setWalletBalance(newVal);
        addWalletTransaction({
            id: Math.random().toString(36).substr(2, 9),
            type: 'SPEND',
            amount: amt,
            description: 'Sovereign Expense',
            timestamp: Date.now()
        });
        setAmtInput('');
    };

    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] flex overflow-hidden cyber-grid">
            <Head><title>Ecosystem | FINFUTURE</title></Head>
            <Sidebar />

            <main className="flex-1 h-screen overflow-y-auto p-6 pt-24 md:p-8 lg:p-12 custom-scrollbar relative">
                
                {/* 🌌 TOP NAV / WALLET */}
                <div className="flex justify-between items-center mb-16 animate-reveal">
                    <div>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--gold)]">
                            {profile.name} • {profile.primaryGoal}
                        </h2>
                        <h1 className="text-3xl font-serif italic text-[var(--text-primary)]">Operational Ecosystem</h1>
                    </div>
                    <div className="flex gap-4">
                        {analysis && (
                            <button 
                                onClick={() => { setAnalysis(null); }}
                                className="px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl"
                            >
                                <RotateCcw size={14} />
                                <span className="text-[9px] font-black uppercase tracking-widest hidden md:inline">Re-Submit CSV</span>
                            </button>
                        )}
                        <button 
                            onClick={() => setShowWallet(true)}
                            className="px-8 py-3 bg-[var(--panel-bg)] border border-[var(--gold)]/30 rounded-2xl flex items-center gap-3 text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all shadow-xl"
                        >
                            <Wallet size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Sovereign Wallet: ₹{walletBalance.toLocaleString()}</span>
                        </button>
                    </div>
                </div>

                {isLoading && (
                    <div className="fixed inset-0 z-50 bg-[var(--bg-color)]/90 flex flex-col items-center justify-center backdrop-blur-3xl">
                        <Loader2 className="w-16 h-16 text-[var(--gold)] animate-spin mb-8" strokeWidth={1} />
                        <h2 className="text-2xl font-serif italic tracking-widest text-[var(--gold)] animate-pulse">Decrypting Financial Fabric</h2>
                    </div>
                )}

                {/* 🏦 MOBIKWIK STYLE WALLET MODAL */}
                {showWallet && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-6">
                        <div className="w-full max-w-lg cyber-glass rounded-[4rem] p-12 relative animate-warp border border-[var(--gold)]/20 shadow-[0_0_100px_rgba(197,165,90,0.1)]">
                            <button onClick={() => setShowWallet(false)} className="absolute top-10 right-10 text-[var(--text-secondary)] hover:text-white">
                                <X size={24} />
                            </button>

                            <div className="text-center mb-12">
                                <div className="w-20 h-20 bg-[var(--gold)]/10 text-[var(--gold)] rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <CreditCard size={32} />
                                </div>
                                <h3 className="text-3xl font-serif italic mb-2 text-[var(--text-primary)]">Sovereign Wallet</h3>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)]">FINFUTURE SECURE NODE</p>
                            </div>

                            <div className="text-center mb-12 py-10 bg-white/[0.02] rounded-[3rem] border border-white/5">
                                <span className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">Available Power</span>
                                <div className="text-6xl font-serif text-[var(--text-primary)] mt-2">₹{walletBalance.toLocaleString()}</div>
                            </div>

                            <div className="space-y-6">
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        value={amtInput}
                                        onChange={(e) => setAmtInput(e.target.value)}
                                        placeholder="Enter Amount"
                                        className="w-full bg-[var(--bg-color)] p-6 rounded-3xl border border-[var(--border)] outline-none focus:border-[var(--gold)] text-center text-xl font-bold text-[var(--text-primary)]"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={handleAddMoney}
                                        className="py-5 bg-green-500 text-black font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 transition-all text-[10px]"
                                    >
                                        Add Money
                                    </button>
                                    <button 
                                        onClick={handleSpendMoney}
                                        className="py-5 bg-[var(--gold)] text-black font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 transition-all text-[10px]"
                                    >
                                        Spend Now
                                    </button>
                                </div>
                            </div>

                            <div className="mt-12 space-y-4 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                                {walletHistory.map(h => (
                                    <div key={h.id} className="flex justify-between items-center p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-lg ${h.type === 'ADD' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {h.type === 'ADD' ? <Plus size={14} /> : <TrendingDown size={14} />}
                                            </div>
                                            <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">{h.description}</span>
                                        </div>
                                        <span className={`text-sm font-bold ${h.type === 'ADD' ? 'text-green-500' : 'text-red-500'}`}>
                                            {h.type === 'ADD' ? '+' : '-'} ₹{h.amount}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {!analysis ? (
                    <div className="h-[70vh] flex flex-col items-center justify-center animate-reveal">
                        <div className="relative mb-12">
                            <div className="absolute inset-0 bg-[var(--gold)]/20 blur-[60px] animate-pulse rounded-full" />
                            <div className="relative w-32 h-32 cyber-glass rounded-[3rem] border border-[var(--gold)]/30 flex items-center justify-center">
                                <Upload className="text-[var(--gold)]" size={40} strokeWidth={1} />
                            </div>
                        </div>
                        <h1 className="text-6xl lg:text-7xl font-serif tracking-tighter text-center mb-6 leading-none text-[var(--text-primary)]">
                            Your bank account is <br /> <span className="text-red-500 underline decoration-red-500/20 italic">Bleeding Millions.</span>
                        </h1>
                        <p className="text-[var(--text-secondary)] max-w-md text-center text-sm leading-relaxed mb-16">
                            Upload your raw bank statement (CSV). Our engine will decode exactly where your future is being wasted. 
                            <span className="text-[var(--gold)] ml-2 font-bold italic">Private. Encrypted. Sovereign.</span>
                        </p>
                        <label className="cursor-pointer group flex flex-col items-center">
                            <div className="px-16 py-7 bg-[var(--text-primary)] text-[var(--bg-color)] font-black uppercase tracking-[0.4em] rounded-[2.5rem] hover:bg-[var(--gold)] hover:scale-105 transition-all shadow-2xl text-xs">
                                Infuse Statement
                            </div>
                            <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
                        </label>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto space-y-12 animate-reveal">
                        {/* ANALYSIS UI (Same as before but with re-upload logic) */}
                        <div className="cyber-glass p-16 rounded-[4rem] border-l-4 border-l-red-500 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px]" />
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
                                <div>
                                    <h2 className="text-red-500 text-[10px] font-black uppercase tracking-[0.5em] mb-6">Financial Pathology Report</h2>
                                    <h1 className="text-6xl lg:text-8xl font-serif tracking-tighter leading-none mb-6 text-[var(--text-primary)]">Losing <span className="text-red-500 italic">₹{analysis.totalLeak.toLocaleString()}</span></h1>
                                    <p className="text-xl text-[var(--text-secondary)] max-w-xl">
                                        Your <span className="text-[var(--text-primary)] font-bold">{analysis.topCategory}</span> habits are creating a <span className="text-[var(--gold)] font-serif italic font-bold">₹{analysis.reclaimable5Y.toLocaleString()}</span> hole in your 5-year wealth strategy.
                                    </p>
                                </div>
                                <div className="hidden lg:block pb-10">
                                    <Activity className="text-red-500/20 animate-pulse" size={120} strokeWidth={0.5} />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: TrendingDown, label: 'Monthly Leak Rate', val: `₹${analysis.totalLeak.toLocaleString()}`, color: 'text-red-500' },
                                { icon: Target, label: '5Y Wealth Gap', val: `₹${(analysis.reclaimable5Y / 100000).toFixed(1)}L`, color: 'text-[var(--gold)]' },
                                { icon: ShieldAlert, label: 'Major Drain', val: analysis.topCategory, color: 'text-[var(--text-primary)]' },
                            ].map((item, i) => (
                                <div key={i} className="cyber-glass p-10 rounded-[3rem] border border-[var(--border)] transition-all hover:scale-105">
                                    <item.icon className={`${item.color} mb-6`} size={24} />
                                    <div className="text-[10px] font-black uppercase text-[var(--text-secondary)] mb-3 tracking-widest">{item.label}</div>
                                    <div className={`text-4xl font-serif ${item.color}`}>{item.val}</div>
                                </div>
                            ))}
                        </div>

                        {/* DATA FEED */}
                        <div className="cyber-glass p-12 rounded-[5rem] mb-20 shadow-xl overflow-hidden">
                            <h3 className="text-3xl font-serif italic mb-10 text-[var(--text-primary)] px-4">Live Logic: Transaction Feed</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {analysis.transactions.slice(0, 10).map((t, i) => (
                                    <div key={i} className="flex justify-between items-center p-8 bg-[var(--bg-color)]/5 border border-[var(--border)] rounded-[2.5rem] group hover:border-[var(--gold)]/30 transition-all">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-[var(--border)] flex items-center justify-center text-xl">{t.category === 'Food Delivery' ? '🍕' : '👔'}</div>
                                            <div>
                                                <div className="text-md font-bold text-[var(--text-primary)] truncate max-w-[200px]">{t.description}</div>
                                                <div className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">{t.category}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-serif text-[var(--gold)]">₹{t.amount}</div>
                                            <div className="text-[9px] text-red-500 font-bold uppercase">GAP: ₹{t.futureLoss5Y.toLocaleString()}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 📰 DYNAMIC NEWS TICKER */}
                        <div className="mt-12 cyber-glass p-8 rounded-[3rem] border border-[var(--border)] overflow-hidden relative shadow-2xl mb-12">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-50" />
                            <div className="flex items-center gap-4 mb-4">
                                <Newspaper size={16} className="text-[var(--gold)]" />
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">Live Market Terminal</h3>
                            </div>
                            
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between min-h-[60px] animate-reveal">
                                <div className="mb-4 md:mb-0">
                                    <span className="text-[8px] font-black uppercase bg-[var(--text-primary)] text-[var(--bg-color)] px-2 py-1 rounded inline-block mb-3 leading-none">
                                        {mockNews[newsIdx].source} • {mockNews[newsIdx].time}
                                    </span>
                                    <p className="text-lg md:text-xl font-serif text-[var(--text-primary)] italic leading-tight">"{mockNews[newsIdx].headline}"</p>
                                </div>
                                <div className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border shrink-0 ${
                                    mockNews[newsIdx].impact === 'positive' ? 'border-green-500/30 text-green-500 bg-green-500/5' :
                                    mockNews[newsIdx].impact === 'negative' ? 'border-red-500/30 text-red-500 bg-red-500/5' :
                                    'border-[var(--text-secondary)]/30 text-[var(--text-secondary)] bg-[var(--bg-color)]'
                                }`}>
                                    {mockNews[newsIdx].impact}
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
};

export default EcosystemPage;
