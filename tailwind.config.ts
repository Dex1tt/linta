import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F1F5F2",
        surface: "#FFFFFF",
        ink: "#12312E",
        accent: "#0F766E",
        "accent-warm": "#F4A261",
        "status-confirmed": "#15803D",
        "status-pending": "#B45309",
        "status-cancelled": "#DC2626",
        "status-paid": "#2563EB",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
