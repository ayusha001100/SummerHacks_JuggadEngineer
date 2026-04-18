import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

declare var gsap: any;

const LandingPage = () => {
    const router = useRouter();
    const logoRef = useRef(null);
    const heroRef = useRef(null);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // CINEMATIC LOGO REVEAL
        const tl = gsap.timeline({
            onComplete: () => setShowContent(true)
        });

        tl.fromTo(logoRef.current, 
            { opacity: 0, scale: 0.8, filter: 'blur(20px)' },
            { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2, ease: "expo.out" }
        )
        .to(logoRef.current, { 
            y: -100, 
            scale: 0.5, 
            opacity: 0.2, 
            duration: 1.5, 
            ease: "power4.inOut",
            delay: 1 
        });

        if (showContent) {
            gsap.fromTo(heroRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.5, ease: "expo.out", stagger: 0.2 }
            );
        }
    }, [showContent]);

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden flex items-center justify-center font-sans selection:bg-[#C5A55A] selection:text-black">
            <Head><title>FINFUTURE | Experience Wealth</title></Head>

            {/* 🛡️ BACKGROUND AURA */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#C5A55A]/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#C5A55A]/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* 💎 LOGO INTRO */}
            {!showContent && (
                <div ref={logoRef} className="flex flex-col items-center gap-6">
                    <div className="w-24 h-24 bg-[#C5A55A] rounded-[2.5rem] flex items-center justify-center text-black font-black text-4xl shadow-[0_0_100px_rgba(197,165,90,0.3)]">FF</div>
                    <h1 className="text-4xl font-serif tracking-[0.4em] uppercase text-[#C5A55A]">FINFUTURE</h1>
                </div>
            )}

            {/* 🔥 HERO CONTENT */}
            {showContent && (
                <div ref={heroRef} className="max-w-4xl w-full text-center px-8 z-10">
                    <div className="mb-12">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C5A55A] mb-8 block">Member of the 0.1% Club</span>
                        <h1 className="text-7xl lg:text-9xl font-serif italic tracking-tighter leading-none mb-12">
                            Stop Spending. <br /> <span className="text-white/20">Start Existing.</span>
                        </h1>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <button 
                            onClick={() => router.push('/register')}
                            className="px-12 py-6 bg-[#C5A55A] text-black font-black uppercase tracking-[0.3em] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_40px_80px_rgba(197,165,90,0.2)] text-xs"
                        >
                            Establish Account
                        </button>
                        <button 
                            onClick={() => router.push('/login')}
                            className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 transition-all text-xs"
                        >
                            Return to Portfolio
                        </button>
                    </div>

                    <div className="mt-24">
                        <p className="text-[10px] font-bold text-white/10 uppercase tracking-[1em]">The Future of Personal Wealth is Private</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
