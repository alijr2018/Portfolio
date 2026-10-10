import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#172019',
        panel: '#202a22',
        line: 'rgba(237, 240, 232, 0.11)',
        lime: '#b9c99b',
        mist: '#edf0e8',
        muted: '#adb8ad',
        violet: '#b9b1cc',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Iowan Old Style', 'Baskerville', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 20px 55px rgba(7, 14, 9, 0.20)',
        glow: '0 0 0 1px rgba(185,201,155,0.10), 0 18px 48px rgba(120,146,102,0.09)',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        shimmer: 'shimmer 4.2s ease-in-out infinite',
        pulseSoft: 'pulse-soft 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.85' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.42', transform: 'scale(0.9)' },
          '50%': { opacity: '0.82', transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
