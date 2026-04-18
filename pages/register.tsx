import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth, googleProvider } from '../lib/firebase';
import WealthFountain from '../components/WealthFountain';

const RegisterPage = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            if (userCredential.user) {
                await userCredential.user.updateProfile({ displayName: name });
            }
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await auth.signInWithPopup(googleProvider);
            router.push('/dashboard');
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden">
            <Head>
                <title>Wealth Time Machine | FINFUTURE</title>
            </Head>

            {/* Left Sector: Auth Form */}
            <section className="w-full lg:w-[42%] h-full bg-[radial-gradient(circle_at_-20%_30%,rgba(197,165,90,0.1),transparent_50%)] border-r border-white/10 flex flex-col px-10 lg:pl-28 lg:pr-16 pt-20 z-10">
                <div className="max-w-[380px] w-full">
                    <div className="font-serif text-2xl text-[#C5A55A] mb-8 flex items-center gap-2 opacity-90">
                        <div className="w-1.5 h-6 bg-[#C5A55A] rounded-sm" />
                        FINFUTURE<span className="text-white">.</span>
                    </div>

                    <div className="mb-8">
                        <h1 className="font-serif text-4xl leading-tight mb-3 tracking-tighter bg-gradient-to-b from-white to-[#AAA] bg-clip-text text-fill-transparent">
                            Create <br /> Account
                        </h1>
                        <p className="text-[#8892B0] text-[13px] leading-relaxed opacity-80">
                            Join FINFUTURE today and start saving money for your future.
                        </p>
                    </div>

                    {error && <div className="text-[#EA4335] text-xs mb-4">{error}</div>}

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-extrabold text-[#C5A55A] uppercase tracking-[2px] opacity-60">Your Name</label>
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Rahul Sharma" 
                                required
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#C5A55A] transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[9px] font-extrabold text-[#C5A55A] uppercase tracking-[2px] opacity-60">Email Address</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="rahul@email.com" 
                                required
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#C5A55A] transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[9px] font-extrabold text-[#C5A55A] uppercase tracking-[2px] opacity-60">Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••" 
                                required
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#C5A55A] transition-all"
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-gradient-to-br from-[#E6C87E] to-[#C5A55A] p-4 rounded-xl text-black font-extrabold text-xs uppercase tracking-[2px] mt-4 hover:-translate-y-0.5 transition-all shadow-lg"
                        >
                            {loading ? 'Creating Future...' : 'GET STARTED →'}
                        </button>

                        <div className="flex items-center gap-4 my-4 text-[9px] font-extrabold uppercase tracking-[1.5px] text-[#333]">
                            <div className="flex-1 h-px bg-white/10" />
                            Or Sign Up With
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        <button 
                            type="button" 
                            onClick={handleGoogleLogin}
                            className="w-full bg-white text-[#333] p-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/90 transition-all shadow-md"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"/>
                            </svg>
                            Sign up with Google
                        </button>
                    </form>

                    <div className="mt-8 text-xs text-[#444]">
                        Already have an account? <Link href="/login"><span className="text-[#C5A55A] font-extrabold ml-1 cursor-pointer">Log In</span></Link>
                    </div>
                </div>
            </section>

            {/* Right Sector: Wealth Engine Animation */}
            <section className="hidden lg:block w-[58%] h-full relative">
                <WealthFountain />
            </section>
        </div>
    );
};

export default RegisterPage;
