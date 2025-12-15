import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

export const Countdown: React.FC = () => {
  // 4 days in seconds = 4 * 24 * 60 * 60 = 345600
  const [timeLeft, setTimeLeft] = useState(345600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 345600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    // If days > 0, show days. Otherwise show typical timer
    if (d > 0) {
      return `${d}d ${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m`;
    }
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-red-600/20 to-pink-600/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]">
      <Timer size={18} className="text-red-400" />
      <span className="font-bold font-mono tracking-widest text-shadow-sm">OFFER ENDS: {formatTime(timeLeft)}</span>
    </div>
  );
};