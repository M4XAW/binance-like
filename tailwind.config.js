/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "binance-yellow": "#F3BA2F",
      }
    },
  },
  plugins: [],
}