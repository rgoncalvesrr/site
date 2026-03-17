/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js,php}",
    "./**/*.{html,js,php}"
  ],
  darkMode: 'class',
  safelist: ['dark'],
  theme: {
    extend: {
      colors: {
        peau: {
          /* Usando rgba() nativo que funciona perfeitamente com as vírgulas do input.css */
          light: 'rgb(var(--color-peau-light) / <alpha-value>)',
          rose: 'rgb(var(--color-peau-rose) / <alpha-value>)',
          rosedark: 'rgb(var(--color-peau-rosedark) / <alpha-value>)',
          dark: 'rgb(var(--color-peau-dark) / <alpha-value>)',
          gray: 'rgb(var(--color-peau-gray) / <alpha-value>)',
          card: 'rgb(var(--color-peau-card) / <alpha-value>)',
          inverse: 'rgb(var(--color-peau-inverse) / <alpha-value>)',
        },
        whatsapp: '#25D366',
        whatsappdark: '#1ea952'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}