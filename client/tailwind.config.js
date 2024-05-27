/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sourceSerif : ["Source Serif 4","serif"],
        playFair : ["Playfair Display", "serif"],
        grot : ["Bricolage Grotesque", "sans-serif"]
      },
    },
  },
  plugins: [],
}

