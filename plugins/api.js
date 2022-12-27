import { setClient as NodeClient } from '../services/node'

export default function ({ $axios, store, redirect, app, $sentry }) {
  const api = $axios.create({
    baseURL: process.env.apiUrl,
  })

  api.interceptors.request.use(
    (config) => {
      if (
        store.getters['auth/isAuthenticated'] &&
        config.url !== 'oauth/token'
      ) {
        config.headers.Authorization = `Bearer ${store.getters['auth/token']}`
      }

      return config
    },
    (err) => {
      return Promise.reject(err)
    }
  )

  api.interceptors.response.use(
    (response) => {
      return response
    },
    function (err) {
      try {
        const config = err.config
        if (
          err.response &&
          err.response.status === 401 &&
          config.url === 'oauth/token' &&
          !err.config?.data?.includes('password_email')
        ) {
          return redirect({ path: app.localePath('auth-logout') })
        }

        if (
          err.response &&
          err.response.status === 401 &&
          !config._retry &&
          store.getters['auth/refreshToken']
        ) {
          config._retry = true

          store
            .dispatch('auth/refreshSession')
            .then(() => {
              const token = store.getters['auth/token']
              if (token) {
                config.headers.Authorization = `Bearer ${token}`
                app.$cookies.set('token', token)
                app.$cookies.set(
                  'refresh_token',
                  store.getters['auth/refreshToken']
                )

                return $axios(config)
              }
            })
            .catch((e) => {
              $sentry.captureException(e)
            })
        }

        return Promise.reject(err)
      } catch (e) {
        $sentry.captureException(e)
        return Promise.reject(err)
      }
    }
  )

  NodeClient(api)
}
