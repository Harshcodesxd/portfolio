"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export default function Testimonials({ data }: { data: TestimonialItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  // Autoplay functionality
  useEffect(() => {
    if (isHovered) {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
      return;
    }

    timeoutRef.current = setInterval(handleNext, 6000); // 6 seconds slide

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [isHovered, activeIndex]);

  const current = data[activeIndex];

  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 lg:px-24 w-full max-w-4xl mx-auto relative z-10">
      {/* Title */}
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-[10px] tracking-[0.3em] font-display text-gradient-blue-purple uppercase mb-3">
          Endorsements
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
          Client Feedback
        </h2>
      </div>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative p-8 sm:p-12 rounded-[32px] glass-card border border-white/5 overflow-hidden transition-all duration-500 shadow-premium"
      >
        {/* Background glow behind card contents */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.03)_0%,transparent_80%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <Quote className="w-10 h-10 text-royalPurple/40 mb-8" />

          {/* Testimonial slider anim container */}
          <div className="min-h-[160px] sm:min-h-[120px] flex items-center justify-center mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="font-display font-light text-base sm:text-lg md:text-xl text-white/95 leading-relaxed max-w-2xl"
              >
                "{current.quote}"
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Author details with transitions */}
          <div className="h-20 flex items-center justify-center mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4"
              >
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="w-12 h-12 rounded-full border border-white/10 object-cover shadow-md"
                />
                <div className="text-left">
                  <h4 className="font-display font-bold text-sm text-white">{current.author}</h4>
                  <p className="font-sans text-[10px] tracking-wider text-mutedText uppercase">
                    {current.role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-6">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10 flex items-center justify-center text-mutedText hover:text-white transition-all shadow-sm"
              title="Previous Slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Indicator dots */}
            <div className="flex items-center gap-2">
              {data.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? "w-6 bg-white" : "w-1.5 bg-white/20"
                  }`}
                  title={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10 flex items-center justify-center text-mutedText hover:text-white transition-all shadow-sm"
              title="Next Slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
