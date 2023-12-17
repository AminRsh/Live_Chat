/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xsm': '385px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },keyframes: {
        "fade-in": {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        }, "shine": {
          '0%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '-100% 50%' },
        },
      },animation: {
        "fade-in": 'fade-in 0.5s ease-in-out',
          "shine": 'shine 5s linear infinite',
      } 
    },
  },
  plugins: [],
});

