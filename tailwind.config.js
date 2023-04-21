/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "hsla(19, 100%, 50%, 1)",
      },
      boxShadow: {
        button: "0 0 0.2rem 0.2rem rgb(245, 131, 106, 0.2)",
      },
      backgroundColor: {
        "gh-gray": "#21262d",
      }
    },
  },
  plugins: [],
  important: true,
};
