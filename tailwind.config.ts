import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    "./public/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
