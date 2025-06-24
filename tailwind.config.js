/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neutral': {
          '900': '#111827', // A very dark gray, near-black for titles
          '800': '#1F2937', // Slightly lighter for body text
          '500': '#6B7280', // Medium gray for links/metadata
          '400': '#9CA3AF', // Lighter gray for subtle text
        },
        'brand': '#4F46E5', // A sample brand color for accents if needed
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}