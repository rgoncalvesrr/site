/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // O array abaixo garante que o Tailwind mapeia TUDO, na raiz e nas subpastas
  content: [
    "./*.{html,js,php}",
    "./**/*.{html,js,php}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#e05a5e',
          DEFAULT: '#A42024',   /* Acento */
          dark: '#82191c',
          secondary: '#777777', /* Secundária */
          primary: '#FFFFFF'    /* Primária */
        }
      }
    }
  },
  plugins: [],
}