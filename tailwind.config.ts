import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        foreground: "#FFFFFF",
        secondary: "#8B5CF6",
        card: "#111827",
        "card-border": "rgba(255, 255, 255, 0.05)",
        "card-border-hover": "rgba(255, 255, 255, 0.12)",
        electricBlue: "#3B82F6",
        royalPurple: "#8B5CF6",
        softCyan: "#06B6D4",
        mutedText: "#9CA3AF",
        success: "#22C55E",
        warning: "#F59E0B",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-outfit)", "sans-serif"],
      },
      boxShadow: {
        premium: "0 8px 32px 0 rgba(0, 0, 0, 0.6)",
        glowBlue: "0 0 25px rgba(59, 130, 246, 0.15)",
        glowPurple: "0 0 25px rgba(139, 92, 246, 0.15)",
        glowCyan: "0 0 25px rgba(6, 182, 212, 0.15)",
      },
      backdropBlur: {
        premium: "16px",
      },
      animation: {
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;

