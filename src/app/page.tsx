import fs from "fs/promises";
import path from "path";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Roadmap from "@/components/Roadmap";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Certifications from "@/components/Certifications";
import Stats from "@/components/Stats";
import Github from "@/components/Github";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export const dynamic = "force-dynamic";

async function getPortfolioData() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "db.json");
    const rawData = await fs.readFile(filePath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Error reading db.json in page.tsx:", error);
    return null;
  }
}

export default async function HomePage() {
  const data = await getPortfolioData();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#09090B] font-display">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Systems Offline</h1>
          <p className="text-mutedText text-sm">Failed to retrieve local portfolio structures.</p>
        </div>
      </div>
    );
  }

  const githubUser = data.hero.socialLinks.find((s: any) => s.platform === "GitHub")?.username || "harshit";

  return (
    <main className="relative z-10 w-full">
      {/* Portfolio Sections */}
      <Hero data={data.hero} />
      <About data={data.about} />
      <Roadmap data={data.roadmap} />
      <Skills data={data.skills} />
      <Services data={data.services} />
      <Process data={data.process} />
      <Projects data={data.projects} />
      <Timeline data={data.timeline} />
      <Certifications data={data.certifications} />
      <Stats data={data.stats} />
      <Github username={githubUser} />
      <Testimonials data={data.testimonials} />
      <Contact data={data.hero} />
    </main>
  );
}
