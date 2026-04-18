import React from 'react';
import WealthVisual from '../components/WealthVisual';

/* --- MODULAR AUTH FORM COMPONENT --- */
const AuthForm = () => {
  return (
    <div className="w-full max-w-sm mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-3xl font-serif font-bold text-[#C5A55A]">
          FP<span className="text-white">.</span>
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-semibold tracking-tight">Welcome Back</h1>
          <p className="text-[#8892B0] text-sm">Synchronizing your financial identity.</p>
        </div>
      </div>

      {/* Form Fields */}
      <form className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A55A]">Identity Address</label>
          <input 
            type="email" 
            placeholder="rahul@futurepaise.ai" 
            className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-[#C5A55A] transition-all placeholder:text-white/20"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A55A]">Security Phase</label>
            <a href="#" className="text-[10px] font-bold text-[#8892B0] hover:text-[#C5A55A]">Forgot?</a>
          </div>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-[#C5A55A] transition-all placeholder:text-white/20"
          />
        </div>

        <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="accent-[#C5A55A]" />
            <label htmlFor="remember" className="text-xs text-[#8892B0] font-medium">Persistence Mode</label>
        </div>

        <button className="w-full py-4 bg-gradient-to-r from-[#C5A55A] to-[#A48847] text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:scale-[1.02] transition-all shadow-[0_10px_30px_rgba(197,165,90,0.2)]">
            Initialize Session
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">or Secure Pass</span>
          <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Google Option */}
      <button className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3">
          <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.71a5.41 5.41 0 0 1 0-3.42V4.958H.957a8.993 8.993 0 0 0 0 8.084l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z"/></svg>
          Continue with Google
      </button>

      <div className="text-center">
          <p className="text-xs text-[#8892B0] font-medium">New to FuturePaise? <a href="#" className="text-[#C5A55A] font-black hover:underline cursor-pointer">Register Core</a></p>
      </div>
    </div>
  );
};

/* --- MAIN SPLIT-SCREEN LAYOUT --- */
const SovereignAuthPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col lg:flex-row overflow-hidden">
      
      {/* 🟢 LEFT SIDE: FORM HUB (45%) */}
      <section className="w-full lg:w-[45%] flex flex-col justify-center p-10 lg:p-24 relative z-10 bg-[#080808] border-r border-white/5">
        <AuthForm />
      </section>

      {/* 🟣 RIGHT SIDE: WEALTH ENGINE (55%) */}
      <section className="hidden lg:block lg:w-[55%] relative h-full">
        <div className="absolute inset-0">
          <WealthVisual />
        </div>
        
        {/* Abstract Overlays */}
        <div className="absolute bottom-20 left-20 z-20 space-y-2 pointer-events-none">
          <div className="text-[10px] font-black text-[#C5A55A]/40 uppercase tracking-[0.4em]">Engine State</div>
          <div className="text-white/50 text-xs font-medium">System initialized. Awaiting user identity sync.</div>
        </div>
      </section>
      
    </div>
  );
};

export default SovereignAuthPage;
