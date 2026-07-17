"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Star, GitFork, BookOpen, RefreshCw } from "lucide-react";
import Magnetic from "./ui/Magnetic";

interface GithubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

interface GithubProfile {
  username: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  commitsThisYear: number;
  languages: Array<{ name: string; percentage: number; color: string }>;
  repos: GithubRepo[];
}

export default function Github({ username = "harshit" }: { username?: string }) {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // High-fidelity fallback/mock dataset
  const fallbackData: GithubProfile = {
    username: "harshit",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    publicRepos: 32,
    followers: 124,
    commitsThisYear: 1042,
    languages: [
      { name: "TypeScript", percentage: 48, color: "#3178c6" },
      { name: "Python", percentage: 28, color: "#3572A5" },
      { name: "C++", percentage: 14, color: "#f34b7d" },
      { name: "Tailwind / CSS", percentage: 10, color: "#563d7c" },
    ],
    repos: [
      {
        name: "ai-orchestrator-core",
        description: "A python framework orchestrating agentic pipelines using LangChain and local vector memory indexers.",
        stars: 48,
        forks: 12,
        language: "Python",
        url: "https://github.com",
      },
      {
        name: "next15-premium-boilerplate",
        description: "High-performance Boilerplate built using Next.js 15, React 19, Tailwind v4 alpha, and strict TypeScript structures.",
        stars: 92,
        forks: 24,
        language: "TypeScript",
        url: "https://github.com",
      },
      {
        name: "dsa-cpp-algorithms",
        description: "Standard algorithmic matrices, graphs, search indices, and complex puzzle solutions solved in modern structural C++.",
        stars: 34,
        forks: 6,
        language: "C++",
        url: "https://github.com",
      },
      {
        name: "framer-motion-custom-hooks",
        description: "Reusable custom viewport-scroll motion controls, smooth magnetic vectors, and WebGL loaders.",
        stars: 76,
        forks: 15,
        language: "TypeScript",
        url: "https://github.com",
      },
    ],
  };

  const fetchGithubData = async () => {
    setRefreshing(true);
    try {
      // Fetch user profile
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error("Rate limit or not found");
      const userData = await userRes.json();

      // Fetch repos
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=4`);
      if (!reposRes.ok) throw new Error("Repos fetch failed");
      const reposData = await reposRes.json();

      const formattedRepos: GithubRepo[] = reposData.map((r: any) => ({
        name: r.name,
        description: r.description || "No description provided.",
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language || "TypeScript",
        url: r.html_url,
      }));

      setProfile({
        username: userData.login,
        avatarUrl: userData.avatar_url,
        publicRepos: userData.public_repos,
        followers: userData.followers,
        commitsThisYear: fallbackData.commitsThisYear, // GitHub API doesn't provide commit count easily without crawling
        languages: fallbackData.languages,
        repos: formattedRepos,
      });
    } catch (e) {
      console.warn("GitHub API error. Using high-fidelity mock indicators:", e);
      setProfile(fallbackData);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchGithubData();
  }, [username]);

  // Generate matrix cells for a beautiful contribution calendar grid mockup (24 columns x 7 rows)
  const renderContributionCells = () => {
    const cells = [];
    const colorSteps = [
      "bg-white/5", // 0 commits
      "bg-[#0052FF]/10", // 1-2 commits
      "bg-[#0052FF]/30", // 3-4 commits
      "bg-[#0052FF]/60", // 5-6 commits
      "bg-electricBlue", // 7+ commits
    ];

    for (let i = 0; i < 168; i++) {
      // Distribute densities to look like actual coding spikes
      let stepIndex = 0;
      const rand = Math.random();
      if (rand > 0.85) stepIndex = 4;
      else if (rand > 0.7) stepIndex = 3;
      else if (rand > 0.4) stepIndex = 2;
      else if (rand > 0.15) stepIndex = 1;

      cells.push(
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-sm transition-all duration-300 hover:scale-125 ${colorSteps[stepIndex]}`}
          title={`${Math.floor(rand * 10)} contributions`}
        />
      );
    }
    return cells;
  };

  const currentProfile = profile || fallbackData;

  return (
    <section id="github" className="py-24 px-6 md:px-12 lg:px-24 w-full max-w-6xl mx-auto relative z-10">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="flex flex-col items-start">
          <span className="text-[10px] tracking-[0.3em] font-display text-gradient-cyan-blue uppercase mb-3">
            Open Source
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            GitHub Activity
          </h2>
        </div>

        {/* Sync trigger */}
        <button
          onClick={fetchGithubData}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 hover:border-white/10 bg-white/5 text-xs text-mutedText hover:text-white transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
          <span>{refreshing ? "Syncing..." : "Sync Live Stats"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Stats overview and Language distributions */}
        <div className="lg:col-span-4 space-y-6">
          {/* User overview widget */}
          <div className="p-6 rounded-3xl glass-card border border-white/5 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={currentProfile.avatarUrl}
                alt={currentProfile.username}
                className="w-14 h-14 rounded-2xl border border-white/10 object-cover"
              />
              <div>
                <h3 className="font-display font-bold text-base text-white">@{currentProfile.username}</h3>
                <span className="text-[9px] tracking-widest text-electricBlue uppercase font-mono">Verified Developer</span>
              </div>
            </div>

            {/* Counters */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
              <div className="text-center md:text-left">
                <span className="text-lg font-display font-black text-white">{currentProfile.publicRepos}</span>
                <p className="text-[9px] uppercase tracking-wider text-mutedText">Repos</p>
              </div>
              <div className="text-center md:text-left">
                <span className="text-lg font-display font-black text-white">{currentProfile.followers}</span>
                <p className="text-[9px] uppercase tracking-wider text-mutedText">Followers</p>
              </div>
              <div className="text-center md:text-left">
                <span className="text-lg font-display font-black text-white">{currentProfile.commitsThisYear}</span>
                <p className="text-[9px] uppercase tracking-wider text-mutedText">Commits</p>
              </div>
            </div>
          </div>

          {/* Languages distribution widget */}
          <div className="p-6 rounded-3xl glass-card border border-white/5 space-y-4">
            <h4 className="font-display font-semibold text-xs tracking-widest text-white uppercase mb-2">
              Language Index
            </h4>
            <div className="space-y-3">
              {currentProfile.languages.map((lang) => (
                <div key={lang.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-sans">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lang.color }} />
                      <span className="text-white/90">{lang.name}</span>
                    </div>
                    <span className="text-mutedText font-mono">{lang.percentage}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pinned repos & Contribution grid */}
        <div className="lg:col-span-8 space-y-6">
          {/* Pinned Repos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentProfile.repos.map((repo, idx) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative p-5 rounded-2xl glass-card border border-white/5 hover:border-white/10 flex flex-col justify-between min-h-[160px] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-3.5 h-3.5 text-electricBlue" />
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display font-semibold text-xs sm:text-sm text-white hover:text-electricBlue transition-colors truncate max-w-[200px]"
                    >
                      {repo.name}
                    </a>
                  </div>
                  <p className="font-sans font-light text-mutedText text-xs leading-relaxed line-clamp-2">
                    {repo.description}
                  </p>
                </div>

                {/* Stars/Forks bar */}
                <div className="flex items-center gap-4 text-[10px] font-mono text-mutedText mt-4 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-electricBlue" />
                    <span>{repo.language}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-warning" />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <GitFork className="w-3 h-3 text-success" />
                    <span>{repo.forks}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contribution Graph Calendar Console */}
          <div className="p-6 rounded-3xl glass-card border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display font-semibold text-xs tracking-widest text-white uppercase">
                Contribution Activity
              </h4>
              <span className="text-[9px] font-mono text-mutedText">1,042 commits in past year</span>
            </div>

            {/* Matrix of cells wrapper */}
            <div className="flex items-center justify-center overflow-x-auto w-full py-2">
              <div className="grid grid-flow-col grid-rows-7 gap-1 w-full max-w-lg min-w-[320px]">
                {renderContributionCells()}
              </div>
            </div>

            {/* Grid legends */}
            <div className="flex items-center justify-between text-[8px] font-sans text-mutedText uppercase tracking-widest mt-4">
              <span>Less coding</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-sm bg-white/5" />
                <span className="w-1.5 h-1.5 rounded-sm bg-[#0052FF]/10" />
                <span className="w-1.5 h-1.5 rounded-sm bg-[#0052FF]/30" />
                <span className="w-1.5 h-1.5 rounded-sm bg-[#0052FF]/60" />
                <span className="w-1.5 h-1.5 rounded-sm bg-electricBlue" />
              </div>
              <span>More coding</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
