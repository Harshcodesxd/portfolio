"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";

interface RoadmapItem {
  name: string;
  status: "Completed" | "Learning" | "Planned";
  progress: number;
  category: string;
  icon: string;
}

export default function Roadmap({ data }: { data: RoadmapItem[] }) {
  // Dynamically load lucide icons helper
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Code;
    return <IconComponent className="w-5 h-5" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-[#00FF66] bg-[#00FF66]/10 border-[#00FF66]/20";
      case "Learning":
        return "text-softCyan bg-softCyan/10 border-softCyan/20";
      default:
        return "text-mutedText bg-white/5 border-white/10";
    }
  };

  const getGlowColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "shadow-[0_0_15px_rgba(0,255,102,0.15)]";
      case "Learning":
        return "shadow-[0_0_15px_rgba(6,182,212,0.15)]";
      default:
        return "";
    }
  };

  return (
    <section id="roadmap" className="py-24 px-6 md:px-12 lg:px-24 w-full max-w-6xl mx-auto relative z-10">
      {/* Title */}
      <div className="flex flex-col items-center text-center mb-20">
        <span className="text-[10px] tracking-[0.3em] font-display text-gradient-cyan-purple uppercase mb-3">
          Roadmap
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
          Learning Journey
        </h2>
        <p className="text-mutedText max-w-lg mt-4 font-sans font-light text-sm">
          A visual record of technology competencies completed, currently in focus, and planned for future systems development.
        </p>
      </div>

      {/* Roadmap Timeline Track */}
      <div className="relative">
        {/* Center line for desktop */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2" />

        <div className="space-y-12">
          {data.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                key={item.name}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row-reverse" : ""
                } justify-between w-full`}
              >
                {/* Node Center Circle Indicator */}
                <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#050505] border-2 border-white/20 z-10 flex items-center justify-center">
                  <motion.div
                    animate={
                      item.status === "Learning"
                        ? { scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }
                        : {}
                    }
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.status === "Completed"
                        ? "bg-[#00FF66]"
                        : item.status === "Learning"
                        ? "bg-softCyan"
                        : "bg-mutedText"
                    }`}
                  />
                </div>

                {/* Left/Right content wrappers */}
                <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${isEven ? "md:text-right md:pr-8" : "md:pl-8"}`}>
                  <div
                    className={`group relative p-6 rounded-2xl glass-card border border-white/5 hover:border-white/15 transition-all duration-300 ${getGlowColor(
                      item.status
                    )}`}
                  >
                    {/* Header info */}
                    <div
                      className={`flex items-center gap-3 mb-4 ${
                        isEven ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-300">
                        {renderIcon(item.icon)}
                      </div>
                      <div className={isEven ? "md:text-right" : "text-left"}>
                        <h4 className="font-display font-semibold text-sm sm:text-base text-white group-hover:text-gradient-cyan-blue transition-all duration-300">
                          {item.name}
                        </h4>
                        <span className="text-[9px] tracking-wider font-sans uppercase text-mutedText">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Progress details */}
                    <div className="space-y-3">
                      <div
                        className={`flex items-center justify-between text-[10px] font-sans ${
                          isEven ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <span className={`px-2 py-0.5 rounded-full border text-[9px] font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        <span className="text-white/80 font-mono font-medium">{item.progress}%</span>
                      </div>

                      {/* Progress Line */}
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                          className={`h-full ${
                            item.status === "Completed"
                              ? "bg-gradient-to-r from-electricBlue to-[#00FF66]"
                              : "bg-gradient-to-r from-electricBlue to-softCyan"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty buffer box for opposite desktop column */}
                <div className="hidden md:block md:w-[45%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
