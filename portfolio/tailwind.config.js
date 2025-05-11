module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0a0a0a",
        secondary: "#7000ff",
        accent: "#00ffaa",
        dark: "#050505",
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00ffaa' },
          '100%': { boxShadow: '0 0 20px #00ffaa, 0 0 30px #7000ff' },
        }
      }
    },
  },
  plugins: [],
}