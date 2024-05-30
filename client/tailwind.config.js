/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        playFair : ["Playfair Display", "serif"],
        source:["Source Serif 4", "serif"],
        grot : ["Bricolage Grotesque", "sans-serif"]
      },colors:{
        accent:"#9CFF1E",
        //accentTransparent:"rgb(156, 255, 30,0.5)"
        whiteTransparent:"rgba(255,255,255,0.7)"
      }
    },
  },
  plugins: [],
}

