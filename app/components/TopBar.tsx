"use client";

import { useState } from "react";
import { ChevronDown, X, Search, Bell, Settings, Sparkles } from "lucide-react";

interface TopBarProps {
  onClose?: () => void;
}

export default function TopBar({ onClose }: TopBarProps = {}) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  return (
    <div className="h-20 bg-black/60 backdrop-blur-xl border-b border-white/[0.08] flex items-center justify-between px-8 py-4 relative z-10">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.02] border border-white/[0.08] rounded-xl hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200 group">
          <span className="text-sm text-white font-medium">
            CUA Browser
          </span>
          <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-300 transition-colors my-[7px]" />
        </button>
        
        <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:border-white/[0.12] transition-all duration-200 group cursor-pointer">
          <Search size={16} className="text-gray-400 group-hover:text-gray-300 transition-colors" />
          <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Search</span>
          <kbd className="px-1.5 py-0.5 text-xs bg-white/[0.05] text-gray-400 border border-white/[0.08] rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onClose && (
          <button
            onClick={onClose}
            className="flex items-center justify-center px-3 py-2 bg-black/[0.4] backdrop-blur-xl gap-2 text-sm font-medium border border-white/[0.08] rounded-lg transition-all duration-200 hover:bg-white/[0.05]"
          >
            <X size={18} className="text-white" />
            <span className="text-white">Close</span>
            <kbd className="px-1.5 text-xs bg-white/[0.05] ml-1 border border-white/[0.08] rounded">
              ESC
            </kbd>
          </button>
        )}
        
        <button className="hidden md:flex items-center justify-center w-10 h-10 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200 group">
          <Sparkles size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
        </button>
        
        <button className="relative flex items-center justify-center w-10 h-10 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200 group">
          <Bell size={18} className="text-gray-400 group-hover:text-gray-300 transition-colors" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border border-black"></span>
        </button>
        
        <button className="hidden md:flex items-center justify-center w-10 h-10 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200 group">
          <Settings size={18} className="text-gray-400 group-hover:text-gray-300 transition-colors" />
        </button>
        
        <div className="w-px h-8 bg-white/[0.08]"></div>
        
        <button 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 group"
        >
          <span className="text-sm font-semibold text-white">
            AI
          </span>
        </button>
      </div>
    </div>
  );
}
