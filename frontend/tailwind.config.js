/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        sm: "640px", // => @media (min-width: 640px) { ... }
        md: "1024px", // => @media (min-width: 1024px) { ... }
        lg: "1280px", // => @media (min-width: 1280px) { ... }
        xl: "1536px", // => @media (min-width: 1536px) { ... }
        "2xl": "1920px", // => @media (min-width: 1920px) { ... }
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["#F3F4F6"],
  },
};
