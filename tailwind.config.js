/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'sans-serif'],
      },
      colors: {
        ocean: {
          50: '#e6f7fb',
          100: '#c2ecf3',
          200: '#8dd9e8',
          300: '#4ec0d6',
          400: '#22a8c4',
          500: '#0e8aa6',
          600: '#0e7490',
          700: '#115e74',
          800: '#134e61',
          900: '#0b1220',
          950: '#050a14',
        },
        cyan: {
          glow: '#22d3ee',
        },
        teal: {
          glow: '#2dd4bf',
        },
        severity: {
          low: '#22c55e',
          medium: '#f59e0b',
          high: '#ef4444',
          extreme: '#b91c1c',
        },
      },
      backgroundImage: {
        'ocean-radial':
          'radial-gradient(ellipse at top, rgba(14,138,166,0.18), transparent 60%), radial-gradient(ellipse at bottom, rgba(34,211,238,0.08), transparent 55%)',
        'grid-faint':
          'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-40': '40px 40px',
      },
      boxShadow: {
        glow: '0 0 24px rgba(34,211,238,0.25)',
        'glow-sm': '0 0 12px rgba(34,211,238,0.2)',
        'glow-teal': '0 0 24px rgba(45,212,191,0.25)',
        card: '0 8px 32px rgba(0,0,0,0.35)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-slow': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'dash-flow': {
          '0%': { strokeDashoffset: '40' },
          '100%': { strokeDashoffset: '0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out both',
        'fade-in-slow': 'fade-in-slow 1.2s ease-out both',
        'pulse-ring': 'pulse-ring 2.2s ease-out infinite',
        'dash-flow': 'dash-flow 1s linear infinite',
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
