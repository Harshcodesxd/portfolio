"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import Link from "next/link";
import HeroCanvas from "./HeroCanvas";
import Magnetic from "./ui/Magnetic";

interface HeroData {
  name: string;
  rotatingTitles: string[];
  description: string;
  ctaText: string;
  ctaLink: string;
  socialLinks: Array<{ platform: string; url: string; username: string }>;
}

export default function Hero({ data }: { data: HeroData }) {
  const [index, setIndex] = useState(0);

  // Mouse coords relative to card container for 3D tilt
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-200, 200], [10, -10]);
  const rotateY = useTransform(x, [-200, 200], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.rotatingTitles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [data.rotatingTitles.length]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden bg-[#09090B]"
    >
      {/* 3D WebGL Canvas */}
      <HeroCanvas />

      {/* Grid overlay mask to make text pop */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-[#09090B]/30 to-[#09090B] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left side text column */}
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          {/* Subheader Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-6 shadow-premium"
          >
            <span className="w-2 h-2 rounded-full bg-softCyan animate-pulse" />
            <span className="text-[10px] tracking-[0.25em] font-display text-white/80 uppercase font-medium">
              Open to Opportunities
            </span>
          </motion.div>

          {/* Main Display Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tight text-white select-none leading-none mb-4"
          >
            {data.name}
          </motion.h1>

          {/* Rotating Titles Container */}
          <div className="h-10 sm:h-12 md:h-14 overflow-hidden mb-6 relative w-full">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="absolute text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-light text-gradient-cyan-purple tracking-wide"
              >
                {data.rotatingTitles[index]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Sub description / Professional Value Prop */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-xl font-sans font-light text-mutedText text-sm sm:text-base leading-relaxed mb-8"
          >
            Building fast, scalable, and beautiful digital experiences. Architecting intelligent systems and high-fidelity interfaces.
          </motion.p>

          {/* CTA Buttons: View Projects and Download Resume */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Magnetic range={50} strength={0.25}>
              <Link
                href="#projects"
                className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-electricBlue to-royalPurple text-white font-display font-semibold text-xs sm:text-sm tracking-wider flex items-center gap-2 overflow-hidden shadow-glowBlue transition-all duration-300"
              >
                <span>View Projects</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </Link>
            </Magnetic>

            <Magnetic range={50} strength={0.25}>
              <a
                href="/resume.pdf"
                download="Harshit_Resume.pdf"
                className="group px-8 py-3.5 rounded-full border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-md text-white font-display font-medium text-xs sm:text-sm tracking-wider flex items-center gap-2 transition-colors"
              >
                <span>Download Resume</span>
                <Download className="w-3.5 h-3.5 text-mutedText group-hover:text-white transition-colors" />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right side portrait interactive glass card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex justify-center perspective"
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY }}
            className="relative w-72 h-96 sm:w-80 sm:h-[420px] rounded-[32px] glass-card overflow-hidden group cursor-pointer shadow-premium"
          >
            {/* Hover card glow tracker */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,_50%)_var(--mouse-y,_50%),rgba(59,130,246,0.15)_0%,transparent_60%)] pointer-events-none z-0" />
            
            {/* Ambient gradients */}
            <div className="absolute inset-0 bg-gradient-to-tr from-electricBlue/10 via-royalPurple/5 to-softCyan/10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Visual vector graphic response */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none z-10">
              <div className="absolute w-48 h-48 rounded-full border border-dashed border-white/5 animate-spin-slow" />
              <div className="absolute w-36 h-36 rounded-full border border-double border-white/5 animate-spin-slow [animation-direction:reverse]" />
              
              <div className="z-10 flex flex-col items-center">
                <span className="text-[10px] tracking-[0.3em] font-display text-mutedText uppercase mb-2">Systems Online</span>
                
                {/* Visual core */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-electricBlue to-royalPurple flex items-center justify-center text-white font-display text-2xl font-bold shadow-glowBlue transition-transform duration-500 group-hover:scale-110">
                  H
                </div>
                
                <div className="mt-6 text-xs text-white/80 font-display uppercase tracking-widest">Harshit.dev</div>
                <div className="text-[9px] text-mutedText font-mono mt-1">LATENCY: 12ms // STABLE</div>
              </div>
            </div>
            
            {/* Diagonal scanner beam */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[100%] bg-gradient-to-b from-white/5 to-transparent rotate-[35deg] pointer-events-none transform -translate-y-full group-hover:translate-y-[200%] transition-transform duration-[1.8s] ease-out" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Socials & Scroll Indicator */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between border-t border-white/5 pt-8 mt-12 md:mt-0">
        {/* Social Links: GitHub, LinkedIn, Email */}
        <div className="flex items-center gap-4">
          {data.socialLinks.map((social) => {
            const Icon = social.platform === "GitHub" ? Github : social.platform === "LinkedIn" ? Linkedin : Mail;
            const targetUrl = social.platform === "Instagram" ? "mailto:harshit@dev.com" : social.url;
            return (
              <Magnetic key={social.platform} range={30} strength={0.3}>
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/5 hover:border-white/20 bg-white/5 flex items-center justify-center text-mutedText hover:text-white transition-colors shadow-sm"
                >
                  <Icon className="w-4.5 h-4.5" />
                </a>
              </Magnetic>
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex items-center gap-2 text-[10px] tracking-[0.2em] font-display text-mutedText uppercase cursor-pointer"
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span>Scroll Down</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </div>
    </section>
  );
}
