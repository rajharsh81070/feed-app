/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        '2xl': '1440px',
      },
      animate: {
        slide: 'slide 100ms linear forwards',
      },
    },
  },
  plugins: [],
})
