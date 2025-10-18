// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',        // Expo Router folders
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#0B1220',
        card: '#0F172A',
        text: '#E5E7EB',
        sub: '#9CA3AF',
        accent: '#FEC94C',
        border: 'rgba(255,255,255,0.06)',
      },
      borderRadius: {
        xl: '16px',
        '2xl': '24px',
      },
    },
  },
  plugins: [],
}
