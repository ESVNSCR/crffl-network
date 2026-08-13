import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Futuristic CRFFL Brand Colors
        crffl: {
          neon: "#00ff88", // Bright futuristic green
          dark: "#0a0a0f", // Deep void background
          card: "rgba(20, 20, 30, 0.6)", // Glassmorphism card base
          border: "rgba(0, 255, 136, 0.2)", // Subtle neon border
        }
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      },
      boxShadow: {
        'neon': '0 0 15px rgba(0, 255, 136, 0.3)',
        'neon-strong': '0 0 30px rgba(0, 255, 136, 0.5)',
      }
    },
  },
  plugins: [],
};
export default config;