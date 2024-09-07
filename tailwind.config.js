/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,cjs}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
    screens: {
      'xs': '320px',
      'sm': '375px',
      'md': '640px',
      'lg': '768px',
      'xl': '1024px',
      '2xl': '1280px',   
    },
    colors: {
      'chicago-blue': '#41B6E6',
      'chicago-red': '#E4002B',
      'red': '#c60c30',
      'blue': '#00a1de',
      'brown': '#62361b',
      'green': '#009b3a',
      'orange': '#f9461c',
      'purple': '#522398',
      'pink': '#e27ea6',
      'yellow': '#f9e300',
      'grey': '#565a5c',
      'black-light': '#0D0D0D',
    },
    fontFamily: {
      interTight: ['Inter Tight', 'sans-serif']
    },
  },
  variants: {
    extend: {}
  },
  plugins: [],
}

