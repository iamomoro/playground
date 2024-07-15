/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',

    // Support for Vite
    './index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
