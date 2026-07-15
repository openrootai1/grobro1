/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: "#6D2BF2",
          dark: "#250063",
          deeper: "#1F0256",
          light: "#F4EDFF",
        },
        bg: "#F5F2FF",
        ink: "#1F1A33",
        muted: "#6E678A",
      },
    },
  },
  plugins: [],
};
