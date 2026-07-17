"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

function CountUp({ value, label, suffix = "", delay = 0 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000; // 2 seconds animation
    const incrementTime = Math.max(Math.floor(duration / end), 15);
    
    // Smooth stepping division if the value is very large
    const step = Math.ceil(end / (duration / incrementTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="p-8 rounded-3xl glass-card border border-white/5 flex flex-col items-center justify-center text-center group hover:border-white/10 transition-colors"
    >
      <div className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight mb-2 flex items-center justify-center">
        <span className="text-gradient-cyan-blue">
          {count.toLocaleString()}
        </span>
        <span className="text-electricBlue font-light">{suffix}</span>
      </div>
      <span className="font-sans font-light text-mutedText text-xs sm:text-sm tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
}

interface StatsData {
  projects: number;
  hoursLearning: number;
  technologies: number;
  futureClients: number;
  githubContributions: number;
}

export default function Stats({ data }: { data: StatsData }) {
  return (
    <section id="stats" className="py-24 px-6 md:px-12 lg:px-24 w-full max-w-6xl mx-auto relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        <CountUp value={data.projects} label="Projects Built" suffix="+" />
        <CountUp value={data.hoursLearning} label="Learning Hours" suffix="+" />
        <CountUp value={data.technologies} label="Tech Stack" />
        <CountUp value={data.futureClients} label="Target Clients" suffix="+" />
        <div className="col-span-2 md:col-span-1">
          <CountUp value={data.githubContributions} label="Commits Made" suffix="+" />
        </div>
      </div>
    </section>
  );
}
