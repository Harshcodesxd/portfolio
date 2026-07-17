"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Fast increment for loading simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 600); // Allow fade animation to complete
          }, 400);
          return 100;
        }
        // Random incremental jumps for realistic loading feel
        const jump = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + jump, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 bg-[#050505] z-[99999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Glowing particle background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[20%] left-[20%] w-[30vw] h-[30vw] bg-electricBlue/5 rounded-full filter blur-[100px] animate-pulse-slow" />
            <div className="absolute bottom-[20%] right-[20%] w-[40vw] h-[40vw] bg-royalPurple/5 rounded-full filter blur-[120px] animate-pulse-slow" />
          </div>

          <div className="relative flex flex-col items-center">
            {/* Elegant SVG Logo animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 relative"
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="filter drop-shadow-[0_0_15px_rgba(0,82,255,0.4)]"
              >
                {/* Outter glowing border */}
                <motion.rect
                  x="5"
                  y="5"
                  width="90"
                  height="90"
                  rx="24"
                  stroke="url(#logo-grad)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                
                {/* Central H-shaped portal logic */}
                <motion.path
                  d="M35 30V70M65 30V70M35 50H65"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                />
                
                <defs>
                  <linearGradient id="logo-grad" x1="0" y1="0" x2="100" y2="100">
                    <stop offset="0%" stopColor="#0052FF" />
                    <stop offset="50%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Percentage Indicator */}
            <div className="h-8 flex flex-col items-center justify-center overflow-hidden">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-display font-light text-2xl tracking-[0.2em] text-white/95"
              >
                {progress}%
              </motion.div>
            </div>

            {/* Progress line indicator */}
            <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden mt-4 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-electricBlue via-royalPurple to-softCyan"
                style={{ width: `${progress}%` }}
                layout
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.3 }}
              className="mt-3 text-[10px] tracking-[0.3em] uppercase text-mutedText"
            >
              Initializing Systems
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
