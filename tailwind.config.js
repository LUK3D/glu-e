/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'black':{
          100:'#000000',
          200:'#1E1E1E',
          300:'#262626',
          400:'#363636',
        },
        'primary': '#7D5BED'
      },
      backgroundImage: {
        'radial-black-transparent': 'radial-gradient(rgb(54 54 54 /0.4) 1px, transparent 0)',
      },
      backgroundSize: {
        'radial-size': '20px 20px',
      },
      backgroundPosition: {
        'radial-position': '-19px -19px',
      },
    },
  },
  plugins: [],
}

