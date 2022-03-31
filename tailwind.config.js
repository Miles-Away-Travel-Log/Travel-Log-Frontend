module.exports = {
    corePlugins: {
      // ...
    textDecoration: false,
    },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
