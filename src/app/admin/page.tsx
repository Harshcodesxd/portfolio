"use client";

import React, { useState, useEffect } from "react";
import { Lock, Save, Plus, Trash2, Edit3, Settings, Briefcase, FileText, CheckCircle2, ChevronRight, Eye } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Hero & SEO");
  const [successMsg, setSuccessMsg] = useState("");
  const [dbData, setDbData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load database on mount
  useEffect(() => {
    fetch("/api/admin")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setDbData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // Check localStorage session
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken === "harshit123") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "harshit123") {
      localStorage.setItem("admin_token", password);
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid secret token access key.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: JSON.stringify(dbData),
      });

      const result = await response.json();
      if (result.success) {
        setSuccessMsg("Database payload synchronized successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        alert("Sync error: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Network synchronization failed.");
    }
  };

  // Helper inputs modifiers
  const updateHeroField = (key: string, value: any) => {
    setDbData((prev: any) => ({
      ...prev,
      hero: { ...prev.hero, [key]: value },
    }));
  };

  const updateSettingsField = (key: string, value: any) => {
    setDbData((prev: any) => ({
      ...prev,
      settings: { ...prev.settings, [key]: value },
    }));
  };

  const deleteProject = (idx: number) => {
    setDbData((prev: any) => {
      const projects = [...prev.projects];
      projects.splice(idx, 1);
      return { ...prev, projects };
    });
  };

  const addProject = () => {
    const newProj = {
      slug: "new-project-" + Date.now(),
      name: "New Custom Project",
      category: "AI Web Apps",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      description: "Brief summary describing the project.",
      longDescription: "Detailed description of architectural features, stack layers, and challenges.",
      tech: ["Next.js", "React 19", "Tailwind CSS"],
      link: "https://github.com",
      github: "https://github.com",
    };
    setDbData((prev: any) => ({
      ...prev,
      projects: [newProj, ...prev.projects],
    }));
  };

  const updateProjectField = (idx: number, key: string, value: any) => {
    setDbData((prev: any) => {
      const projects = [...prev.projects];
      projects[idx] = { ...projects[idx], [key]: value };
      return { ...prev, projects };
    });
  };

  const deleteBlog = (idx: number) => {
    setDbData((prev: any) => {
      const blog = [...prev.blog];
      blog.splice(idx, 1);
      return { ...prev, blog };
    });
  };

  const addBlog = () => {
    const newPost = {
      slug: "new-article-" + Date.now(),
      title: "New Tech Article Title",
      snippet: "Quick hook snippet details.",
      content: "### Heading\nWrite your markdown content here.",
      date: "July 17, 2026",
      readTime: "3 min read",
      category: "Frontend Development",
      tags: ["React 19"],
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    };
    setDbData((prev: any) => ({
      ...prev,
      blog: [newPost, ...prev.blog],
    }));
  };

  const updateBlogField = (idx: number, key: string, value: any) => {
    setDbData((prev: any) => {
      const blog = [...prev.blog];
      blog[idx] = { ...blog[idx], [key]: value };
      return { ...prev, blog };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-display">
        <div className="text-center space-y-4">
          <span className="w-8 h-8 inline-block border-2 border-electricBlue border-t-transparent rounded-full animate-spin" />
          <p className="text-mutedText text-xs uppercase tracking-widest">Loading Local Database...</p>
        </div>
      </div>
    );
  }

  // --- Auth Screen ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-md p-8 rounded-3xl glass-card border border-white/5 space-y-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-electricBlue/10 flex items-center justify-center text-electricBlue mx-auto shadow-glowBlue">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-white">Console Lockout</h1>
            <p className="text-mutedText text-xs mt-1 font-sans">
              Enter Harshit's admin passcode token to synchronize data configurations.
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Access Code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/5 focus:border-electricBlue rounded-2xl text-xs sm:text-sm text-white focus:outline-none text-center font-mono"
            />
            {error && <p className="text-red-500 text-[10px]">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-white text-[#050505] font-display font-semibold text-xs tracking-wider uppercase rounded-2xl"
            >
              Verify Token
            </button>
          </form>
          <div className="text-[10px] text-mutedText/60 font-mono">
            DEFAULT: <span className="bg-white/5 px-1 py-0.5 rounded text-white/80">harshit123</span>
          </div>
        </div>
      </div>
    );
  }

  const tabs = ["Hero & SEO", "Projects Showcase", "Journal System"];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-16 px-6 md:px-12 lg:px-24 relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar Panel */}
      <div className="md:w-64 shrink-0 flex flex-col gap-6">
        <div className="p-6 rounded-2xl glass-card border border-white/5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-electricBlue to-royalPurple flex items-center justify-center font-display font-bold text-xs text-white">
              C
            </div>
            <span className="font-display text-xs tracking-widest text-white">COCKPIT PANEL</span>
          </div>

          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-display text-[10px] tracking-widest uppercase transition-colors flex items-center justify-between ${
                  activeTab === tab ? "bg-white/5 border border-white/10 text-white" : "text-mutedText hover:text-white"
                }`}
              >
                <span>{tab}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 rounded-xl border border-white/5 bg-white/5 text-[9px] font-display tracking-widest uppercase text-red-400 hover:bg-white/10 hover:border-red-400/20"
          >
            Lock Terminal
          </button>
        </div>

        {/* Sync Status Button */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-gradient-to-r from-electricBlue to-royalPurple hover:shadow-glowBlue rounded-2xl font-display font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 text-white transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Sync Changes</span>
        </button>

        {successMsg && (
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-[#00FF66] text-center font-display text-[10px] tracking-wide uppercase">
            {successMsg}
          </div>
        )}
      </div>

      {/* Editor Workspace Panel */}
      <div className="flex-grow p-8 rounded-[32px] glass-card border border-white/5 space-y-8 min-h-[500px]">
        {/* Tab 1: Hero & SEO */}
        {activeTab === "Hero & SEO" && (
          <div className="space-y-6">
            <h2 className="font-display font-bold text-lg text-white border-b border-white/5 pb-2 flex items-center gap-2">
              <Settings className="w-5 h-5 text-electricBlue" />
              <span>Hero Details & SEO Schema</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-display tracking-widest text-mutedText">Display Name</label>
                <input
                  type="text"
                  value={dbData.hero.name}
                  onChange={(e) => updateHeroField("name", e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/5 focus:border-electricBlue rounded-xl text-xs text-white focus:outline-none"
                />
              </div>

              {/* Sub description */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] uppercase font-display tracking-widest text-mutedText">Hero Narrative Description</label>
                <textarea
                  value={dbData.hero.description}
                  onChange={(e) => updateHeroField("description", e.target.value)}
                  rows={3}
                  className="px-4 py-3 bg-white/5 border border-white/5 focus:border-electricBlue rounded-xl text-xs text-white focus:outline-none resize-none"
                />
              </div>

              {/* SEO Title */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-display tracking-widest text-mutedText">SEO Global Title</label>
                <input
                  type="text"
                  value={dbData.settings.seoTitle || ""}
                  onChange={(e) => updateSettingsField("seoTitle", e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/5 focus:border-electricBlue rounded-xl text-xs text-white focus:outline-none"
                />
              </div>

              {/* SEO Description */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] uppercase font-display tracking-widest text-mutedText">SEO Description Schema</label>
                <textarea
                  value={dbData.settings.seoDescription || ""}
                  onChange={(e) => updateSettingsField("seoDescription", e.target.value)}
                  rows={3}
                  className="px-4 py-3 bg-white/5 border border-white/5 focus:border-electricBlue rounded-xl text-xs text-white focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Projects Showcase */}
        {activeTab === "Projects Showcase" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-royalPurple" />
                <span>Projects Repository</span>
              </h2>
              <button
                onClick={addProject}
                className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 flex items-center gap-1 text-[9px] font-display uppercase tracking-wider"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Module</span>
              </button>
            </div>

            <div className="space-y-6">
              {dbData.projects.map((proj: any, idx: number) => (
                <div key={proj.slug} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-mutedText">MODULE: #{idx + 1}</span>
                    <button
                      onClick={() => deleteProject(idx)}
                      className="p-2 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Project Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-mutedText">Name</label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => updateProjectField(idx, "name", e.target.value)}
                        className="px-3.5 py-2.5 bg-[#050505]/40 border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    {/* Slug */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-mutedText">Route Slug</label>
                      <input
                        type="text"
                        value={proj.slug}
                        onChange={(e) => updateProjectField(idx, "slug", e.target.value)}
                        className="px-3.5 py-2.5 bg-[#050505]/40 border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-mutedText">Category</label>
                      <input
                        type="text"
                        value={proj.category}
                        onChange={(e) => updateProjectField(idx, "category", e.target.value)}
                        className="px-3.5 py-2.5 bg-[#050505]/40 border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    {/* Image URL */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-mutedText">Cover Image URL</label>
                      <input
                        type="text"
                        value={proj.image}
                        onChange={(e) => updateProjectField(idx, "image", e.target.value)}
                        className="px-3.5 py-2.5 bg-[#050505]/40 border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    {/* Short Description */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-[9px] uppercase tracking-wider text-mutedText">Brief Description</label>
                      <input
                        type="text"
                        value={proj.description}
                        onChange={(e) => updateProjectField(idx, "description", e.target.value)}
                        className="px-3.5 py-2.5 bg-[#050505]/40 border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    {/* Long Description */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-[9px] uppercase tracking-wider text-mutedText">Full Overview Description</label>
                      <textarea
                        value={proj.longDescription}
                        onChange={(e) => updateProjectField(idx, "longDescription", e.target.value)}
                        rows={3}
                        className="px-3.5 py-2.5 bg-[#050505]/40 border border-white/5 rounded-xl text-xs text-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Journal System */}
        {activeTab === "Journal System" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-softCyan" />
                <span>Journal Entries Manager</span>
              </h2>
              <button
                onClick={addBlog}
                className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 flex items-center gap-1 text-[9px] font-display uppercase tracking-wider"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Write Entry</span>
              </button>
            </div>

            <div className="space-y-6">
              {dbData.blog.map((post: any, idx: number) => (
                <div key={post.slug} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-mutedText">POST ID: #{idx + 1}</span>
                    <button
                      onClick={() => deleteBlog(idx)}
                      className="p-2 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Article Title */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-[9px] uppercase tracking-wider text-mutedText">Title</label>
                      <input
                        type="text"
                        value={post.title}
                        onChange={(e) => updateBlogField(idx, "title", e.target.value)}
                        className="px-3.5 py-2.5 bg-[#050505]/40 border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    {/* Slug */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-mutedText">Route Slug</label>
                      <input
                        type="text"
                        value={post.slug}
                        onChange={(e) => updateBlogField(idx, "slug", e.target.value)}
                        className="px-3.5 py-2.5 bg-[#050505]/40 border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-mutedText">Category</label>
                      <input
                        type="text"
                        value={post.category}
                        onChange={(e) => updateBlogField(idx, "category", e.target.value)}
                        className="px-3.5 py-2.5 bg-[#050505]/40 border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    {/* Cover image */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-[9px] uppercase tracking-wider text-mutedText">Cover Image URL</label>
                      <input
                        type="text"
                        value={post.image}
                        onChange={(e) => updateBlogField(idx, "image", e.target.value)}
                        className="px-3.5 py-2.5 bg-[#050505]/40 border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    {/* Snippet summary */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-[9px] uppercase tracking-wider text-mutedText">Brief Hook Snippet</label>
                      <input
                        type="text"
                        value={post.snippet}
                        onChange={(e) => updateBlogField(idx, "snippet", e.target.value)}
                        className="px-3.5 py-2.5 bg-[#050505]/40 border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    {/* Content Markdown text */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-[9px] uppercase tracking-wider text-mutedText">Markdown Content Body</label>
                      <textarea
                        value={post.content}
                        onChange={(e) => updateBlogField(idx, "content", e.target.value)}
                        rows={10}
                        className="px-3.5 py-2.5 bg-[#050505]/40 border border-white/5 rounded-xl font-mono text-xs text-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
