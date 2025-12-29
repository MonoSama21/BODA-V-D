/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'script': ['"Great Vibes"', 'cursive'],
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['Lato', 'sans-serif'],
      },
      colors: {
        wedding: {
          primary: '#D4AF37',
          secondary: '#8B7355',
          light: '#F5F5DC',
          dark: '#2C2416',
        }
      }
    },
  },
  plugins: [],
}
