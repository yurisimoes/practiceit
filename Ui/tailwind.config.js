const {guessProductionMode} = require('@ngneat/tailwind');
process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
  content: ['./src/**/*.{html,ts,css,scss,sass,less,styl}'],
  theme: {
    extend: {
      colors: {
        primary: '#3968ED',
        secondary: '#003295',
      },
    },
    screens: {
      'dd': '824px'
    }
  },
  variants: {
    textColor: ['hover'],
    borderColor: ['hover'],
    extend: {
      backgroundColor: ['even'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}
