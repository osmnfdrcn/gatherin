/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "steel-blue": "#3e7aa1",
        "fushia-400": "#ff0082",
        "fushia-500": "#d9006f",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
