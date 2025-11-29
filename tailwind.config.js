/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1", // indigo
        accent: "#22C55E",  // green
        dark: "#020617",
        card: "#020617",
      },
      boxShadow: {
        soft: "0 24px 60px rgba(0,0,0,0.45)",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
    },
  },
  plugins: [],
};
