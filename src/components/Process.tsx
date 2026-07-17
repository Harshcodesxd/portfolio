"use client";

import { motion } from "framer-motion";
import { ArrowRight, Compass, Edit3, Cpu, Eye, CloudLightning } from "lucide-react";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export default function Process({ data }: { data: ProcessStep[] }) {
  const getIcon = (step: string) => {
    switch (step) {
      case "01":
        return <Compass className="w-5 h-5 text-electricBlue" />;
      case "02":
        return <Edit3 className="w-5 h-5 text-secondary" />;
      case "03":
        return <Cpu className="w-5 h-5 text-softCyan" />;
      case "04":
        return <Eye className="w-5 h-5 text-warning" />;
      default:
        return <CloudLightning className="w-5 h-5 text-success" />;
    }
  };

  const getGlowColor = (step: string) => {
    switch (step) {
      case "01":
        return "hover:shadow-glowBlue hover:border-electricBlue/20";
      case "02":
        return "hover:shadow-glowPurple hover:border-secondary/20";
      case "03":
        return "hover:shadow-glowCyan hover:border-softCyan/20";
      default:
        return "hover:shadow-premium hover:border-white/10";
    }
  };

  return (
    <section id="process" className="py-24 px-6 md:px-12 lg:px-24 w-full max-w-6xl mx-auto relative z-10">
      {/* Title block */}
      <div className="flex flex-col items-center text-center mb-20">
        <span className="text-[10px] tracking-[0.3em] font-display text-gradient-cyan-purple uppercase mb-3">
          Methodology
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
          How I Work
        </h2>
        <p className="text-mutedText max-w-lg mt-4 font-sans font-light text-sm">
          A disciplined, production-first approach designed to yield high-converting and exceptionally performant software models.
        </p>
      </div>

      {/* Visual horizontal/vertical workflow nodes */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
        {data.map((item, idx) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className={`group p-6 rounded-2xl glass-card flex flex-col justify-between min-h-[220px] relative border border-white/5 transition-all duration-300 ${getGlowColor(
              item.step
            )}`}
          >
            {/* Step Counter */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                {getIcon(item.step)}
              </div>
              <span className="text-[10px] font-mono tracking-widest text-mutedText">
                [{item.step}]
              </span>
            </div>

            {/* Step Content */}
            <div>
              <h3 className="font-display font-semibold text-base text-white mb-2 group-hover:text-gradient-cyan-blue transition-colors duration-300">
                {item.title}
              </h3>
              <p className="font-sans font-light text-mutedText text-xs leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Connecting Chevron Arrow for Desktop (omit for the last step) */}
            {idx < data.length - 1 && (
              <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-3.5 z-20 text-white/10 group-hover:text-white/20 transition-colors duration-300">
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
