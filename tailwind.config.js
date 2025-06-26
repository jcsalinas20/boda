/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sage': {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a8b5a0',
          400: '#8a9b7f',
          500: '#708264',
          600: '#5a6b4f',
          700: '#4a5741',
          800: '#3d4836',
          900: '#343c2e',
        },
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};