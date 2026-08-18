/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New Premium Blue-Purple-Black Palette
        primary: {
          50: '#E8EBF5',
          100: '#D1D9ED',
          200: '#A3B3DB',
          300: '#758DC9',
          400: '#4767B7',
          500: '#1941A5',
          600: '#0D47A1',     // Primary Blue
          700: '#0A3881',
          800: '#072961',
          900: '#051A41',
        },
        secondary: {
          50: '#F3EBF8',
          100: '#E7D7F1',
          200: '#CFAFE3',
          300: '#B787D5',
          400: '#9F5FC7',
          500: '#8737B9',
          600: '#6A1B9A',     // Secondary Purple
          700: '#54157A',
          800: '#3D0F5A',
          900: '#260A3A',
        },
        accent: {
          50: '#FDF8F0',
          100: '#FBEFD1',
          200: '#F7DFA3',
          300: '#F3CF75',
          400: '#EFBF47',
          500: '#D4AF37',     // Accent Gold
          600: '#B8942E',
          700: '#9C7925',
          800: '#7F5E1C',
          900: '#634313',
        },
        surface: {
          50: '#F5F7FA',      // Neutral Light
          100: '#E8EBF0',     // Neutral Medium
          200: '#D1D5DB',
          300: '#9CA3AF',
          400: '#6B7280',
          500: '#4B5563',
          600: '#374151',
          700: '#1F2937',
          800: '#111827',
          900: '#1A1A1A',     // Deep Black / Text Dark
        },
        text: {
          dark: '#1A1A1A',    // Text Dark
          muted: '#5A6C7D',   // Text Muted
        },
        error: {
          500: '#D32F2F',     // Support Red
        },
        // Legacy colors (keeping for backward compatibility)
        primary_legacy: {
          50: '#F0FDF4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#15803D',
          600: '#0F4C2C',
          700: '#0a3820',
          800: '#062414',
          900: '#03120a',
        },
        accent_legacy: {
          50: '#FFF7ED',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#EA580C',
          600: '#c2470a',
          700: '#9a3412',
          800: '#7c2d12',
          850: '#6a250a',
          900: '#5a1f0d',
        },
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#0B1F3A',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
        serif: ['Source Serif 4', 'Georgia', 'Times New Roman', 'serif'],
        editorial: ['Playfair Display', 'Georgia', 'serif'],
      },
      spacing: {
        'space-xs': '4px',
        'space-sm': '8px',
        'space-md': '12px',
        'space-lg': '16px',
        'space-xl': '24px',
        'space-2xl': '32px',
        'space-3xl': '48px',
        'space-4xl': '64px',
      },
      borderRadius: {
        'radius-sm': '4px',
        'radius-md': '8px',
        'radius-lg': '12px',
        'radius-xl': '16px',
        'radius-2xl': '20px',
        'radius-full': '9999px',
      },
      boxShadow: {
        'shadow-sm': '0 2px 8px rgba(13, 71, 161, 0.08)',
        'shadow-md': '0 4px 12px rgba(13, 71, 161, 0.1)',
        'shadow-lg': '0 8px 24px rgba(106, 27, 154, 0.15)',
        'shadow-hover': '0 12px 32px rgba(106, 27, 154, 0.2)',
        'shadow-xl': '0 16px 48px rgba(13, 71, 161, 0.12)',
      },
      fontSize: {
        'heading-xl': ['clamp(2.5rem, 5vw, 3.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'heading-lg': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.25' }],
        'heading-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.3' }],
        'heading-sm': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.35' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body-base': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
      },
      borderRadius: {
        'radius-sm': '4px',
        'radius-md': '8px',
        'radius-lg': '12px',
        'radius-xl': '16px',
        'radius-2xl': '20px',
        'radius-full': '9999px',
      },
    },
  },
  plugins: [],
};