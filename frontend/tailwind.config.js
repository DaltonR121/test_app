/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'button': '#45988C',
        'button-hover': '#3D887F',
        'gradient-start': '#44978C',
        'gradient-end': '#7FBF4A',
      }
    },
  },
  plugins: [],
}
