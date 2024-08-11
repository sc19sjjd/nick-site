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
        xsm: '480px',
        xl: '1250px',
      }
    }
  }
}