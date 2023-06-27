const { guessProductionMode } = require('@ngneat/tailwind');
process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
  purge: {
    content: ['./src/**/*.{html,ts,css,scss,sass,less,styl}'],
  },
  darkMode: false,
  theme: {
    extend: {},
  },
  screens: {
    'dd': '824px'
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}

