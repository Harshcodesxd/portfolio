"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Server, Terminal, Database, Wrench, CheckCircle2 } from "lucide-react";

interface SkillItem {
  name: string;
  level: string;
  percentage: number;
}

export default function Skills({ data }: { data: SkillItem[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Group skills into the five requested buckets
  const categories = [
    {
      title: "Frontend",
      icon: <Code2 className="w-5 h-5 text-electricBlue" />,
      skills: ["React / Next.js", "Tailwind CSS", "UI Design & Motion Graphics", "Frontend Development"],
    },
    {
      title: "Backend",
      icon: <Server className="w-5 h-5 text-royalPurple" />,
      skills: ["Node.js & Express", "REST API Integration", "Performance Optimization", "Backend Development"],
    },
    {
      title: "Programming",
      icon: <Terminal className="w-5 h-5 text-softCyan" />,
      skills: ["JavaScript", "TypeScript", "Python Development", "C++ DSA"],
    },
    {
      title: "Database",
      icon: <Database className="w-5 h-5 text-success" />,
      skills: ["PostgreSQL Database", "MongoDB & NoSQL", "Prisma ORM"],
    },
    {
      title: "Tools",
      icon: <Wrench className="w-5 h-5 text-warning" />,
      skills: ["Git & Git workflows", "Graphic & Video Design with AI", "Artificial Intelligence & ML"],
    },
  ];

  const getSkillData = (name: string) => {
    return data.find((s) => s.name === name) || { level: "Intermediate", percentage: 70 };
  };

  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 w-full max-w-6xl mx-auto relative z-10">
      {/* Title */}
      <div className="flex flex-col items-start mb-16">
        <span className="text-[10px] tracking-[0.3em] font-display text-gradient-blue-purple uppercase mb-3">
          Capabilities
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
          Technical Stack
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {categories.map((cat, catIdx) => (
          <div key={cat.title} className="flex flex-col">
            {/* Category header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                {cat.icon}
              </div>
              <h3 className="font-display font-bold text-sm text-white">{cat.title}</h3>
            </div>

            {/* Skills tiles list */}
            <div className="space-y-3">
              {cat.skills.map((skillName, idx) => {
                const skill = getSkillData(skillName);
                const globalIdx = catIdx * 10 + idx;

                return (
                  <div
                    key={skillName}
                    onMouseEnter={() => setHoveredIndex(globalIdx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group relative p-4 rounded-xl glass-card border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden"
                  >
                    {/* Background glow hover effect */}
                    <div
                      className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    />

                    <div className="relative z-10 flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-electricBlue/70 shrink-0" />
                        <span className="font-display font-medium text-xs text-white/95 group-hover:text-white transition-colors duration-200 truncate">
                          {skillName}
                        </span>
                      </div>
                    </div>

                    {/* Progress slider bar */}
                    <div className="relative z-10 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-electricBlue to-softCyan"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
