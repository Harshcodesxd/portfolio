import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Monitor, ShieldCheck, Zap, AlertCircle } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import Magnetic from "@/components/ui/Magnetic";

export const dynamic = "force-dynamic";

interface ProjectItem {
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  longDescription: string;
  tech: string[];
  link: string;
  github: string;
  keyFeatures?: string[];
  challengesSolved?: string;
  performanceHighlights?: string[];
}

async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "db.json");
    const rawData = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(rawData);
    const project = data.projects.find((p: ProjectItem) => p.slug === slug);
    return project || null;
  } catch (error) {
    console.error("Error reading db.json for project slug:", error);
    return null;
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#09090B] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 relative z-10 max-w-5xl mx-auto">
      {/* Back Button */}
      <div className="mb-12">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 group text-xs tracking-widest uppercase font-display text-mutedText hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Project Title Block */}
      <div className="flex flex-col items-start mb-10">
        <span className="text-[10px] tracking-[0.3em] font-display text-gradient-cyan-purple uppercase mb-3">
          {project.category}
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight mb-4 leading-none">
          {project.name}
        </h1>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[9px] tracking-wider uppercase font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-white/80"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Large Featured Image */}
      <div className="relative rounded-[32px] overflow-hidden aspect-video border border-white/5 shadow-premium mb-16 group">
        <img
          src={project.image}
          alt={project.name}
          className="object-cover w-full h-full transform scale-100 group-hover:scale-[1.01] transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/60 to-transparent" />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left column: Case Study Details */}
        <div className="md:col-span-8 space-y-10">
          {/* Overview */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-xl text-white pb-2 border-b border-white/5">
              Project Overview
            </h2>
            <p className="font-sans font-light text-mutedText text-sm sm:text-base leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-white pb-2 border-b border-white/5">
                Key Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-4 rounded-xl border border-white/5 bg-white/5">
                    <ShieldCheck className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span className="font-sans font-light text-xs sm:text-sm text-mutedText leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges Solved */}
          {project.challengesSolved && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-white pb-2 border-b border-white/5">
                Engineering Challenges
              </h3>
              <div className="p-6 rounded-2xl border border-white/5 bg-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent pointer-events-none" />
                <div className="flex items-start gap-3 relative z-10">
                  <AlertCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono tracking-widest text-mutedText uppercase">Resolution Strategy</span>
                    <p className="font-sans font-light text-mutedText text-xs sm:text-sm leading-relaxed">
                      {project.challengesSolved}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Performance Highlights */}
          {project.performanceHighlights && project.performanceHighlights.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-white pb-2 border-b border-white/5">
                Performance Optimization
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.performanceHighlights.map((perf, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-white/5 bg-white/5 flex flex-col justify-between min-h-[100px]">
                    <Zap className="w-4 h-4 text-warning mb-3" />
                    <span className="font-sans text-xs text-white/90 font-medium">
                      {perf}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right specifications column */}
        <div className="md:col-span-4 space-y-8">
          {/* External Links */}
          <div className="p-6 rounded-3xl glass-card border border-white/5 space-y-4 shadow-premium">
            <h3 className="font-display font-bold text-sm text-white mb-4">Project Links</h3>
            
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 text-xs font-display tracking-wider uppercase text-white transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-electricBlue" />
                <span>Live Preview</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 text-xs font-display tracking-wider uppercase text-white transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-royalPurple" />
                <span>Source Code</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Project Details Panel */}
          <div className="p-6 rounded-3xl glass-card border border-white/5 space-y-4 shadow-premium">
            <h3 className="font-display font-bold text-sm text-white mb-4">Specifications</h3>
            
            <div className="flex items-center justify-between text-[11px] font-sans pb-3 border-b border-white/5 text-mutedText">
              <span>Timeline:</span>
              <span className="text-white">Active</span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-sans pb-3 border-b border-white/5 text-mutedText">
              <span>Category:</span>
              <span className="text-white">{project.category}</span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-sans text-mutedText">
              <span>Developer:</span>
              <span className="text-white">Harshit</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
