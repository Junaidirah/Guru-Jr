import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        around: "0 0 10px rgba(0, 0, 0, 0.3)",
        card: "0px 4px 15px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          button: "#0161C0",
        },
        secondary: {
          DEFAULT: "210 40% 96.1%",
          foreground: "222.2 47.4% 11.2%",
        },
        destructive: {
          DEFAULT: "0 84.2% 60.2%",
          foreground: "210 40% 98%",
        },
        muted: {
          DEFAULT: "210 40% 96.1%",
          foreground: "215.4 16.3% 46.9%",
        },
        accent: {
          DEFAULT: "210 40% 96.1%",
          foreground: "222.2 47.4% 11.2%",
        },
        popover: {
          DEFAULT: "0 0% 100%",
          foreground: "222.2 84% 4.9%",
        },
        card: {
          DEFAULT: "0 0% 100%",
          foreground: "222.2 84% 4.9%",
        },
        screenBackground: "#FFFFFF", // Main dashboard background
        inputBackground: "#FFFFFF", // Custom input background color
        dashboardHeaderBg: "#E9F3FA", // Header background
        dashboardTotalPointsBg: "#FFB02E", // Total Points card background
        dashboardBlue: "#0161C0", // Custom blue for leaderboard card
        dashboardCardBg: "#FFFFFF", // White background for reports card
        dashboardTextPrimary: "#282828", // Dark text
        dashboardTextSecondary: "#555555", // Lighter text
        dashboardIconBlue: "#0161C0", // Blue for icons
        bottomNavBg: "#F9F8F6", // New: Background for bottom navigation
        placeholderSoft: "#A0A0A0", // New: Softer placeholder text color
        bottomNavIconDefault: "#77A7D1", // New: Default color for bottom navigation icons
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
