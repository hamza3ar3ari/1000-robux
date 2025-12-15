import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';

const NAMES = ["RobloxKing99", "CoolGamer", "NoobSlayer", "FreeBuxLover", "SarahPlays", "MikeTyson_RBX", "Guest_9912", "AdoptMeFan", "BloxFruitsPro", "NinjaTyla", "DemonSlayer_01", "Princess_Peach", "Rbx_Rich", "Speedy_Gonz", "MegaMind"];

// Users only type variations of "Roblox" now
const MESSAGES = [
  "Roblox",
  "ROBLOX",
  "roblox",
  "ROBLOX!",
  "Roblox",
  "roblox",
  "ROBLOX",
  "Roblox!",
  "roblox",
  "ROBLOX",
  "Roblox",
  "ROBLOX!!!",
  "roblox",
  "ROBLOX",
  "Roblox"
];

const AVATARS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Cal",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Max"
];

export const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, user: "System", message: "Giveaway Queue Open.", avatar: "", isSystem: true },
    { id: 2, user: "Admin", message: "Type ROBLOX to confirm your entry!", avatar: AVATARS[0] }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const addMessage = () => {
    // Filter out names that are currently visible in the chat window to prevent duplicates
    const currentUsers = new Set(messages.slice(-12).map(m => m.user));
    const availableNames = NAMES.filter(name => !currentUsers.has(name));
    
    // If all names used recently, fallback to any random name
    const randomName = availableNames.length > 0 
      ? availableNames[Math.floor(Math.random() * availableNames.length)] 
      : NAMES[Math.floor(Math.random() * NAMES.length)];

    const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    const randomAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
    
    const newMsg: ChatMessage = {
      id: Date.now(),
      user: randomName,
      message: randomMsg,
      avatar: randomAvatar
    };

    setMessages(prev => [...prev.slice(-15), newMsg]); // Keep last 15 messages
  };

  useEffect(() => {
    const interval = setInterval(() => {
      addMessage();
    }, 2800); // Slowed down chat speed (was 800)
    return () => clearInterval(interval);
  }, [messages]); 

  // Auto-scroll effect
  useEffect(() => {
    if (scrollRef.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      scrollRef.current.scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden h-[350px] flex flex-col w-full shadow-2xl">
      <div className="bg-white/10 p-3 border-b border-white/10 font-bold flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        Live Chat
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-2 ${msg.isSystem ? 'text-yellow-400' : 'text-gray-200'} text-sm animate-fade-in`}>
            {msg.isSystem ? (
              <span className="font-bold bg-yellow-500/20 px-2 rounded text-[10px] uppercase tracking-wider">[SYSTEM]</span>
            ) : (
              <img src={msg.avatar} alt="avatar" className="w-6 h-6 rounded-full bg-white/10 ring-1 ring-white/20" />
            )}
            <div>
              {!msg.isSystem && <span className="font-bold text-pink-400 mr-2 drop-shadow-sm">{msg.user}:</span>}
              <span className="leading-tight">{msg.message}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 bg-white/5 border-t border-white/10">
        <div className="relative">
             <input disabled placeholder="Chat is locked for verification..." className="w-full bg-black/20 text-xs text-gray-500 italic p-2 rounded-lg border border-white/5 cursor-not-allowed" />
             <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};