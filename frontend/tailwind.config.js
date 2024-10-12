/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { "50": "#f0fdf4", "100": "#dcfce7", "200": "#bbf7d0", "300": "#86efac", "400": "#4ade80", "500": "#22c55e", "600": "#16a34a", "700": "#15803d", "800": "#166534", "900": "#14532d", "950": "#052e16" }
      },
      keyframes: {
        cart: {
          '0%': { left: '-10%' },
          '40%': { left: '50%' }, // Use 40% as a single keyframe for clarity
          '60%': { left: '50%' }, // Ensure both keyframes are the same for sync
          '100%': { left: '120%' },
        },
        box: {
          '0%': { top: '-50%', left: '54%' }, // Ensure initial left is the same as cart
          '40%': { top: '-50%', left: '54%' }, // Keep box position the same
          '60%': { top: '10%', left: '54%' },  // Match this with cart's 40%
          '100%': { top: '10%', left: '120%' }, // Align the end position
        },
        txt1: {
          '0%': { opacity: '1' },
          '20%, 100%': { opacity: '0' },
        },
        txt2: {
          '0%, 80%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        cart: 'cart 1.7s ease-in-out forwards',
        box: 'box 1.7s ease-in-out forwards',
        txt1: 'txt1 1.7s ease-in-out forwards',
        txt2: 'txt2 1.7s ease-in-out forwards',
      },
    },
    fontFamily: {
      'body': [
        'Nunito Sans',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      'sans': [
        'Nunito Sans',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  },
  plugins: [],
};
