import handleError from './handle-error'

const ACTIONS = {
  ADD: 'ADD',
  REGISTER: 'REGISTER',
  SET_UUID: 'SET_UUID',
  SET_ERROR: 'SET_ERROR',
  RESET_LIST: 'RESET_LIST',
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  SET_UPDATED: 'SET_UPDATED',
  SET_DELETED: 'SET_DELETED',
  SET_FILTERS: 'SET_FILTERS',
  LAST_REQUEST: 'LAST_REQUEST',
  CANCEL: 'CANCEL',
}

export function appendClientCancelToken(
  service,
  currentParams = {},
  currentFilter = '',
  currentInclude = ''
) {
  const clientCancelToken = service.cancel()
  const params = currentParams
  const filter = currentFilter
  const include = currentInclude
  params.cancelToken = clientCancelToken.token

  return { params, filter, include, clientCancelToken }
}

export default function actionList(service) {
  return {
    find: async ({ commit }, { id, params }) => {
      commit(ACTIONS.TOGGLE_LOADING)

      try {
        const response = await service.find(id, params)
        const retrieved = response.data
        commit(ACTIONS.TOGGLE_LOADING, false)
        commit(ACTIONS.ADD, { item: retrieved.data, retrieved })

        return retrieved
      } catch (e) {
        return handleError(commit, e)
      }
    },
    findAll: async ({ commit, state }, { params, filter, include }) => {
      commit(ACTIONS.TOGGLE_LOADING)

      try {
        let response
        if (params) {
          const {
            params: p,
            filter: f,
            include: i,
            clientCancelToken,
          } = appendClientCancelToken(service, params, filter, include)
          commit(ACTIONS.LAST_REQUEST, { cancel: clientCancelToken })
          response = await service.findAll(p, f, i)
        } else {
          response = await service.findAll()
        }
        const retrieved = response.data
        commit(ACTIONS.TOGGLE_LOADING, false)

        if (state.resetList === true) {
          commit(ACTIONS.RESET_LIST)
        }

        retrieved.data.forEach((item) => {
          commit(ACTIONS.ADD, { item, retrieved })
        })

        return retrieved
      } catch (e) {
        return handleError(commit, e)
      }
    },
    create: ({ commit }, values) => {
      commit(ACTIONS.TOGGLE_LOADING)

      return service
        .create(values)
        .then((response) => response.data)
        .then((retrieved) => {
          commit(ACTIONS.TOGGLE_LOADING, false)
          commit(ACTIONS.ADD, { item: retrieved.data, retrieved })
        })
        .catch((e) => handleError(commit, e))
    },
    update: ({ commit }, item) => {
      commit(ACTIONS.TOGGLE_LOADING)

      return service
        .update(item)
        .then((response) => response.data)
        .then((retrieved) => {
          commit(ACTIONS.TOGGLE_LOADING, false)
          retrieved
            ? commit(ACTIONS.SET_UPDATED, { item: retrieved.data, retrieved })
            : commit(ACTIONS.SET_DELETED, item)
        })
        .catch((e) => handleError(commit, e))
    },
    del: ({ commit }, item) => {
      commit(ACTIONS.TOGGLE_LOADING)

      return service
        .del(item)
        .then(() => {
          commit(ACTIONS.TOGGLE_LOADING, false)
          commit(ACTIONS.SET_DELETED, item)
        })
        .catch((e) => handleError(commit, e))
    },
    cancel: ({ commit, state }) => {
      if (state.lastRequest) {
        commit(ACTIONS.CANCEL)
      }
    },
  }
}

export { ACTIONS, actionList }
