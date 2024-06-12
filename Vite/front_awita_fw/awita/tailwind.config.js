/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Roboto':['Roboto','sans-serif'],
        'Rubik':['Rubik', 'sans-serif']
      },
      width:{
        'box-title': "40%",
        'plus-ultra':'130%'
      },
      height:{
        'home-height':'650px',
        'home-plan': '620px',
        'home-screen':'180vh'
      },
      textColor:{
        'title-color': '#5e17df',
        'subtitle-color': '#1d75fa',
        'head-color': '#010f2e'
      },
      backgroundImage:{
        'home-bg': "url('./src/assets/img/background.png')",
        'palette': "-webkit-linear-gradient(0deg, rgb(94, 23, 223) 0%, rgb(29, 117, 250) 100%)",
        'footer-bg': "url('./src/assets/img/footer_bg.png')"
      },
      gridTemplateRows:{
        'home-grid': "10% 90%"
      },
      gridTemplateColumns:{
        'stats-rem':'16rem auto'

      },
    },
  },
  plugins: [],
}

