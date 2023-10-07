import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors")

export default <Partial<Config>>{
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js"
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
    fontFamily: {
      raleway: ["Raleway", "sans"],
    },
    extend: {
      colors: {
        "vtd-primary": colors.sky, // Light mode Datepicker color
        "vtd-secondary": colors.gray, // Dark mode Datepicker color
        light: "#C4C4C4",
        primary: {
          50: "#DDF2DE",
          100: "#C0E3C9",
          200: "#A3D2B4",
          300: "#87C3A0",
          400: "#6DB48B",
          500: "#568E6F",
          600: "#3D6951",
          700: "#264233",
          800: "#0D1C15",
        },
      },
      screens: {
        "is-hover": { raw: "(hover: hover)" },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

