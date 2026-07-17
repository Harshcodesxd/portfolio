import fs from "fs/promises";
import path from "path";
import BlogListClient from "./BlogListClient";

export const dynamic = "force-dynamic";

async function getBlogPosts() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "db.json");
    const rawData = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(rawData);
    return data.blog || [];
  } catch (error) {
    console.error("Error reading blog list from db.json:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 relative z-10 max-w-5xl mx-auto">
      {/* Blog Headers */}
      <div className="flex flex-col items-start mb-16">
        <span className="text-[10px] tracking-[0.3em] font-display text-gradient-cyan-purple uppercase mb-3">
          Insights
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-4">
          Tech Journal
        </h1>
        <p className="text-mutedText max-w-lg font-sans font-light text-xs sm:text-sm leading-relaxed">
          Sharing knowledge regarding Next.js features, Python automation models, and creative applications of artificial intelligence.
        </p>
      </div>

      {/* Interactive Blog Filtering & Grids */}
      <BlogListClient posts={posts} />
    </main>
  );
}
