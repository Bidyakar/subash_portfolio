/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A1929',
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3',
          600: '#1976D2',
          700: '#1565C0',
          800: '#0D47A1',
          900: '#0A1929',
        },
        accent: {
          DEFAULT: '#FF6B35',
          50: '#FFE8E0',
          100: '#FFD1C2',
          200: '#FFB89F',
          300: '#FF9F7C',
          400: '#FF8559',
          500: '#FF6B35',
          600: '#FF4D0D',
          700: '#DB3A00',
          800: '#A32D00',
          900: '#6B1E00',
        },
        navy: '#0A1929',
        orange: '#FF6B35',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
