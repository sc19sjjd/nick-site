// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

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