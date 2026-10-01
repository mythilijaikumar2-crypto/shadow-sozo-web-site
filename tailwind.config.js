/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F5E6AD',
          DEFAULT: '#D4AF37',
          dark: '#AA820A',
          metallic: '#C5A059',
          glow: 'rgba(212, 175, 55, 0.35)',
        },
        silver: {
          light: '#F8FAFC',
          DEFAULT: '#CBD5E1',
          dark: '#64748B',
          metallic: '#94A3B8',
        },
        dark: {
          bg: '#030303',
          surface: '#0A0A0A',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Cinzel', 'Syne', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFF1C5 0%, #D4AF37 50%, #9A7B1C 100%)',
        'silver-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 50%, #64748B 100%)',
        'gold-silver-glow': 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(0,0,0,0) 70%)',
      }
    },
  },
  plugins: [],
}
