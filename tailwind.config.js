/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['DM Mono', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif']
      },
    },
  },
  plugins: [],
}

