/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", // Your entry point
    "./screens/**/*.{js,jsx,ts,tsx}", // Screens
    "./components/**/*.{js,jsx,ts,tsx}", // Components
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
