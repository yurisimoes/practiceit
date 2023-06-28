const {guessProductionMode} = require('@ngneat/tailwind');
process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
  content: ['./src/**/*.{html,ts,css,scss,sass,less,styl}'],
  theme: {
    extend: {},
  },
  screens: {
    'dd': '824px'
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}
