import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import ScannerModal from '../components/ScannerModal';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';
import { auth } from '../lib/firebase';
import { useFinance } from '../lib/FinanceContext';
import { 
    CreditCard, 
    User, 
    ShieldCheck, 
    History, 
    Zap, 
    ArrowRight, 
    Smartphone, 
    Wallet, 
    Clock, 
    Trash2,
    PlusCircle,
    Target,
    TrendingUp,
    Download 
} from 'lucide-react';

const SettingsPage = () => {
    const router = useRouter();
    const { profile, analysis } = useFinance();
    const [selectedTab, setSelectedTab] = useState('identity');
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setDeferredPrompt(null);
            }
        } else {
            alert("To install: Tap the 'Share' icon in your browser and select 'Add to Home Screen'. Your Terminal awaits.");
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) router.push('/login');
        });
        return () => unsubscribe();
    }, [router]);

    const quickActions = [
        { icon: Smartphone, label: 'SCAN PAY', color: 'bg-blue-500', action: () => setIsScanning(true) },
        { icon: Wallet, label: 'ADD BANK', color: 'bg-orange-500', action: () => setSelectedTab('linked') },
        { icon: History, label: 'HISTORY', color: 'bg-purple-500', action: () => document.getElementById('memory-feed')?.scrollIntoView({ behavior: 'smooth' }) },
        { icon: Zap, label: 'BOOST', color: 'bg-[var(--gold)]', action: () => router.push('/smart-alternatives') },
    ];



    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] flex overflow-hidden cyber-grid">
            <Head><title>Core Control | FINFUTURE</title></Head>
            <Sidebar />

            <main className="flex-1 h-screen overflow-y-auto p-6 pt-24 md:p-10 lg:p-14 custom-scrollbar relative">
                
                {isScanning && (
                    <ScannerModal 
                        onClose={() => setIsScanning(false)}
                        onScanSuccess={(text) => {
                            setIsScanning(false);
                            alert(`Scanned Target: ${text}\nInitiating Secure Transfer Protocol...`);
                        }}
                    />
                )}

                {/* 🌌 THE G-PAY PROFILE HUD */}
                <div className="max-w-4xl mx-auto space-y-12 animate-reveal">
                    
                    <header className="flex flex-col items-center text-center pb-12 border-b border-[var(--border)]">
                        <div className="relative group mb-8">
                            <div className="absolute inset-0 bg-[var(--gold)]/20 blur-[60px] animate-pulse rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-40 h-40 bg-[var(--gold)] rounded-full flex items-center justify-center text-black font-serif italic text-6xl shadow-[0_20px_50px_rgba(197,165,90,0.3)] border-4 border-[var(--gold)]">
                                {profile.name.split(' ').map(n => n[0]).join('')}
                            </div>
                        </div>
                        <h1 className="text-4xl font-serif italic mb-2">{profile.name}</h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--text-secondary)] mb-8">Member Sovereignty: Tier I • FINFUTURE PRIME</p>
                        
                        <button 
                            onClick={handleInstallClick}
                            className="flex items-center gap-3 bg-[var(--text-primary)] text-[var(--bg-color)] px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 hover:bg-[var(--gold)] transition-all shadow-[0_10px_40px_rgba(197,165,90,0.2)]"
                        >
                            <Download size={14} className="animate-bounce" />
                            Install Terminal App
                        </button>
                    </header>

                    {/* 💠 QUICK ACTIONS GRID (GPAY STYLE) */}
                    <div className="grid grid-cols-4 gap-6">
                        {quickActions.map((action, i) => (
                            <div key={i} onClick={action.action} className="flex flex-col items-center group cursor-pointer">
                                <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform mb-3`}>
                                    <action.icon size={24} />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{action.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* 🏦 LINKED FINANCIAL FABRICS */}
                    <section>
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-4 text-[var(--gold)]">
                            <CreditCard size={16} /> Linked Fabrics
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="h-64 bg-gradient-to-br from-[#1a1a1a] to-black p-10 rounded-[3rem] border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/10 blur-[80px]" />
                                <div className="flex justify-between items-start relative z-10">
                                    <div className="text-xl font-serif italic opacity-40">FINFUTURE GOLD</div>
                                    <ShieldCheck className="text-[var(--gold)]" />
                                </div>
                                <div className="relative z-10">
                                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-2">Available Insight</div>
                                    <div className="text-4xl font-serif text-white tracking-widest leading-none">₹{analysis?.totalLeak.toLocaleString() || '0'}<span className="text-base">/mo Leak</span></div>
                                </div>
                            </div>
                            <div className="h-64 cyber-glass p-10 rounded-[3rem] border border-[var(--border)] flex flex-col items-center justify-center gap-6 group hover:border-[var(--gold)]/30 transition-all cursor-pointer">
                                <div className="w-16 h-16 rounded-full border border-dashed border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--gold)]">
                                    <PlusCircle size={24} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">Add Legacy Bank</span>
                            </div>
                        </div>
                    </section>

                    {/* 🧬 THE FINANCIAL DNA (ONBOARDING DATA) */}
                    <div className="cyber-glass p-12 rounded-[5rem] shadow-xl">
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-10 text-[var(--gold)] flex items-center gap-4">
                            <User size={16} /> Financial Identity Archetype
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { label: 'Primary Goal', val: profile.primaryGoal, icon: Target },
                                { label: 'Risk Profile', val: profile.riskProfile, icon: Zap },
                                { label: 'Target Savings', val: `₹${profile.monthlyTarget}`, icon: TrendingUp },
                                { label: 'Top Leak Category', val: analysis?.topCategory || 'N/A', icon: Smartphone },
                            ].map((dna, i) => (
                                <div key={i} className="text-center p-6 bg-[var(--bg-color)]/5 border border-[var(--border)] rounded-3xl">
                                    <dna.icon className="mx-auto mb-4 text-[var(--gold)]/60" size={18} />
                                    <div className="text-[8px] font-black uppercase text-[var(--text-secondary)] mb-2 tracking-widest">{dna.label}</div>
                                    <div className="text-xs font-bold text-[var(--text-primary)] truncate">{dna.val}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 📜 TRANSACTION MEMORY FEED */}
                    <section className="pb-40">
                        <h3 id="memory-feed" className="text-sm font-black uppercase tracking-[0.3em] mb-10 text-[var(--text-secondary)] flex items-center gap-4">
                            <Clock size={16} /> Transaction Memory
                        </h3>
                        <div className="space-y-4">
                            {analysis?.transactions.slice(0, 5).map((t, i) => (
                                <div key={i} className="flex justify-between items-center p-8 cyber-glass rounded-3xl group hover:border-[var(--gold)]/20 transition-all">
                                    <div className="flex items-center gap-8">
                                        <div className="text-2xl opacity-40 group-hover:opacity-100 transition-opacity">
                                            {t.category === 'Food Delivery' ? '🍕' : '👔'}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-[var(--text-primary)]">{t.description}</div>
                                            <div className="text-[9px] font-black uppercase text-[var(--text-secondary)] tracking-widest">Pushed to cloud • {t.category}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-serif text-[var(--gold)] font-bold">₹{t.amount}</div>
                                        <div className="text-[8px] font-black uppercase text-green-500 opacity-60">Verified</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 🗑️ DANGER ZONE */}
                    <div className="pt-20 text-center">
                        <button className="flex items-center gap-3 mx-auto px-10 py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl hover:bg-red-500 hover:text-white transition-all text-xs font-black uppercase tracking-widest shadow-xl">
                            <Trash2 size={16} /> Wipe Sovereign Data
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default SettingsPage;
