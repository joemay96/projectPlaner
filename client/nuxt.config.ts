export default defineNuxtConfig({
//   target: 'static', // -> definetly static, when that is possible. 
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', 'nuxt-icon', '@formkit/auto-animate/nuxt', '@pinia/nuxt'],
  // tailwindcss: {
  // 	cssPath: '~/assets/css/tailwind.css',
  // 	viewer: true,
  // },
  colorMode: {
      preference: 'light', // default theme
      dataValue: 'theme', //active data-theme in <html> tag
  },
  runtimeConfig: {
      public: {},
  },
  app: {
      head: {
          title: 'Simple Project Planer',
          htmlAttrs: {
              lang: 'en',
          },
          meta: [
              { charset: 'utf-8' },
              {
                  name: 'viewport',
                  content: 'width=device-width, initial-scale=1',
              },
              { hid: 'description', name: 'description', content: '' },
              { name: 'format-detection', content: 'telephone=no' },
          ],
          link: [
              {
                  rel: 'icon',
                  type: 'image/x-icon',
                  href: '/penguin/icon-96.png',
              },
          ],
      },
      pageTransition: {
        name: "page", mode: "out-in"
      },
  },
  imports: {
    dirs: ['./store'],
  },

  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
});
