/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6635",
      },
    },
    fontFamily: {
      sans: ["Lato", "sans-serif"],
      serif: ["Lato", "serif"],
    },
  },
  plugins: [],
};
