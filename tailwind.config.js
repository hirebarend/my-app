/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-olive": "#3B3B3B",
        malachite: "#00D555",
        "rosso-corsa": "#d60d00",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Inter", "serif"],
    },
  },
  plugins: [],
};
