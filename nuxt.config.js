import i18n from './config/i18n'

export default {
  dev: process.env.NODE_ENV !== 'production',
  target: 'static',
  ssr: false,
  generate: {
    subFolders: false
  },
  env: {
    host: process.env.VUE_APP_BASE_URL
  },
  head: {
    title: 'Godin',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.svg' }],
  },
  css: [
    '@/assets/sass/main.scss'
  ],
  plugins: [
    '~/plugins/click-outside.js',
  ],
  components: {
    dirs: [
      '~/components',
      '~/components/appbar'
    ]
  },
  buildModules: [
    [
      'nuxt-i18n', {
      vueI18nLoader: true,
      defaultLocale: 'fr',
      vueI18n: i18n,
      locales: [
        {
          code: 'en',
          name: 'English'
        },
        {
          code: 'fr',
          name: 'Français'
        }
      ]
    }
    ]
  ],
  styleResources: {
    scss: [
      '@/assets/sass/utils/fonts.scss',
      '@/assets/sass/utils/mixin.scss',
      '@/assets/sass/utils/vars.scss'
    ]
  },
  layoutTransition: {
    name: 'layouts',
    mode: 'out-in'
  },
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: '/',
  },
  build: {},
}
