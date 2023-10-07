export default defineNuxtConfig({
//   target: 'static',
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', 'nuxt-icon'],
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
                //   type: 'image/x-icon',
                  href: '/public/favicon.ico',
              },
          ],
      },
  },
});
