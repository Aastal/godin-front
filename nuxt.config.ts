import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineNuxtConfig({
  devtools: { enabled: process.env.NUXT_PUBLIC_NODE_ENV === 'dev' },
  ssr: true,
  app: {
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
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Godin SAS' },
        { property: 'og:local', content: 'fr' },
        { hid: 'og:title', property: 'og:title', content: 'Godin SAS' },
        {
          hid: 'og:image',
          property: 'og:image',
          content: process.env.NUXT_PUBLIC_BASE_URL + '/logo-name.svg',
        },
        {
          hid: 'og:image:type',
          property: 'og:image:type',
          content: 'image/svg+xml',
        },
        { hid: 'og:image:width', property: 'og:image:width', content: '1200' },
        { hid: 'og:image:height', property: 'og:image:height', content: '627' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: process.env.NUXT_PUBLIC_BASE_URL,
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.svg' }],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    pageTransition: {
      name: 'slide-right',
      mode: 'out-in',
    },
  },
  css: ['@/assets/sass/main.scss'],
  plugins: ['~/plugins/click-outside.ts', '~/plugins/sentry.client.ts'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  vite: {
    plugins: [
      VueI18nVitePlugin({
        strictMessage: false,
        include: [
          resolve(
            dirname(fileURLToPath(import.meta.url)),
            './translations/*.json',
          ),
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use 'sass:math';
            @use "~/assets/sass/utils/vars.scss" as *;
            @use "~/assets/sass/utils/fonts.scss" as *;
            @use "~/assets/sass/utils/mixin.scss" as *;
            @import "@/assets/sass/utils/helpers.scss";
          `,
        },
      },
    },
  },
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', 'nuxt-swiper'],
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
    strategy: 'prefix',
    customRoutes: 'config',
    vueI18n: './i18n.config.ts',
    pages: {
      history: {
        en: '/history',
        fr: '/histoire',
      },
      benefit: {
        fr: '/prestations',
        en: '/benefit',
      },
      silos: {
        fr: '/silos',
        en: '/silos',
      },
      boilermaking: {
        fr: '/chaudronnerie',
        en: '/boilermaking',
      },
      contact: {
        fr: '/contact',
        en: '/contact',
      },
      quotation: {
        fr: '/devis',
        en: '/quotation',
      },
    },
  },
  swiper: {},
  runtimeConfig: {
    public: {
      env: process.env.NUXT_PUBLIC_NODE_ENV,
      host: process.env.NUXT_PUBLIC_BASE_URL,
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      cloudfrontUrl: process.env.NUXT_PUBLIC_CLOUDFRONT_ASSETS,
      googleKey: process.env.NUXT_PUBLIC_GOOGLE_API_KEY,
      sentryDsn: process.env.NUXT_PUBLIC_SENTRY_DSN,
      sentryEnv: process.env.NUXT_PUBLIC_SENTRY_ENVIRONMENT,
    },
  },
  build: {
    transpile: ['vue-i18n'],
  },
})
