const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "hsla(19, 100%, 50%, 1)",
        lightOrange: "hsla(19, 100%, 50%, 0.5)"
      },
      boxShadow: {
        button: "0 0 0.2rem 0.2rem rgb(245, 131, 106, 0.2)",
      },
      backgroundColor: {
        "gh-gray": "#21262d",
        "gh-white": "#f6f8fa"
      }
    },
  },
  plugins: [
    // plugin for centering dividers
    // usage: <div class=" divide-white divide-y divider-y-center-2"></div>
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'divider-x-center': (value) => {
            return {
              "& > :not([hidden]):first-child": {
                paddingLeft: 0,
              },
              "& > :not([hidden])": {
                paddingLeft: value,
                paddingRight: value,
              },
              "& > :not([hidden]):last-child": {
                paddingRight: 0,
              },
            };
          },
          'divider-y-center': (value) => {
            return {
              "& > :not([hidden]):first-child": {
                paddingTop: 0,
              },
              "& > :not([hidden])": {
                paddingTop: value,
                paddingBottom: value,
              },
              "& > :not([hidden]):last-child": {
                paddingBottom: 0,
              },
            };
          }
        },
        { values: theme('padding') }
      )
    })
  ],
  important: true,
  darkMode: "class"
};
