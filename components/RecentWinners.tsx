import React from 'react';
import { Users, Trophy } from 'lucide-react';

export const RecentWinners: React.FC = () => {
  // No state or effect needed for static blinking view
  
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl h-[300px] flex flex-col relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/20 blur-[50px] rounded-full animate-pulse"></div>

      <h3 className="font-bold text-gray-300 mb-6 flex items-center gap-2 relative z-10">
        <Users size={16} className="text-purple-400" />
        Recent Winners
      </h3>
      
      <div className="flex-1 flex flex-col items-center justify-center space-y-4 relative z-10">
         <div className="relative group">
            <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full animate-pulse group-hover:bg-yellow-500/30 transition-colors"></div>
            <Trophy size={56} className="text-yellow-500/50 relative z-10 animate-float" />
         </div>
         
         <div className="flex flex-col items-center space-y-2 animate-pulse">
            <span className="text-lg font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 drop-shadow-sm">
              Winners Coming Soon
            </span>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                Calculating Results...
              </span>
            </div>
         </div>
      </div>
    </div>
  );
};