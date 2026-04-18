import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFinance } from '../lib/FinanceContext';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Hourglass, 
  Zap, 
  ChefHat, 
  Bot, 
  Trophy, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';

const Sidebar = () => {
    const router = useRouter();
    const { marketRates } = useFinance();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('ff-theme', newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('ff-theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const menuItems = [
        { icon: LayoutDashboard, label: 'Ecosystem', path: '/dashboard' },
        { icon: Hourglass, label: 'Timeline', path: '/time-machine' },
        { icon: Zap, label: 'Pivots', path: '/smart-alternatives' },
        { icon: ChefHat, label: 'Fuel Hub', path: '/kitchen' },
        { icon: Bot, label: 'Sensei', path: '/ai-buddy' },
        { icon: Trophy, label: 'Prestige', path: '/score' },
        { icon: Settings, label: 'Core', path: '/settings' },
    ];

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <>
            {/* MOBILE HAMBURGER */}
            <button 
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden fixed top-6 left-6 z-[100] w-12 h-12 bg-[var(--gold)] text-black rounded-full flex items-center justify-center shadow-2xl"
            >
                {isMobileOpen ? <LogOut size={20} /> : <LayoutDashboard size={20} />}
            </button>

            {/* BACKDROP FOR MOBILE */}
            {isMobileOpen && (
                <div 
                    onClick={() => setIsMobileOpen(false)}
                    className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                />
            )}

            <aside className={`
                fixed md:relative h-screen bg-[var(--bg-color)] border-r border-[var(--border)] flex flex-col py-8 px-4 md:px-6 z-50 
                transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${isCollapsed ? 'md:w-20 lg:w-24' : 'md:w-64 lg:w-80'}
                ${isMobileOpen ? 'translate-x-0 w-80' : '-translate-x-full md:translate-x-0'}
            `}>
                
                {/* COLLAPSE TOGGLE (DESKTOP ONLY) */}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden md:flex absolute -right-4 top-10 w-8 h-8 bg-[var(--gold)] text-black rounded-full items-center justify-center hover:scale-110 transition-transform shadow-xl z-50"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>

                <div className="flex items-center gap-3 lg:gap-4 mb-4 mt-12 md:mt-0 group cursor-pointer" onClick={() => router.push('/')}>
                <div className="w-12 h-12 bg-[var(--gold)] rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-[0_0_30px_rgba(197,165,90,0.2)]">FF</div>
                {!isCollapsed && <span className="text-2xl font-serif tracking-tighter italic text-[var(--text-primary)]">FINFUTURE</span>}
            </div>

            {!isCollapsed && (
                <div className="px-5 mb-10 pb-6 border-b border-[var(--border)]">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">Live Market Pulse</span>
                    <div className="mt-4 flex gap-4">
                        {marketRates.map((m, i) => (
                            <div key={i} className="flex flex-col">
                                <span className={`text-[9px] font-bold ${m.change.includes('-') ? 'text-red-500' : 'text-green-500'}`}>{m.name}</span>
                                <span className="text-xs font-serif text-[var(--text-primary)] tracking-widest">{m.change}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = router.pathname === item.path;
                    return (
                        <Link key={item.path} href={item.path}>
                            <div className={`
                                group flex items-center gap-5 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-500
                                ${isActive ? 'bg-[var(--gold)]/10 text-[var(--gold)] border-l-4 border-[var(--gold)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--panel-bg)]'}
                            `}>
                                <item.icon size={20} className={`${isActive ? 'text-[var(--gold)]' : 'group-hover:text-[var(--gold)]'} transition-colors duration-500`} />
                                {!isCollapsed && <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="pt-8 mt-8 border-t border-[var(--border)] space-y-6">
                {/* THEME TOGGLE */}
                <div 
                    onClick={toggleTheme}
                    className="flex items-center gap-5 px-5 py-2 cursor-pointer group hover:text-[var(--text-primary)] text-[var(--text-secondary)]"
                >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    {!isCollapsed && <span className="text-[9px] font-black uppercase tracking-widest">{theme === 'dark' ? 'Pristine Mode' : 'Cyber Night'}</span>}
                </div>

                <div 
                    onClick={() => router.push('/')}
                    className="flex items-center gap-5 px-5 py-2 text-red-500/40 hover:text-red-500 cursor-pointer transition-all"
                >
                    <LogOut size={16} />
                    {!isCollapsed && <span className="text-[9px] font-black uppercase tracking-widest">Terminate</span>}
                </div>
            </div>
        </aside>
        </>
    );
};

export default Sidebar;
