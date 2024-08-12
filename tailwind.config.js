/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        dark: '#222222',
        grey: '#333333',
        purple: '#b700ff',
      },
      backgroundImage: {
        'space': "url('/space.jpg')",
      },
      fontFamily: {
        'ubuntu': ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

