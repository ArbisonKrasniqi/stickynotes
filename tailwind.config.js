/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.{html,js}', // Include .html files in public directory
    './src/**/*.{js,jsx}' // Include .js and .jsx files in src directory
  ],
  theme: {
    extend: {
      colors: {
        light: '#F0E9E6',
        dark: '#191F25',
        lighterDark: '#272E36',
        gray: '5B5D62',
        lighterGray: '9095A1'
      }
    },
  },
  plugins: [],
};