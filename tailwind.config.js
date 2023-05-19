/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "500px",
      md: "800px",
      lg: "1100px",
      xl: "1440px",
    },
    extend: {
      colors: {
        red: "#F24A4E",
        white: "#fff",
        bcolor: "#ccc",
        lblack: "#777",
        black: "#111",
        input: "#efefef",
        green: "#60CE64",
        blue: "#1593EE",
      },
    },
  },
  plugins: [],
};
