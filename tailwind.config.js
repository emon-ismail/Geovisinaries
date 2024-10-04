/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        orbit: 'orbit 20s linear infinite',
      },
      keyframes: {
        orbit: {
          '0%': {
            transform: 'rotate(0deg) translateX(250px) rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg) translateX(250px) rotate(-360deg)',
          },
        },
      },
    },
  },
  plugins: [],
};


