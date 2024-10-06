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
        gray: '#5B5D62',
        lighterGray: '#9095A1' // Corrected color code
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addComponents }) {
      addComponents({
        '.prose': {
          lineHeight: '1.4', // Set line height for prose elements
          'p': {
            lineHeight: '1.4', // Set specific line height for paragraphs
            margin: '0.25em', // Reduce margin between paragraphs
          },
          'blockquote': {
            lineHeight: '1.4', // Set specific line height for blockquotes
            margin: '0.25em', // Reduce margin between blockquotes and other elements
          },
          'ul': {
            margin: '0.25em', // Reduce margin between unordered list and other elements
            'li': {
              lineHeight: '1.4', // Set specific line height for unordered list items
              margin: '0.25em', // Reduce margin between list items
            },
          },
          'ol': {
            margin: '0.25em', // Reduce margin between ordered list and other elements
            'li': {
              lineHeight: '1.4', // Set specific line height for ordered list items
              margin: '0.25em', // Reduce margin between list items
            },
          },
        },
      });
    }
  ],
};
