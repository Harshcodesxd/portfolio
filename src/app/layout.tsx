import type { Metadata } from "next";
import { Inter, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LayoutProvider from "@/components/LayoutProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://harshit.dev"),
  title: {
    default: "Harshit | AI Engineer & Full-Stack Developer",
    template: "%s | Harshit",
  },
  description: "Personal portfolio of Harshit, future AI Engineer, Full-Stack Developer, Freelancer, and SaaS Founder. Exploring Next.js 15, React 19, and machine learning models.",
  keywords: [
    "Harshit",
    "AI Engineer",
    "Full-Stack Developer",
    "Next.js 15",
    "React 19",
    "Freelancer",
    "SaaS Founder",
    "Three.js",
    "GSAP animations",
  ],
  authors: [{ name: "Harshit" }],
  creator: "Harshit",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harshit.dev",
    title: "Harshit | AI Engineer & Full-Stack Developer",
    description: "Personal portfolio of Harshit, featuring high-fidelity dark visuals, custom motion design, and responsive layouts.",
    siteName: "Harshit Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshit | AI Engineer & Full-Stack Developer",
    description: "Future AI Engineer & Full-Stack Developer portfolio site.",
    creator: "@harshit",
  },
  alternates: {
    canonical: "https://harshit.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth select-none">
      <body className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} antialiased font-sans bg-[#09090B] text-white`}>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}

