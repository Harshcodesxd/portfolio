"use client";

import { useState } from "react";
import { Search, Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
  slug: string;
  title: string;
  snippet: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
}

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract unique categories and tags
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  // Filter logic
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);

    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <div className="space-y-12">
      {/* Search & Category Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Search input */}
        <div className="md:col-span-6 relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3.5 pl-12 bg-white/5 border border-white/5 focus:border-electricBlue rounded-2xl text-xs sm:text-sm text-white focus:outline-none transition-colors"
          />
          <Search className="w-4 h-4 text-mutedText absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Category list */}
        <div className="md:col-span-6 flex flex-wrap gap-2 justify-start md:justify-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedTag(null); // clear tags when category changes
              }}
              className={`px-4 py-2 rounded-xl font-display text-[10px] tracking-wider uppercase border transition-colors ${
                selectedCategory === cat
                  ? "bg-white text-[#050505] border-white"
                  : "bg-white/5 text-mutedText border-white/5 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Active tags filters */}
      {selectedTag && (
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-sans text-mutedText">Active Filter:</span>
          <button
            onClick={() => setSelectedTag(null)}
            className="px-3 py-1 text-[10px] bg-electricBlue/10 border border-electricBlue/20 text-white rounded-md flex items-center gap-1.5 hover:bg-electricBlue/20"
          >
            <Tag className="w-3 h-3 text-electricBlue" />
            <span>#{selectedTag}</span>
            <span className="text-white/40 ml-1">x</span>
          </button>
        </div>
      )}

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                key={post.slug}
                className="group relative rounded-3xl glass-card border border-white/5 overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Card Image */}
                <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
                  
                  {/* Category tag bubble */}
                  <span className="absolute top-4 left-4 text-[9px] tracking-widest uppercase font-display px-2.5 py-1 rounded-md bg-[#050505]/80 backdrop-blur-md border border-white/5 text-white/90">
                    {post.category}
                  </span>
                </Link>

                {/* Text Area */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Date and read metrics */}
                    <div className="flex items-center gap-4 text-[10px] text-mutedText font-sans mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-semibold text-lg sm:text-xl text-white mb-2 group-hover:text-gradient-cyan-blue transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* Snippet */}
                    <p className="font-sans font-light text-mutedText text-xs sm:text-sm leading-relaxed mb-6">
                      {post.snippet}
                    </p>
                  </div>

                  {/* Tags and Link footer */}
                  <div className="space-y-4 border-t border-white/5 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                          className={`text-[9px] font-sans px-2 py-0.5 rounded border transition-colors ${
                            selectedTag === tag
                              ? "bg-electricBlue border-electricBlue text-white"
                              : "bg-white/5 border-white/5 text-mutedText hover:text-white"
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-display font-medium text-white group-hover:text-gradient-cyan-blue transition-all"
                    >
                      <span>Read Full Entry</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center py-16">
              <h4 className="text-white font-display text-lg font-bold mb-1">No Articles Found</h4>
              <p className="text-mutedText text-xs">Try searching for other keywords or reset active filters.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
