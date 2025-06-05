/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,jpg,avif}",
  ],
  theme: {
    extend: { 
      backgroundImage:
      {
        'dark':"url('/src/assets/bgdk.jpg')",
        'dark2':"url('/src/assets/bgdk2.jpg')",
        'lit':"url('/src/assets/dark1.jpg')",
      },
      fontFamily: {
        'ft':["times new roman","ft", "serif"],
    }, keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
      },
  },
  plugins: [],
}
}