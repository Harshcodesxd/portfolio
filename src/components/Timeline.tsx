"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, Rocket, Calendar } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  type: string;
}

export default function Timeline({ data }: { data: TimelineItem[] }) {
  const getIcon = (type: string) => {
    switch (type) {
      case "past":
        return <Award className="w-4 h-4 text-electricBlue" />;
      case "present":
        return <Briefcase className="w-4 h-4 text-royalPurple" />;
      default:
        return <Rocket className="w-4 h-4 text-softCyan" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case "past":
        return "border-electricBlue/30 text-electricBlue bg-electricBlue/5";
      case "present":
        return "border-royalPurple/30 text-royalPurple bg-royalPurple/5";
      default:
        return "border-softCyan/30 text-softCyan bg-softCyan/5";
    }
  };

  return (
    <section id="timeline" className="py-24 px-6 md:px-12 lg:px-24 w-full max-w-4xl mx-auto relative z-10">
      {/* Title */}
      <div className="flex flex-col items-start mb-20">
        <span className="text-[10px] tracking-[0.3em] font-display text-gradient-cyan-purple uppercase mb-3">
          Chronology
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
          Timeline & Vision
        </h2>
      </div>

      {/* Timeline track */}
      <div className="relative border-l border-white/5 pl-8 ml-4 space-y-16">
        {data.map((item, idx) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            key={idx}
            className="relative group"
          >
            {/* Timeline anchor circle icon */}
            <div className={`absolute -left-[49px] top-1.5 w-8 h-8 rounded-full border flex items-center justify-center z-10 shadow-premium group-hover:scale-110 transition-transform duration-300 ${getBorderColor(
              item.type
            )}`}>
              {getIcon(item.type)}
            </div>

            {/* Content card */}
            <div className="p-6 rounded-2xl glass-card border border-white/5 hover:border-white/10 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <Calendar className="w-3.5 h-3.5 text-mutedText" />
                <span className="font-display font-bold text-xs tracking-wider text-mutedText">
                  {item.year}
                </span>
              </div>
              <h3 className="font-display font-semibold text-base sm:text-lg text-white mb-2 relative z-10 group-hover:text-gradient-cyan-blue transition-all duration-300">
                {item.title}
              </h3>
              <p className="font-sans font-light text-mutedText text-xs sm:text-sm leading-relaxed relative z-10">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
