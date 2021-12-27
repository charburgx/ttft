const { BreakpointsPx } = require("./helpers/breakpoints");
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./components/**/*.{tsx,js,jsx,ts,vue,blade.php}', './pages/**/*.{tsx,js,jsx,ts,vue,blade.php}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
      screens: BreakpointsPx,
      colors: {
            'bg': {
                '50': '#F9F8F1',
                '100': '#F8F6E3',
                '200': '#CFC499',
                '500': '#6F6D4F',
            },
            'main': {
                '50': '#A8B3B4',
                '200': '#2A5672',
                '300': '#383F42',
            },
            'aqua': {
                '200': '#08646F',
                '100': '#29A3A8',
                '50': '#29A3A8'
            },
            'acc': {
                '2': '#71B0A5',
                '2-dark': '#4a877d',
                '3': '#B36345',
            },
            'form': {
                'out1': 'hsl(0, 0%, 80%)',
                'out2': 'hsl(0, 0%, 70%)',
                'err': colors.red
            },
            'rc': { // related card
                'hdr': '#384041',
                'content': '#70ACA3'
            },
            'gray': colors.gray,
            'black': '#000000',
            'white': '#FFFFFF',
            'none': 'transparent'
      },
      extend: {
          spacing: {
              'sm': '1rem',
              'pcp': '0.75rem', // post card padding
              'rcp': '1rem' // related card padding
          },
          fontFamily: {
              'sans-title': [ 'Source Sans Pro', 'ui-sans-serif', 'sans-serif' ],
              'sans': [ 'Source Sans Pro', 'ui-sans-serif', 'sans-serif' ]
          },
          borderRadius: {
              'rc': '0.125rem' // related card
          }
      },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@mertasan/tailwindcss-variables')],
}
