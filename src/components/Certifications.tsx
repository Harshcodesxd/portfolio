"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, ShieldCheck } from "lucide-react";
import Magnetic from "./ui/Magnetic";

interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  id: string;
  link: string;
}

export default function Certifications({ data }: { data: CertificationItem[] }) {
  return (
    <section id="certifications" className="py-24 px-6 md:px-12 lg:px-24 w-full max-w-6xl mx-auto relative z-10">
      {/* Title */}
      <div className="flex flex-col items-start mb-16">
        <span className="text-[10px] tracking-[0.3em] font-display text-gradient-blue-purple uppercase mb-3">
          Credentials
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
          Certifications
        </h2>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative p-6 rounded-2xl glass-card border border-white/5 hover:border-white/10 hover:shadow-premium flex flex-col justify-between min-h-[200px] transition-all duration-300"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-electricBlue/5 to-royalPurple/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none" />

            <div>
              {/* Top Row: Icon & Date */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-royalPurple group-hover:scale-105 transition-transform duration-300">
                  <Award className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-mutedText font-sans">
                  <Calendar className="w-3 h-3" />
                  <span>{cert.date}</span>
                </div>
              </div>

              {/* Title & Issuer */}
              <h3 className="font-display font-semibold text-sm sm:text-base text-white mb-1 group-hover:text-gradient-cyan-blue transition-all duration-300">
                {cert.name}
              </h3>
              <p className="font-sans font-light text-mutedText text-xs mb-4">
                {cert.issuer}
              </p>
            </div>

            {/* Bottom Row: Credential ID and Link */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-mutedText">
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
                <span>ID: {cert.id}</span>
              </div>

              <Magnetic range={30} strength={0.3}>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] font-display uppercase tracking-widest text-white hover:text-gradient-cyan-blue transition-all"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
