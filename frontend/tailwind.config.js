/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'btn-blue': '#1A91F0',
        'btn-dark': '#1788d1',
        'footer-blue': '#0f141e',
        'footer-hover': '#1e2532',
        'instagram-color': '#e4405f',
      },
    },
  },
  plugins: [],
};
