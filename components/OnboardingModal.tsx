'use client';

import React, { useState, useEffect } from 'react';

interface Question {
    id: number;
    title: string;
    description: string;
    options: string[];
    key: string;
}

const ONBOARDING_QUESTIONS: Question[] = [
    {
        id: 1,
        title: "What is your monthly income?",
        description: "Help us calibrate your wealth engine with precision.",
        options: ["< ₹25k", "₹25k – ₹50k", "₹50k – ₹1L", "₹1L+"],
        key: 'income'
    },
    {
        id: 2,
        title: "Where do you spend the most?",
        description: "Identifying capital leaks in your primary spending nodes.",
        options: ["Food / Dining", "Shopping", "Travel", "Subscriptions", "Rent / EMI"],
        key: 'spending'
    },
    {
        id: 3,
        title: "How much do you usually save?",
        description: "Measuring your current financial persistence rate.",
        options: ["Nothing 😅", "< 10%", "10–20%", "20% +"],
        key: 'savings'
    },
    {
        id: 4,
        title: "What is your main financial goal?",
        description: "Select the objective for your financial sovereignty.",
        options: ["Save Money", "Grow Wealth (Invest)", "Control Spending", "Financial Freedom"],
        key: 'goal'
    },
    {
        id: 5,
        title: "Future Capital Allocation?",
        description: "If you save extra money, what will you do with it?",
        options: ["Invest (SIP/Stocks)", "Travel / Lifestyle", "Emergency Fund", "Big Purchase"],
        key: 'allocation'
    }
];

const OnboardingModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isAnimating, setIsAnimating] = useState(false);

    // Auto-trigger simulation (Check if onboarding is needed)
    useEffect(() => {
        const completed = localStorage.getItem('onboarding_complete');
        if (!completed) {
            setTimeout(() => setIsOpen(true), 1500); // Smooth delay after login
        }
    }, []);

    const handleSelect = (key: string, option: string) => {
        setAnswers(prev => ({ ...prev, [key]: option }));
    };

    const nextStep = () => {
        if (currentStep < ONBOARDING_QUESTIONS.length - 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep(prev => prev + 1);
                setIsAnimating(false);
            }, 300);
        } else {
            handleFinish();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleFinish = () => {
        console.log("Onboarding Data Captured:", answers);
        localStorage.setItem('onboarding_complete', 'true');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    const currentQ = ONBOARDING_QUESTIONS[currentStep];
    const progress = ((currentStep + 1) / ONBOARDING_QUESTIONS.length) * 100;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500">
            {/* Modal Container */}
            <div className="relative w-full max-w-xl bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(197,165,90,0.15)] overflow-hidden">
                
                {/* Gold Glow Accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#C5A55A] to-transparent" />

                <div className="p-10 lg:p-14">
                    {/* Header: Progress Indicator */}
                    <div className="flex items-center justify-between mb-10">
                        <div className="text-[10px] font-black text-[#C5A55A] tracking-[0.3em] uppercase">
                            Step {currentStep + 1} <span className="text-white/20">/ 5</span>
                        </div>
                        <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-[#C5A55A] transition-all duration-500 rounded-full shadow-[0_0_10px_#C5A55A]" 
                                style={{ width: `${progress}%` }} 
                            />
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                        <h2 className="font-serif text-3xl lg:text-4xl text-white mb-3">
                            {currentQ.title}
                        </h2>
                        <p className="text-[#8892B0] text-sm mb-10 opacity-70">
                            {currentQ.description}
                        </p>

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 gap-3">
                            {currentQ.options.map((option, idx) => {
                                const isSelected = answers[currentQ.key] === option;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleSelect(currentQ.key, option)}
                                        className={`group relative w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                                            isSelected 
                                            ? 'bg-[#C5A55A]/10 border-[#C5A55A] shadow-[0_0_20px_rgba(197,165,90,0.1)]' 
                                            : 'bg-white/[0.03] border-white/5 hover:border-white/20'
                                        }`}
                                    >
                                        <span className={`text-sm font-semibold transition-colors ${isSelected ? 'text-[#C5A55A]' : 'text-white/70'}`}>
                                            {option}
                                        </span>
                                        {isSelected && (
                                            <div className="w-2 h-2 rounded-full bg-[#C5A55A] shadow-[0_0_10px_#C5A55A]" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer: Navigation */}
                    <div className="flex items-center justify-between mt-12 gap-4">
                        <button 
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className={`text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-[#C5A55A] transition-colors disabled:opacity-0`}
                        >
                            ← Back
                        </button>
                        
                        <button 
                            onClick={nextStep}
                            disabled={!answers[currentQ.key]}
                            className={`px-10 py-4 rounded-xl font-extrabold text-[10px] uppercase tracking-[0.2em] transition-all ${
                                answers[currentQ.key] 
                                ? 'bg-white text-black hover:scale-105 active:scale-95' 
                                : 'bg-white/5 text-white/20 cursor-not-allowed'
                            }`}
                        >
                            {currentStep === ONBOARDING_QUESTIONS.length - 1 ? 'Finish Profile' : 'Continue →'}
                        </button>
                    </div>
                </div>

                {/* Sub-footer Brand */}
                <div className="py-6 bg-white/[0.02] border-t border-white/5 text-center">
                    <span className="text-[9px] font-black text-white/10 tracking-[0.5em] uppercase">FuturePaise Intelligence Protocol</span>
                </div>
            </div>
        </div>
    );
};

export default OnboardingModal;
