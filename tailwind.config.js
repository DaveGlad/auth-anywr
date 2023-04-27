/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-gradient':
          'linear-gradient(147.04deg, #CA7B70 0.74%, #5A2119 99.61%)',
      },
      colors: {
        primary: '#754ffe',
        'heading-color': '#1e293b',
        'text-color': '#64748b',
        'blue-gray': '#e2e8f0',
        'star-color': '#f59e0b',
        'info-color': '#0ea5e9',
        'warning-color': '#f59e0b',
        'success-color': '#38a169',
        'body-bg': '#f1f5f9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        h3: '1.2rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3.5rem',
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          lg: '2rem',
          xl: '4rem',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: '14px', color: '#64748b' },
        h2: { color: '#1e293b' },
        h3: { fontSize: '1.2rem', color: '#1e293b' },
        a: { color: '#754ffe' },
      });
    }),
  ],
};
