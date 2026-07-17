import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "data", "db.json");

// Helper to read database
async function getDbData() {
  try {
    const fileData = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading database file:", error);
    return null;
  }
}

// Helper to write database
async function saveDbData(data: any) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing to database file:", error);
    return false;
  }
}

export async function GET() {
  const data = await getDbData();
  if (!data) {
    return NextResponse.json({ error: "Failed to read database" }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // We expect authorization token or basic authentication
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    
    // Default fallback password/token for Harshit is 'harshit123' if env is not defined
    const secretAdminToken = process.env.ADMIN_TOKEN || "harshit123";
    
    if (token !== secretAdminToken) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const currentData = await getDbData();
    if (!currentData) {
      return NextResponse.json({ error: "Failed to read database" }, { status: 500 });
    }

    // Merge or replace keys
    const updatedData = {
      ...currentData,
      ...body,
      // preserve subkeys if body only sends specific sections
      hero: body.hero ? { ...currentData.hero, ...body.hero } : currentData.hero,
      about: body.about ? { ...currentData.about, ...body.about } : currentData.about,
      roadmap: body.roadmap || currentData.roadmap,
      skills: body.skills || currentData.skills,
      services: body.services || currentData.services,
      projects: body.projects || currentData.projects,
      timeline: body.timeline || currentData.timeline,
      stats: body.stats ? { ...currentData.stats, ...body.stats } : currentData.stats,
      testimonials: body.testimonials || currentData.testimonials,
      blog: body.blog || currentData.blog,
      settings: body.settings ? { ...currentData.settings, ...body.settings } : currentData.settings,
    };

    const success = await saveDbData(updatedData);
    if (!success) {
      return NextResponse.json({ error: "Failed to write database" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error("Error processing update:", error);
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
