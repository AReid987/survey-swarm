/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./frontend/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced cyberpunk color palette
        neon: {
          blue: '#00d4ff',
          cyan: '#00ffff',
          pink: '#ff00ff',
          magenta: '#ff0080',
          green: '#00ff88',
          lime: '#7fff00',
          yellow: '#ffeb3b',
          amber: '#ffc107',
          purple: '#b388ff',
          violet: '#8a2be2',
          orange: '#ff6b35',
          red: '#ff1744',
          white: '#ffffff',
        },
        // Dark theme colors with depth
        dark: {
          950: '#000000',
          900: '#050505',
          800: '#0a0a0a',
          700: '#1a1a1a',
          600: '#2a2a2a',
          500: '#3a3a3a',
          400: '#4a4a4a',
          300: '#5a5a5a',
          200: '#6a6a6a',
          100: '#7a7a7a',
        },
        // Glass morphism colors
        glass: {
          white: 'rgba(255, 255, 255, 0.05)',
          light: 'rgba(255, 255, 255, 0.1)',
          medium: 'rgba(255, 255, 255, 0.15)',
          heavy: 'rgba(255, 255, 255, 0.2)',
        },
        // Gradient colors
        gradient: {
          cyberpunk: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          neon: 'linear-gradient(135deg, #00d4ff 0%, #ff00ff 100%)',
          matrix: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
          sunset: 'linear-gradient(135deg, #ff6b35 0%, #ff1744 100%)',
        }
      },
      // Enhanced typography for cyberpunk aesthetic
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        'display': ['Inter Display', 'Inter', 'system-ui', 'sans-serif'],
        'cyber': ['Orbitron', 'Rajdhani', 'Inter', 'sans-serif'],
      },
      // Advanced animations
      animation: {
        // Glow effects
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glow-pulse 1.5s ease-in-out infinite',
        'glow-intense': 'glow-intense 1s ease-in-out infinite alternate',

        // Neon effects
        'neon-flicker': 'neon-flicker 3s ease-in-out infinite',
        'neon-buzz': 'neon-buzz 0.15s ease-in-out infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',

        // Movement effects
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'slide-in': 'slide-in 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',

        // Cyber effects
        'cyber-scan': 'cyber-scan 2s linear infinite',
        'cyber-glitch': 'cyber-glitch 0.3s ease-in-out infinite',
        'cyber-rain': 'cyber-rain 1s linear infinite',

        // Loading effects
        'spin-neon': 'spin-neon 1s linear infinite',
        'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 2s infinite',

        // Hover effects
        'hover-glow': 'hover-glow 0.3s ease-in-out',
        'hover-scale': 'hover-scale 0.2s ease-in-out',
      },
      keyframes: {
        // Glow animations
        glow: {
          '0%': { boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor' },
          '100%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 10px currentColor' },
          '50%': { opacity: 0.7, boxShadow: '0 0 25px currentColor' },
        },
        'glow-intense': {
          '0%': { boxShadow: '0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor' },
          '100%': { boxShadow: '0 0 30px currentColor, 0 0 60px currentColor, 0 0 90px currentColor' },
        },

        // Neon animations
        'neon-flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: 1 },
          '20%, 22%, 24%, 55%': { opacity: 0.5 },
        },
        'neon-buzz': {
          '0%, 100%': { textShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
          '50%': { textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor' },
        },
        'neon-pulse': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },

        // Movement animations
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '25%': { transform: 'translateY(-15px) translateX(5px)' },
          '50%': { transform: 'translateY(-5px) translateX(-5px)' },
          '75%': { transform: 'translateY(-20px) translateX(3px)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },

        // Cyber animations
        'cyber-scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'cyber-glitch': {
          '0%, 100%': { transform: 'translate(0)', filter: 'hue-rotate(0deg)' },
          '20%': { transform: 'translate(-2px, 2px)', filter: 'hue-rotate(90deg)' },
          '40%': { transform: 'translate(-2px, -2px)', filter: 'hue-rotate(180deg)' },
          '60%': { transform: 'translate(2px, 2px)', filter: 'hue-rotate(270deg)' },
          '80%': { transform: 'translate(2px, -2px)', filter: 'hue-rotate(360deg)' },
        },
        'cyber-rain': {
          '0%': { transform: 'translateY(-100vh)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translateY(100vh)', opacity: 0 },
        },

        // Loading animations
        'spin-neon': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: 1 },
          '100%': { transform: 'scale(1.4)', opacity: 0 },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25px)' },
        },

        // Hover animations
        'hover-glow': {
          '0%': { boxShadow: '0 0 0px currentColor' },
          '100%': { boxShadow: '0 0 20px currentColor, 0 0 40px currentColor' },
        },
        'hover-scale': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
      },
      // Enhanced backdrop blur for glass morphism
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      // Extended spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      // Enhanced shadows
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)',
        'neon-pink': '0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3)',
        'neon-green': '0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 255, 136, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-heavy': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        'cyber': '0 0 15px rgba(0, 212, 255, 0.4), 0 0 25px rgba(255, 0, 255, 0.3)',
        'matrix': '0 0 15px rgba(0, 255, 136, 0.4), 0 0 25px rgba(0, 212, 255, 0.3)',
      },
      // Border radius variations
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      // Gradient text support
      backgroundImage: {
        'gradient-cyberpunk': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-neon': 'linear-gradient(135deg, #00d4ff 0%, #ff00ff 100%)',
        'gradient-matrix': 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #ff6b35 0%, #ff1744 100%)',
      },
    },
  },
  plugins: [],
}