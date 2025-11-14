// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/google-fonts', {
      families: {
        'Open+Sans': [400, 500, 600, 700]
      }
    }]
  ],
  runtimeConfig: {
    // Server-only config, not exposed to client
    feedbackEndpoint: 'https://script.google.com/macros/s/AKfycbxdTj6g1qcbJDohzdrTsVEzL_WxbhahOuihFPUsqP2YcKEnCeJ4eoHDsOH6S2Epl7Zn/exec'
  }
})
