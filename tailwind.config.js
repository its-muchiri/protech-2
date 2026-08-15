/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
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
        accent: {
          50: '#FFF7ED',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#EA580C',
          600: '#c2470a',
          700: '#9a3412',
          800: '#7c2d12',
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
      borderRadius: {
        card: '8px',
        btn: '6px',
      },
    },
  },
  plugins: [],
};
