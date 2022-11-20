import i18n from './config/i18n'

export default {
  dev: process.env.NODE_ENV !== 'production',
  target: 'static',
  ssr: false,
  generate: {
    subFolders: false,
    ignore: [
      '.nuxt',
      'static',
      'dist',
      'node_modules',
      '.**/*',
      '.*',
      'README.md'
    ],
    fallback: 'index.html'
  },
  env: {
    host: process.env.VUE_APP_BASE_URL,
    apiUrl: process.env.VUE_APP_API_URL,
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
  css: ['@/assets/sass/main.scss'],
  plugins: [
    { src: '~/plugins/axios.js', ssr: true },
    { src: '~/plugins/api.js', ssr: true },
    { src: '~/plugins/click-outside.js', ssr: false },
  ],
  components: {
    dirs: ['~/components', '~/components/appbar'],
  },
  buildModules: [
    [
      'nuxt-i18n',
      {
        vueI18nLoader: true,
        defaultLocale: 'fr',
        vueI18n: i18n,
        locales: [
          {
            code: 'en',
            name: 'English',
          },
          {
            code: 'fr',
            name: 'Français',
          },
        ],
      },
    ],
  ],
  styleResources: {
    scss: [
      '@/assets/sass/utils/vars.scss',
      '@/assets/sass/utils/fonts.scss',
      '@/assets/sass/utils/mixin.scss',
    ],
  },
  layoutTransition: {
    name: 'page',
    mode: 'out-in',
  },
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/sentry'
  ],
  axios: {
    baseURL: '/',
  },
  build: {
    standalone: true,
    minimize: true,
    splitChunks: {
      layouts: false,
      pages: true,
      commons: true
    },
    transpile: [({ isLegacy }) => isLegacy && 'ky'],
    filename: '[name].[hash].bundle.js'
  },
  sentry: {
    publishRelease: true,
    dsn: 'https://22c5874a44bf4ff498cca80f399ef10f@o4504192278528000.ingest.sentry.io/4504192286654464',
    tracesSampleRate: process.env.VUE_APP_NODE_ENV === 'dev' ? 1.0 : 0.1,
    sourceMapStyle: 'hidden-source-map',
    config: {
      environment: process.env.VUE_APP_NODE_ENV
    }
  }
}
