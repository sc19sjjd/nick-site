// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano:
        process.env.NODE_ENV === 'production'
         ? { preset: ['default', { discardComments: { removeAll: true } }] }
         : false, // disable cssnano when not in production
    },
 },

  app: {
    head: {
      title: 'Nicholas Clay',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Nicholas Clay - 3D modelling and animation' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      script: [
        { src: 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js' }
      ]
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  tailwindcss: {
    configPath: '~/config/tailwind.config.js'
  },

  googleFonts: {
    download: true,
    fontsDir: '~/assets/fonts',
    stylePath: '~/assets/css/google-fonts.css',
    families: {
      'Archivo Black': 400,
      'Archivo': {
        wght: '200..700',
      },
      'Outfit': {
        wght: '200..700',
      }
    }
  },

  css: ['~/assets/css/main.css']
})