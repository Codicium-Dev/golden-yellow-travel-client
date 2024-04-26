import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        sideNavIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        sideNavOut: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        slideReviewIn: {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
            display: "none",
          },
          "50%": {
            transform: "translateX(50%)",
            opacity: "0",
            display: "none",
          },
          "100%": {
            transform: "translateX(0%)",
            opacity: "1",
            display: "flex",
          },
        },
        slideReviewOut: {
          "0%": { transform: "translateX(0%)", opacity: "1", display: "flex" },
          "50%": {
            transform: "translateX(50%)",
            opacity: "0",
            display: "none",
          },
          "100%": {
            transform: "translateX(100%)",
            opacity: "0",
            display: "none",
          },
        },
        slideContentIn: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
            display: "none",
          },
          "50%": {
            transform: "translateX(-50%)",
            opacity: "0",
            display: "none",
          },
          "100%": {
            transform: "translateX(0%)",
            opacity: "1",
            display: "flex",
          },
        },
        slideContentOut: {
          "0%": { transform: "translateX(0%)", opacity: "1", display: "flex" },
          "50%": {
            transform: "translateX(-50%)",
            opacity: "0",
            display: "none",
          },
          "100%": {
            transform: "translateX(-100%)",
            opacity: "0",
            display: "none",
          },
        },

        // reverse
        slideReviewInReverse: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
            display: "none",
          },
          "50%": {
            transform: "translateX(-50%)",
            opacity: "0",
            display: "none",
          },
          "100%": {
            transform: "translateX(0%)",
            opacity: "1",
            display: "flex",
          },
        },
        slideReviewOutReverse: {
          "0%": { transform: "translateX(0%)", opacity: "1", display: "flex" },
          "50%": {
            transform: "translateX(-50%)",
            opacity: "0",
            display: "none",
          },
          "100%": {
            transform: "translateX(-100%)",
            opacity: "0",
            display: "none",
          },
        },
        slideContentInReverse: {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
            display: "none",
          },
          "50%": {
            transform: "translateX(50%)",
            opacity: "0",
            display: "none",
          },
          "100%": {
            transform: "translateX(0%)",
            opacity: "1",
            display: "flex",
          },
        },
        slideContentOutReverse: {
          "0%": { transform: "translateX(0%)", opacity: "1", display: "flex" },
          "50%": {
            transform: "translateX(50%)",
            opacity: "0",
            display: "none",
          },
          "100%": {
            transform: "translateX(100%)",
            opacity: "0",
            display: "none",
          },
        },

        // mobile
        slideReviewInMobile: {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0",
            display: "none",
          },
          "50%": {
            transform: "translateY(50%)",
            opacity: "0",
            display: "none",
          },
          "100%": {
            transform: "translateY(0%)",
            opacity: "1",
            display: "flex",
          },
        },
        slideReviewOutMobile: {
          "0%": { transform: "translateY(0%)", opacity: "1", display: "flex" },
          "50%": {
            transform: "translateY(50%)",
            opacity: "0",
            display: "none",
          },
          "100%": {
            transform: "translateY(100%)",
            opacity: "0",
            display: "none",
          },
        },
        slideContentInMobile: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "0",
            display: "none",
          },
          "50%": {
            transform: "translateY(-50%)",
            opacity: "0",
            display: "none",
          },
          "100%": {
            transform: "translateY(0%)",
            opacity: "1",
            display: "flex",
          },
        },
        slideContentOutMobile: {
          "0%": { transform: "translateY(0%)", opacity: "1", display: "flex" },
          "50%": {
            transform: "translateY(-50%)",
            opacity: "0",
            display: "none",
          },
          "100%": {
            transform: "translateY(-100%)",
            opacity: "0",
            display: "none",
          },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(1.03)" },
          "50%": { opacity: "0.2" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        sideNavIn: "sideNavIn .3s ease-in-out",
        sideNavOut: "sideNavOut .3s ease-in-out",
        slideReviewIn: "slideReviewIn 0.8s ease-in",
        slideReviewOut: "slideReviewOut 0.8s ease-in",
        slideContentIn: "slideContentIn 0.8s ease-in",
        slideContentOut: "slideContentOut 0.8s ease-in",
        slideReviewInReverse: "slideReviewInReverse 0.8s ease-in",
        slideReviewOutReverse: "slideReviewOutReverse 0.8s ease-in",
        slideContentInReverse: "slideContentInReverse 0.8s ease-in",
        slideContentOutReverse: "slideContentOutReverse 0.8s ease-in",
        slideReviewInMobile: "slideReviewInMobile 0.8s ease-in",
        slideReviewOutMobile: "slideReviewOutMobile 0.8s ease-in",
        slideContentInMobile: "slideContentInMobile 0.8s ease-in",
        slideContentOutMobile: "slideContentOutMobile 0.8s ease-in",
        fadeIn: "fadeIn 0.7s ease-in",
        slowFadeIn: "fadeIn 1s ease-in",
      },
    },
  },
  plugins: [],
};
export default config;
