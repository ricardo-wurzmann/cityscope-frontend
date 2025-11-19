import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./services/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Poppins", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#f3f8ff",
          100: "#e0edff",
          200: "#bdd9ff",
          300: "#8dbbff",
          400: "#5898ff",
          500: "#317bff",
          600: "#175ef5",
          700: "#0f47d6",
          800: "#113aa9",
          900: "#122f83"
        }
      }
    }
  },
  plugins: []
};

export default config;

