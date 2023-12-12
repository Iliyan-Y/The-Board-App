/** @type {import('tailwindcss').Config} */
import * as daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    daisyui: {
      themes: ["light", "dark", "black"],
    },
  },
  plugins: [daisyui],
};
