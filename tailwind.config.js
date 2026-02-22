/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cloudbsd: {
          blue: '#00529B',
          red: '#D32F2F',
        }
      }
    },
  },
  plugins: [],
}

