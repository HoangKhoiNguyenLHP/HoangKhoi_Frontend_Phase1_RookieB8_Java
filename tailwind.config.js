/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1216px', // 1184 + 32px
      '2xl': '1216px', // 1184 + 32px
    },
    extend: {
      colors: {
        // Add your custom colors here if needed
      },
    },
  },
  plugins: [],
}

