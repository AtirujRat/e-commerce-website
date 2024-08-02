/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    textColor: {
      header: "#00ffff",
      topic: "#eb9834",
      paragraph: "#b1b1b1",
    },

    boxShadow: {
      "3xl": "10px 10px 5px -1px rgba(15,15,15,1);",
    },
  },
  plugins: [],
};
