module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        destinationBlue: "#1E3A8A",   // a deep blue
        destinationOrange: "#F97316", // vibrant sunset orange
        destinationSand: "#F9A826",   // warm, sandy tone
        destinationGray: "#E5E7EB",   // light gray for contrast
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'], // strong display font for headers
      },
      // Custom animations & keyframes
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideUp: "slideUp 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
