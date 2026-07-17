"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/ui/BrandIcons";
import Magnetic from "./ui/Magnetic";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 w-full border-t border-white/5 bg-[#09090B] pt-16 pb-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        {/* Left Side: Brand Logo */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 group mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-electricBlue to-royalPurple flex items-center justify-center font-display font-bold text-sm text-white shadow-glowBlue">
              H
            </div>
            <span className="font-display font-medium text-sm tracking-widest text-white/90">
              HARSHIT
            </span>
          </div>
          <p className="max-w-xs font-sans font-light text-mutedText text-xs leading-relaxed">
            AI Engineer in Progress, Full-Stack Developer, and Freelancer. Designing clean, premium experiences.
          </p>
        </div>

        {/* Right Side: Links & Socials */}
        <div className="flex items-center gap-8 text-xs font-display tracking-widest uppercase text-mutedText">
          <Link href="/#about" className="hover:text-white transition-colors">About</Link>
          <Link href="/#projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/admin" className="hover:text-white transition-colors text-electricBlue/70">Console</Link>
        </div>
      </div>

      {/* Bottom row: Copyright & Back to Top */}
      <div className="max-w-6xl mx-auto flex items-center justify-between border-t border-white/5 pt-8 text-[10px] tracking-[0.2em] font-sans text-mutedText">
        <span>&copy; {new Date().getFullYear()} HARSHIT. ALL RIGHTS RESERVED.</span>
        
        <Magnetic range={30} strength={0.3}>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white hover:text-gradient-cyan-blue transition-all"
          >
            <span>Back To Top</span>
            <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </Magnetic>
      </div>
    </footer>
  );
}
