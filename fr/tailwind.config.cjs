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
    },
  },
  plugins: [],
}
}