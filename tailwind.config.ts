import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {
    colors: { ink: "#08090D", panel: "#11131B", line: "rgba(255,255,255,.1)", acid: "#C7F36B" },
    fontFamily: { sans: ["var(--font-inter)", "sans-serif"], display: ["var(--font-space)", "sans-serif"] },
    boxShadow: { glow: "0 0 80px rgba(123,92,255,.22)" }
  }},
  plugins: []
};
export default config;