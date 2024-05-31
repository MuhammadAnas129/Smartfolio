/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: '#4A5568',
        secondary: '#CBD5E0',
      },
      width: {
        '72': '18rem',
      },
    },
  },
  plugins: [],
}

