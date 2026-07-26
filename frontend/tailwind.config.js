/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: {
          bg: 'oklch(0.1344 0 0)',
          fg: 'oklch(0.9842 0.0034 247.8578)',
        },
        surface: {
          bg: 'oklch(0.1913 0 0)',
          fg: 'oklch(0.9276 0.0058 264.5313)',
          muted: {
            bg: 'oklch(0.252 0 0)',
            fg: 'oklch(0.7118 0.0129 286.0665)',
          },
        },
        primary: {
          bg: 'oklch(0.8717 0.0093 258.3383)',
          fg: 'oklch(0.1448 0 0)',
        },
        secondary: {
          bg: 'oklch(0.5517 0.0138 285.9384)',
          fg: 'oklch(1 0 0)',
        },
        accent: {
          bg: 'oklch(0.349 0.2900 293.5412)',
          fg: 'oklch(0.95 0 281.2883)',
        },
        success: {
          color: 'oklch(0.8003 0.1821 151.711)',
          fg: 'oklch(0.2664 0.0628 152.9343)',
        },
        warning: {
          color: 'oklch(0.8369 0.1644 84.4286)',
          fg: 'oklch(0.2791 0.0742 45.6352)',
        },
        danger: {
          color: 'oklch(0.7106 0.1661 22.2162)',
          fg: 'oklch(0.2575 0.0886 26.0418)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}