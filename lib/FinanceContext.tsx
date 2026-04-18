import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase';

interface Transaction {
  amount: number;
  category: string;
  description: string;
  date: string;
  futureLoss5Y: number;
}

interface AnalysisResults {
  totalLeak: number;
  reclaimable5Y: number;
  topCategory: string;
  transactions: Transaction[];
}

interface UserProfile {
  name: string;
  email: string;
  photo: string;
  primaryGoal: string;
  riskProfile: string;
  monthlyTarget: string;
}

interface MarketPulse {
  name: string;
  price: string;
  change: string;
}

interface WalletHistoryItem {
    id: string;
    type: 'ADD' | 'SPEND';
    amount: number;
    description: string;
    timestamp: number;
}

interface FinanceContextType {
  analysis: AnalysisResults | null;
  setAnalysis: (data: AnalysisResults | null) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  walletBalance: number;
  setWalletBalance: (val: number) => void;
  walletHistory: WalletHistoryItem[];
  addWalletTransaction: (item: WalletHistoryItem) => void;
  marketRates: MarketPulse[];
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [analysis, setAnalysisState] = useState<AnalysisResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [marketRates, setMarketRates] = useState<MarketPulse[]>([
      { name: 'S&P 500', price: '...', change: '...' },
      { name: 'BITCOIN', price: '...', change: '...' }
  ]);
  
  const [profile, setProfileState] = useState<UserProfile>({
    name: 'Loading Identity...',
    email: '',
    photo: '',
    primaryGoal: 'Wealth Accumulation',
    riskProfile: 'Aggressive',
    monthlyTarget: '500000'
  });

  const [walletBalance, setWalletBalanceState] = useState(0);
  const [walletHistory, setWalletHistoryState] = useState<WalletHistoryItem[]>([]);

  // FETCH REAL MARKET DATA (COINGECKO & SIMULATED STOCK FOR DEMO STABILITY)
  const fetchMarketData = async () => {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true');
        const data = await res.json();
        setMarketRates([
            { 
              name: 'BITCOIN', 
              price: `₹${(data.bitcoin.usd * 83).toLocaleString()}`, 
              change: `${data.bitcoin.usd_24h_change.toFixed(2)}%` 
            },
            { 
              name: 'ETHEREUM', 
              price: `₹${(data.ethereum.usd * 83).toLocaleString()}`, 
              change: `${data.ethereum.usd_24h_change.toFixed(2)}%` 
            }
        ]);
    } catch(e) { console.log("Market Pulse Sync Delayed"); }
  };

  useEffect(() => {
    // 1. SYNC AUTH IDENTITY
    const unsubscribe = auth.onAuthStateChanged((u) => {
        if (u) {
            setProfileState(prev => ({
                ...prev,
                name: u.displayName || 'Sovereign User',
                email: u.email || '',
                photo: u.photoURL || ''
            }));
        }
    });

    // 2. FETCH MARKET PULSE
    fetchMarketData();
    const marketInterval = setInterval(fetchMarketData, 60000); // 1 min sync

    // 3. LOAD PERSISTED DATA
    const saved = localStorage.getItem('ff-analysis-v2');
    if (saved) setAnalysisState(JSON.parse(saved));
    
    const savedBalance = localStorage.getItem('ff-wallet-balance');
    if (savedBalance) setWalletBalanceState(Number(savedBalance));

    const savedHistory = localStorage.getItem('ff-wallet-history');
    if (savedHistory) setWalletHistoryState(JSON.parse(savedHistory));

    return () => {
        unsubscribe();
        clearInterval(marketInterval);
    }
  }, []);

  const setAnalysis = (data: AnalysisResults | null) => {
    setAnalysisState(data);
    if (data) localStorage.setItem('ff-analysis-v2', JSON.stringify(data));
    else localStorage.removeItem('ff-analysis-v2');
  };

  const setProfile = (p: UserProfile) => {
    setProfileState(p);
    localStorage.setItem('ff-profile', JSON.stringify(p));
  };

  const setWalletBalance = (val: number) => {
    setWalletBalanceState(val);
    localStorage.setItem('ff-wallet-balance', val.toString());
  };

  const addWalletTransaction = (item: WalletHistoryItem) => {
    const newHistory = [item, ...walletHistory];
    setWalletHistoryState(newHistory);
    localStorage.setItem('ff-wallet-history', JSON.stringify(newHistory));
  };

  return (
    <FinanceContext.Provider value={{ 
        analysis, setAnalysis, 
        isLoading, setIsLoading, 
        profile, setProfile,
        walletBalance, setWalletBalance,
        walletHistory, addWalletTransaction,
        marketRates
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error('useFinance must be used within FinanceProvider');
  return context;
};
