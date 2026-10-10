import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07111f',
        panel: '#0c1929',
        surface: '#112238',
        elevated: '#162b44',
        line: '#263b55',
        ice: '#93d7ff',
        sky: '#62b9f2',
        mist: '#edf6ff',
        muted: '#a8b9cb',
        violet: '#c0c9ff',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Instrument Serif', 'Iowan Old Style', 'Baskerville', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        soft: '0 20px 55px rgba(1, 7, 18, 0.34)',
        glow: '0 0 0 1px rgba(147, 215, 255, 0.08), 0 20px 54px rgba(44, 134, 191, 0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config
