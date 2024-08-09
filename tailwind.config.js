/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "lightmode": "#ead6d6",
        "darkmode": "#3f2727",

      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        customshadow: ' 6px 6px 12px #120d0d,-6px -6px 12px #463535',
        buttonclick: 'inset 5px 5px 10px #120d0d,inset -5px -5px 10px #463535;',
        lightmode: '5px 5px 7px #5e5656,-5px -5px 7px #ffffff',
        lightmodeclick: 'inset 5px 5px 10px #5e5656,inset -5px -5px 10px #ffffff'
      }
    },
  },
  plugins: [],
};

