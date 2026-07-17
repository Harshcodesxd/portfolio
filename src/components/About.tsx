"use client";

import { motion } from "framer-motion";
import { Brain, Code, Cpu, Sparkles, Terminal, Video, Target, Compass, Heart } from "lucide-react";

interface AboutData {
  story: string;
  highlights: string[];
}

export default function About({ data }: { data: AboutData }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-24 w-full max-w-6xl mx-auto relative z-10">
      {/* Section Title */}
      <div className="flex flex-col items-start mb-16">
        <span className="text-[10px] tracking-[0.3em] font-display text-gradient-cyan-blue uppercase mb-3">
          Behind the Code
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
          Harshit's Story
        </h2>
      </div>

      {/* Bento Grid Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Core Narrative - Span 2 Columns */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 rounded-3xl glass-card p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-electricBlue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex items-center justify-between mb-6">
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/5">
              <Code className="w-5 h-5 text-electricBlue" />
            </div>
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-mutedText">01 // Identity</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">
              Building the Future with Code & Intelligence
            </h3>
            <p className="font-sans font-light text-mutedText text-sm sm:text-base leading-relaxed">
              {data.story}
            </p>
          </div>
        </motion.div>

        {/* AI & Machine Learning block */}
        <motion.div
          variants={itemVariants}
          className="rounded-3xl glass-card p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-royalPurple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex items-center justify-between mb-6">
            <div className="w-10 h-10 rounded-2xl bg-electricBlue/10 flex items-center justify-center text-electricBlue shadow-glowBlue border border-electricBlue/5">
              <Brain className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-mutedText">02 // Core Focus</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-display font-bold text-white mb-2">Artificial Intelligence</h3>
            <p className="font-sans font-light text-mutedText text-xs leading-relaxed">
              Deep interest in machine learning pipelines, LLM model integration, agentic frameworks, and smart automation to turn static web apps into sentient tools.
            </p>
          </div>
        </motion.div>

        {/* DSA C++ block */}
        <motion.div
          variants={itemVariants}
          className="rounded-3xl glass-card p-8 flex flex-col justify-between min-h-[300px] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-softCyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex items-center justify-between mb-6">
            <div className="w-10 h-10 rounded-2xl bg-royalPurple/10 flex items-center justify-center text-royalPurple border border-royalPurple/5">
              <Terminal className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-mutedText">03 // Algorithms</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-display font-bold text-white mb-2">C++ DSA</h3>
            <p className="font-sans font-light text-mutedText text-xs leading-relaxed">
              Applying logical patterns, complex structure solving, and data structures to ensure high computational speed and backend algorithmic efficiency.
            </p>
          </div>
        </motion.div>

        {/* Graphic & Video Design with AI */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 rounded-3xl glass-card p-8 flex flex-col justify-between min-h-[300px] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-electricBlue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-softCyan/10 flex items-center justify-center text-softCyan border border-softCyan/5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/5">
                <Video className="w-4 h-4" />
              </div>
            </div>
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-mutedText">04 // AI Creativity</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">
              AI-Driven Design & Video Editing
            </h3>
            <p className="font-sans font-light text-mutedText text-sm leading-relaxed">
              Pushing the boundaries of branding by blending traditional creative tools with generative AI suites (Midjourney, Runway, Photoshop Firefly). Empowering companies with high-conversion motion designs, graphic identities, and engaging video promotions.
            </p>
          </div>
        </motion.div>

        {/* Mission and Core Values block */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3 rounded-3xl glass-card p-8 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-electricBlue/5 to-royalPurple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Core Value 1: Precision */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-electricBlue border border-white/5">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm text-white">Absolute Precision</h4>
              <p className="font-sans font-light text-mutedText text-xs leading-relaxed">
                Writing clean, self-documenting code with strict types and optimal efficiency parameters.
              </p>
            </div>

            {/* Core Value 2: Integrity */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary border border-white/5">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm text-white">Ethical Architecture</h4>
              <p className="font-sans font-light text-mutedText text-xs leading-relaxed">
                Structuring secure databases, protecting user endpoints, and planning models with ethical limits.
              </p>
            </div>

            {/* Core Value 3: Passion */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-softCyan border border-white/5">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm text-white">Visual Aesthetics</h4>
              <p className="font-sans font-light text-mutedText text-xs leading-relaxed">
                Designing elegant interface grids with fluid responsiveness and delightful micro-animations.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key objectives block */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3 rounded-3xl glass-card p-8"
        >
          <h3 className="text-xl font-display font-bold text-white mb-6">Key Objectives</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-white shrink-0 mt-0.5 font-mono">
                  {idx + 1}
                </div>
                <span className="font-sans text-xs sm:text-sm text-mutedText font-light">{highlight}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
