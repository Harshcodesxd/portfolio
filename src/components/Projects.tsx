"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Search, ExternalLink, ShieldCheck, Zap } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import Magnetic from "./ui/Magnetic";

interface ProjectItem {
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
  featured?: boolean;
}

function ProjectCard({ project }: { project: ProjectItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [7, -7]);
  const rotateY = useTransform(x, [-150, 150], [-7, 7]);

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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className="group relative rounded-3xl glass-card overflow-hidden border border-white/5 flex flex-col justify-between transition-shadow duration-300 hover:shadow-premium select-none h-full"
    >
      <Link href={`/projects/${project.slug}`} className="block relative aspect-video w-full overflow-hidden cursor-pointer">
        {/* Background image */}
        <img
          src={project.image}
          alt={project.name}
          className="object-cover w-full h-full transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
        
        {/* Top-Right details overlay */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4" />
        </div>

        {/* Category banner */}
        <div className="absolute bottom-4 left-4">
          <span className="text-[9px] font-display uppercase tracking-widest text-softCyan bg-black/40 backdrop-blur-md px-2 py-0.5 rounded border border-white/5">
            {project.category}
          </span>
        </div>
      </Link>

      {/* Metadata content */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-electricBlue transition-colors">
            {project.name}
          </h3>
          <p className="font-sans font-light text-mutedText text-xs leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="space-y-4">
          {/* Tech stack tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[8px] tracking-widest uppercase font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/70"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <Link
              href={`/projects/${project.slug}`}
              className="text-[10px] font-display uppercase tracking-widest text-white hover:underline flex items-center gap-1"
            >
              <span>Explore Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mutedText hover:text-white transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mutedText hover:text-white transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ data }: { data: ProjectItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "AI Web Apps", "React Applications", "Dashboard", "Future SaaS Products"];

  // Find the featured project (or fall back to first project)
  const featuredProject = data.find((p) => p.featured) || data[0];
  // Filter rest of the projects
  const secondaryProjects = data.filter((p) => p.slug !== featuredProject.slug);

  const filterProjectFn = (p: ProjectItem) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  };

  const filteredSecondary = secondaryProjects.filter(filterProjectFn);
  const showFeatured = filterProjectFn(featuredProject);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 w-full max-w-6xl mx-auto relative z-10">
      {/* Section header & filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="flex flex-col items-start">
          <span className="text-[10px] tracking-[0.3em] font-display text-gradient-cyan-blue uppercase mb-3">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Selected Works
          </h2>
        </div>

        {/* Search bar & Filter pills */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Search bar */}
          <div className="relative w-full sm:w-60">
            <input
              type="text"
              placeholder="Search stack/names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 bg-white/5 border border-white/5 focus:border-electricBlue rounded-full text-xs text-white focus:outline-none transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-mutedText absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-md w-full sm:w-auto overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-3.5 py-1.5 rounded-full font-display text-[9px] tracking-widest uppercase transition-colors duration-300 ${
                  activeCategory === cat ? "text-[#09090B] font-semibold" : "text-mutedText hover:text-white"
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="active-project-filter"
                    className="absolute inset-0 bg-white rounded-full z-[-1]"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid structure */}
      <div className="space-y-12">
        {/* Featured Project Section */}
        {showFeatured && activeCategory === "All" && searchQuery === "" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative rounded-3xl glass-card overflow-hidden border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6 min-h-[380px] shadow-premium"
          >
            {/* Ambient glows inside card */}
            <div className="absolute inset-0 bg-gradient-to-r from-electricBlue/5 to-transparent pointer-events-none" />

            {/* Banner visual column */}
            <div className="lg:col-span-7 relative overflow-hidden aspect-video lg:aspect-auto">
              <img
                src={featuredProject.image}
                alt={featuredProject.name}
                className="object-cover w-full h-full transform scale-100 group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#09090B] via-transparent to-transparent opacity-90" />
              
              {/* Highlight Tag */}
              <div className="absolute top-6 left-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] backdrop-blur-md">
                <Zap className="w-3.5 h-3.5 animate-pulse" />
                <span className="text-[9px] tracking-widest font-display font-semibold uppercase">Featured Architecture</span>
              </div>
            </div>

            {/* Banner description column */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between relative z-10">
              <div>
                <span className="text-[9px] font-display uppercase tracking-widest text-softCyan mb-1.5 block">
                  {featuredProject.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white mb-4">
                  {featuredProject.name}
                </h3>
                <p className="font-sans font-light text-mutedText text-xs sm:text-sm leading-relaxed mb-6">
                  {featuredProject.description}
                </p>
              </div>

              <div className="space-y-6">
                {/* Tech tag loops */}
                <div className="flex flex-wrap gap-1.5">
                  {featuredProject.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] tracking-widest uppercase font-mono px-3 py-1 rounded bg-white/5 border border-white/5 text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* External Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <Link
                    href={`/projects/${featuredProject.slug}`}
                    className="group relative px-6 py-2.5 rounded-full bg-white text-[#09090B] font-display font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-all hover:bg-white/95"
                  >
                    <span>View Project Specifications</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-4 text-mutedText hover:text-white">
                    <a href={featuredProject.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5 hover:text-white transition-colors" />
                    </a>
                    <a href={featuredProject.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5 hover:text-white transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Secondary projects grid list */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredSecondary.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                key={project.slug}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
