/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#07111F',
          secondary: '#0B1628',
          card: '#101D30',
          hover: '#15253F',
        },
        brand: {
          blue: '#4F8CFF',
          blueHover: '#3D78E6',
          cyan: '#4FD8FF',
          cyanMuted: 'rgba(79, 216, 255, 0.15)',
        },
        txt: {
          main: '#F5F7FB',
          secondary: '#8B99AF',
          muted: '#627189',
        },
        border: {
          dark: '#1D2B40',
          subtle: '#263750',
        },
        status: {
          available: '#10B981',
          occupied: '#4F8CFF',
          cleaning: '#F59E0B',
          maintenance: '#EF4444',
          reserved: '#A855F7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px -4px rgba(79, 140, 255, 0.25)',
        'glow-cyan': '0 0 20px -4px rgba(79, 216, 255, 0.25)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
