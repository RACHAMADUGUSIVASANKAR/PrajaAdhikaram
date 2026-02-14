/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#0B3D2E',
          50: '#E6F4EA',
          100: '#C8E6D0',
          200: '#A8D5BA',
          300: '#7BC08F',
          400: '#4DAA6A',
          500: '#2F7D4F',
          600: '#1F5C3A',
          700: '#0B3D2E',
          800: '#082D22',
          900: '#051E17',
          950: '#030F0B',
        },
        leaf: {
          DEFAULT: '#2F7D4F',
          light: '#A8D5BA',
          mist: '#E6F4EA',
          moss: '#1F5C3A',
          dark: '#0B3D2E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(47, 125, 79, 0.3)',
        'glow-lg': '0 0 40px rgba(47, 125, 79, 0.35)',
        'glow-xl': '0 0 60px rgba(47, 125, 79, 0.4)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scroll-indicator': 'scrollIndicator 2.5s ease-in-out infinite',
        'gradient-shift': 'gradientShift 10s ease infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(47, 125, 79, 0.25)' },
          '50%': { boxShadow: '0 0 30px rgba(47, 125, 79, 0.45)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        scrollIndicator: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(10px)', opacity: '0.5' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
