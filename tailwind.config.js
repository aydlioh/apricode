/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono Variable', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        secondary: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--foreground))',
        accent: 'hsl(var(--accent))',
      }
    },
  },
  plugins: [],
};
