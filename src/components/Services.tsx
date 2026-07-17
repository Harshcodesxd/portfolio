"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export default function Services({ data }: { data: ServiceItem[] }) {
  const renderIcon = (iconName: string, color: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent className={`w-6 h-6 ${color}`} />;
  };

  const getColors = (idx: number) => {
    switch (idx % 3) {
      case 0:
        return { border: "hover:border-electricBlue/25", glow: "hover:shadow-glowBlue", iconText: "text-electricBlue" };
      case 1:
        return { border: "hover:border-royalPurple/25", glow: "hover:shadow-glowPurple", iconText: "text-royalPurple" };
      default:
        return { border: "hover:border-softCyan/25", glow: "hover:shadow-glowCyan", iconText: "text-softCyan" };
    }
  };

  return (
    <section id="services" className="py-24 px-6 md:px-12 lg:px-24 w-full max-w-6xl mx-auto relative z-10">
      {/* Title */}
      <div className="flex flex-col items-center text-center mb-20">
        <span className="text-[10px] tracking-[0.3em] font-display text-gradient-cyan-purple uppercase mb-3">
          Offerings
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
          Freelance Services
        </h2>
        <p className="text-mutedText max-w-lg mt-4 font-sans font-light text-sm">
          Bridging advanced backend intelligence with elegant user flows. Engineered to load instantly, rank on Google, and impress visitors.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((service, idx) => {
          const colors = getColors(idx);

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={service.id}
              className={`group p-8 rounded-3xl glass-card flex flex-col justify-between min-h-[260px] border border-white/5 transition-all duration-300 ${colors.border} ${colors.glow}`}
            >
              {/* Top Row: Icon and ID */}
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  {renderIcon(service.icon, colors.iconText)}
                </div>
                <span className="text-[10px] tracking-wider font-mono text-mutedText">
                  [0{idx + 1}]
                </span>
              </div>

              {/* Bottom Row: Text Details */}
              <div>
                <h3 className="font-display font-semibold text-lg sm:text-xl text-white mb-3 group-hover:text-gradient-cyan-blue transition-all duration-300">
                  {service.name}
                </h3>
                <p className="font-sans font-light text-mutedText text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
