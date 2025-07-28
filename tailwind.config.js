/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        floating: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        floating: "floating 3s ease-in-out infinite",
        "fade-in": "fade-in 1.5s ease-in forwards",
      },
    },
  },
  darkMode: "class", // important for dark mode toggle
  plugins: [],
};
