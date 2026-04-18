import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';
import { auth } from '../lib/firebase';
import { useFinance } from '../lib/FinanceContext';
import { Bot, Send, Sparkles, TrendingDown, Target, Zap } from 'lucide-react';

const AIBuddyPage = () => {
    const router = useRouter();
    const { analysis, profile } = useFinance();
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState([
        { 
            role: 'bot', 
            text: `Sup ${profile.name.split(' ')[0]}? I've audited your fabric. You're bleeding ₹${analysis?.totalLeak.toLocaleString() || '8,450'} every month. At 12% CAGR, that's a ₹2.3L hole in 5 years. Ready to stop being a spectator and start being an owner?` 
        }
    ]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) router.push('/login');
        });
        return () => unsubscribe();
    }, [router]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getSenseiResponse = (userInput: string) => {
        const input = userInput.toLowerCase();
        const leakVal = analysis?.totalLeak || 8450;
        const topCat = analysis?.topCategory || 'Lifestyle';

        if (input.includes('save') || input.includes('help')) {
            return `Simple arithmetic, King. Stop your ${topCat} drain. Switch to home fuel. That ₹${Math.round(leakVal * 0.4)} you save monthly will become ₹1.2L by 2029. Do you want the pizza now or the portfolio later?`;
        }
        if (input.includes('invest') || input.includes('where')) {
            return `Focus on the 12% CAGR standard. If you reclaim your ₹${leakVal} leak and put it into an Index Fabric, you'll reach your ₹${profile.monthlyTarget} goal 4x faster. Strategy > Luck.`;
        }
        if (input.includes('broke') || input.includes('struggle')) {
            return `You aren't broke, you're undisciplined. You handled ₹${analysis?.totalLeak.toLocaleString()} this month and let it slip through your fingers like water. We aren't here to cry; we're here to conquer. Infuse some discipline.`;
        }
        return `That's interesting, but your bank statement says you spent most of your energy on ${topCat} recently. Let's pivot back to your ₹10L goal. What's the one expense you can kill TODAY?`;
    };

    const handleSend = () => {
        if (!input) return;
        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsThinking(true);
        
        // SIMULATE HIGH-SPEED NEURAL PROCESSING
        setTimeout(() => {
            const botResponse = getSenseiResponse(userMsg);
            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
            setIsThinking(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] flex overflow-hidden cyber-grid">
            <Head><title>AI Wealth Buddy | FINFUTURE</title></Head>
            <Sidebar />
            <main className="flex-1 h-screen flex flex-col p-6 pt-24 lg:p-12 relative w-full lg:w-auto">
                
                {/* 🌌 IDENTITY HUD */}
                <div className="flex justify-between items-center mb-12 animate-reveal relative z-10">
                    <div>
                        <h1 className="text-4xl font-serif tracking-tight">Financial <span className="text-[var(--gold)] italic">Sensei</span></h1>
                        <p className="text-[9px] uppercase font-black tracking-[0.4em] text-[var(--text-secondary)] mt-2">Neural Link: ACTIVE • ZERO FILTER</p>
                    </div>
                    {analysis && (
                        <div className="flex gap-4">
                            <div className="px-6 py-3 cyber-glass rounded-2xl flex items-center gap-3 border border-red-500/20">
                                <TrendingDown className="text-red-500" size={14} />
                                <span className="text-[10px] font-black tracking-widest text-red-500 uppercase">MONTHLY LEAK: ₹{analysis.totalLeak}</span>
                            </div>
                            <div className="px-6 py-3 cyber-glass rounded-2xl flex items-center gap-3 border border-[var(--gold)]/20">
                                <Target className="text-[var(--gold)]" size={14} />
                                <span className="text-[10px] font-black tracking-widest text-[var(--gold)] uppercase">RECLAIM 5Y: ₹{(analysis.reclaimable5Y/100000).toFixed(1)}L</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* 💎 THE CHAT ENGINE */}
                <div className="flex-1 overflow-y-auto px-4 pb-40 space-y-10 custom-scrollbar max-w-5xl mx-auto w-full pt-10">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex gap-6 animate-reveal ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border shadow-2xl ${m.role === 'bot' ? 'bg-[var(--gold)]/10 border-[var(--gold)] text-[var(--gold)]' : 'bg-white/5 border-white/10 text-white'}`}>
                                {m.role === 'bot' ? <Bot size={20} /> : <div className="text-[10px] font-black">YOU</div>}
                            </div>
                            <div className={`
                                group max-w-xl p-8 rounded-[2.5rem] leading-relaxed text-sm transition-all duration-500 hover:scale-[1.01]
                                ${m.role === 'bot' ? 'cyber-glass rounded-tl-none text-[var(--text-primary)] opacity-90' : 'bg-[var(--gold)] text-black font-bold rounded-tr-none shadow-[0_20px_40px_rgba(197,165,90,0.25)]'}
                            `}>
                                {m.text}
                            </div>
                        </div>
                    ))}
                    {isThinking && (
                        <div className="flex gap-6 animate-pulse px-2">
                             <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)] flex items-center justify-center text-[var(--gold)]">
                                <Sparkles size={16} />
                             </div>
                             <div className="cyber-glass p-6 rounded-3xl text-sm italic opacity-40">Processessing systemic truth...</div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* ⚡ INPUT INTERFACE */}
                <div className="absolute bottom-12 left-12 right-12 z-20">
                    <div className="max-w-4xl mx-auto relative group">
                        <div className="absolute inset-0 bg-[var(--gold)]/10 blur-[40px] opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Interrogate the Sensei..." 
                            className="relative w-full bg-[var(--bg-color)] border border-[var(--border)] p-8 rounded-[2.5rem] outline-none focus:border-[var(--gold)] transition-all text-sm font-medium pr-32 cyber-glass shadow-2xl text-[var(--text-primary)]"
                        />
                        <button 
                            onClick={handleSend}
                            className="absolute right-4 top-1/2 -translate-y-1/2 px-10 py-5 bg-[var(--gold)] text-black font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-[10px]"
                        >
                            {isThinking ? '...' : 'Send'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AIBuddyPage;
