/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary: '#030014',
        secondary: '#151312',
        light:{
          100: '#d6c6ff',
          200: '#a8b5db',
          300: '#98a4ab',
        },
        dark:{
          100: '#221f3d',
          200: '#0f0d23'
        }
      }
    },
  },
  plugins: [],
}