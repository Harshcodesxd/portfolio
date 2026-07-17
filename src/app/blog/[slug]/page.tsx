import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

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

async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "db.json");
    const rawData = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(rawData);
    const post = data.blog.find((p: BlogPost) => p.slug === slug);
    return post || null;
  } catch (error) {
    console.error("Error reading db.json for blog slug:", error);
    return null;
  }
}

// Custom Markdown Parser to compile content tags into clean JSX
function renderMarkdown(content: string) {
  const lines = content.split("\n");
  let inCodeBlock = false;
  let codeContent: string[] = [];
  let codeLanguage = "";
  
  const jsxElements: React.JSX.Element[] = [];
  let listItems: string[] = [];

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      jsxElements.push(
        <ul key={`list-${key}`} className="list-disc list-inside pl-4 my-4 space-y-2 font-sans font-light text-mutedText text-sm sm:text-base leading-relaxed">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, idx) => {
    // 1. Code Block starts or ends
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        // flush code block
        inCodeBlock = false;
        jsxElements.push(
          <pre key={`code-${idx}`} className="bg-white/5 border border-white/5 p-4 rounded-2xl font-mono text-xs overflow-x-auto text-[#00F2FE] my-6 shadow-inner">
            <code className={codeLanguage ? `language-${codeLanguage}` : ""}>
              {codeContent.join("\n")}
            </code>
          </pre>
        );
        codeContent = [];
        codeLanguage = "";
      } else {
        inCodeBlock = true;
        codeLanguage = line.replace("```", "").trim();
        flushList(idx);
      }
      return;
    }

    if (inCodeBlock) {
      codeContent.push(line);
      return;
    }

    // 2. Headings
    if (line.startsWith("### ")) {
      flushList(idx);
      const text = parseInlineStyles(line.replace("### ", ""));
      jsxElements.push(
        <h3 key={idx} className="font-display font-semibold text-lg sm:text-xl text-white mt-8 mb-4 tracking-tight" dangerouslySetInnerHTML={{ __html: text }} />
      );
      return;
    }

    if (line.startsWith("## ")) {
      flushList(idx);
      const text = parseInlineStyles(line.replace("## ", ""));
      jsxElements.push(
        <h2 key={idx} className="font-display font-bold text-xl sm:text-2xl text-white mt-10 mb-4 tracking-tight border-b border-white/5 pb-2" dangerouslySetInnerHTML={{ __html: text }} />
      );
      return;
    }

    if (line.startsWith("# ")) {
      flushList(idx);
      const text = parseInlineStyles(line.replace("# ", ""));
      jsxElements.push(
        <h1 key={idx} className="font-display font-black text-3xl sm:text-4xl text-white mt-12 mb-6 tracking-tight" dangerouslySetInnerHTML={{ __html: text }} />
      );
      return;
    }

    // 3. Lists
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const cleanLine = line.trim().substring(2);
      listItems.push(parseInlineStyles(cleanLine));
      return;
    }

    // 4. Ordered lists (number counts)
    if (/^\d+\.\s/.test(line.trim())) {
      const cleanLine = line.trim().replace(/^\d+\.\s/, "");
      listItems.push(parseInlineStyles(cleanLine));
      return;
    }

    // 5. Paragraphs / Blanks
    if (line.trim() === "") {
      flushList(idx);
      return;
    }

    // Normal text lines
    flushList(idx);
    const parsedText = parseInlineStyles(line);
    jsxElements.push(
      <p key={idx} className="font-sans font-light text-mutedText text-sm sm:text-base leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: parsedText }} />
    );
  });

  // Final list check
  flushList(lines.length);

  return jsxElements;
}

// Helper to parse inline tags like bold and code highlights
function parseInlineStyles(text: string): string {
  let result = text;
  // bold **
  result = result.replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-white'>$1</strong>");
  // code `
  result = result.replace(/`(.*?)`/g, "<code class='bg-white/5 border border-white/5 px-1.5 py-0.5 rounded font-mono text-xs text-softCyan'>$1</code>");
  return result;
}

export default async function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 relative z-10">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <div className="mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 group text-xs tracking-widest uppercase font-display text-mutedText hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Journal</span>
          </Link>
        </div>

        {/* Heading Metas */}
        <div className="flex flex-col items-start mb-8">
          <span className="text-[10px] tracking-[0.3em] font-display text-gradient-cyan-blue uppercase mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-mutedText font-sans border-y border-white/5 py-4 w-full">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Article image cover */}
        <div className="relative rounded-[28px] overflow-hidden aspect-[21/9] border border-white/5 shadow-premium mb-12">
          <img src={post.image} alt={post.title} className="object-cover w-full h-full" />
        </div>

        {/* Article Body */}
        <article className="prose prose-invert max-w-none">
          {renderMarkdown(post.content)}
        </article>

        {/* Article tags footer */}
        <div className="flex items-center gap-2 mt-12 pt-6 border-t border-white/5">
          <Tag className="w-3.5 h-3.5 text-mutedText" />
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-sans px-2.5 py-1 rounded bg-white/5 border border-white/5 text-mutedText"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
