/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pressstart: ['"Press Start 2P"', 'cursive', 'monospace'],
        vt323: ['"VT323"', 'monospace'],
        sans: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        game: {
          dark: '#05070f', // Very deep navy
          panel: 'rgba(11, 15, 30, 0.75)', // Slate panel back
          gold: '#d97706', // Gold border/accent
          goldlight: '#f59e0b',
          goldglow: 'rgba(217, 119, 6, 0.3)',
          purple: '#8b5cf6', // Character purple
          purpleglow: 'rgba(139, 92, 246, 0.25)',
          text: '#f8fafc',
          muted: '#94a3b8',
          border: '#1e293b',
          pixelgold: '#d97706',
        }
      },
      boxShadow: {
        'pixel-gold': '0 4px 0 0 #78350f, 0 -4px 0 0 #78350f, 4px 0 0 0 #78350f, -4px 0 0 0 #78350f, inset 0 2px 0 0 #fbbf24',
        'pixel-gray': '0 4px 0 0 #1e293b, 0 -4px 0 0 #1e293b, 4px 0 0 0 #1e293b, -4px 0 0 0 #1e293b, inset 0 2px 0 0 #475569',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow-slow': 'glow 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
