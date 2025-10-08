"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SessionControlsProps {
  sessionTime: number;
  onStop: () => void;
}

const formatTime = (seconds: number, totalTime: string): string => {
  // Always show minutes:seconds format
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")} / ${totalTime}`;
};

export const SessionControls: React.FC<SessionControlsProps> = ({
  sessionTime,
  onStop,
}) => {
  // Use client-side rendering for the time display to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div 
      className="flex flex-row items-center gap-3 bg-black/[0.7] backdrop-blur-xl px-4 py-3 border-2 border-white/[0.15] rounded-xl shadow-2xl"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-row items-center gap-2">
        <svg
          className="w-5 h-5 text-white/80"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <div className="flex items-center px-1 py-1 text-base text-white">
          <span className="font-semibold">Session time:</span>{" "}
          <span className="ml-2 min-w-[90px] text-center font-mono font-bold">
            {mounted ? formatTime(sessionTime, "5:00") : "0:00"}
          </span>
        </div>
      </div>

      <motion.button
        className="flex items-center justify-center px-4 py-2 text-base font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors rounded-lg shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStop}
      >
        <svg
          className="w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <rect x="6" y="6" width="12" height="12" rx="1" fill="currentColor" />
        </svg>
        Stop Session
      </motion.button>
    </motion.div>
  );
};
