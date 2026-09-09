/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1C1917',
          50: '#F7F4EE',
          100: '#EAE2D3',
          400: '#8A8073',
          600: '#2B2622',
          700: '#1C1917',
          800: '#141210',
          900: '#0D0B0A',
        },
        sand: {
          50: '#FAF8F4',
          100: '#F0E9DC',
          200: '#E3D6BF',
          300: '#D2BE9C',
          400: '#B99E76',
        },
        leaf: {
          DEFAULT: '#2E7D32',
          50: '#E8F3E9',
          100: '#C6E3C8',
          400: '#4B9950',
          600: '#276B2B',
          700: '#2E7D32',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
}
