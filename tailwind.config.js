/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      backgroundColor: {
        "gray-400-5": "rgba(156, 163, 175, 0.05)",
        "custom-gray": "#202124",
      },
      textColor: {
        "custom-red": "#E84545",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
