module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5c6ac4",
        accent: "#017ace",
        warn: "#de3618",
      },
      space: {
        "5px": "5px",
        "6px": "6px",
      },
    },
  },
  plugins: [],
};
