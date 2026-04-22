/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#122117",
        mist: "#f3f0e8",
        pine: "#17352b",
        ember: "#e34d2f",
        gold: "#d8a72f",
        mint: "#daf4e2"
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["IBM Plex Sans", "sans-serif"]
      },
      boxShadow: {
        card: "0 18px 60px rgba(18, 33, 23, 0.12)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(18,33,23,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(18,33,23,0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
