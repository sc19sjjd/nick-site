/** @type {import('tailwindcss').Config} */

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#E85617',
        background: '#0C0C0C',
        backgroundSecondary: { 
          DEFAULT:'#EFE2CE',
          dark: '#C2B49E',
        },
        text: '#FFFFFF',
        accent: '#DBA014',
        grey: '#262626',
        lightGrey: '#838383',
      },

      screens: {
        '2xs': '375px',
        xs: '480px',
        xl: '1280px',
        '2xl': '1536px',
      },

      fontSize: {
        '10xl': '10rem',
        '9xl': '7.7rem',
        '7.5xl': '4.7rem',
      }
    }
  }
}