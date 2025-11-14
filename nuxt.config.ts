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
    feedbackEndpoint: 'https://script.google.com/macros/s/AKfycbyVWuw5hlbgbbYPMHfDLF4ARWjArUufWL8JqIVx3HYsFj95gKpyEFi9_2OGuAB8NptW/exec'
  }
})
