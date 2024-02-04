import * as Sentry from '@sentry/browser'

export default defineNuxtPlugin((nuxtApp) => {
  Sentry.init({
    dsn: nuxtApp.$config.public.sentryDsn,
    environment: nuxtApp.$config.public.sentryEnv,
    tracesSampleRate: nuxtApp.$config.public.env === 'dev' ? 1.0 : 0.1,
    enableTracing: nuxtApp.$config.public.env !== 'dev',
  })
})
