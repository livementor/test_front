export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'test-lm-1',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://d1myxu64ohxs53.cloudfront.net/mikado/edge/css/mikado.min.css' },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/i18n.js',
  ],

  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}',
      },
    },
  },

  router: {
    middleware: ['auth'],
  },
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyB_5oeJ0BPFXwzE8odtTi2mvl2ucNxdqpU',
          authDomain: 'test-tech-lm.firebaseapp.com',
          databaseURL: 'https://test-tech-lm.firebaseio.com',
          projectId: 'test-tech-lm',
          storageBucket: 'test-tech-lm.appspot.com',
          messagingSenderId: '689214158912',
          appId: '1:689214158912:web:eddc1bd01daaef0ff0c7a5',
        },
        services: {
          auth: {
            persistence: 'local', // default
            initialize: {
              onAuthStateChangedMutation: 'users/ON_AUTH_STATE_CHANGED_MUTATION',
              onAuthStateChangedAction: 'users/onAuthStateChangedAction',
              subscribeManually: false,
            },
            ssr: false, // default

          },
          firestore: true,
        },
      },
    ],
  ],
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
}
