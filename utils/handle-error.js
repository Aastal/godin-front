import { ACTIONS } from './actions'

const handleError = (commit, e) => {
  commit(ACTIONS.TOGGLE_LOADING)

  let error = e
  if (e.response && e.response.data) {
    if (e.response.data.error) {
      error = e.response.data.error
    } else if (e.response.data.code) {
      error = e.response.data.code
    } else if (e.response.data.detail) {
      error = e.response.data.detail
    } else if (e.response.data.meta && e.response.data.meta.message) {
      error = e.response.data.meta.message
    } else {
      error = e.response.data
    }
  }

  commit(ACTIONS.SET_ERROR, error)

  return Promise.reject(error)
}

export function sentryNormalizeException(exception) {
  if (!exception.errors) {
    return exception
  }

  const error = exception.errors[0]

  return {
    name: error.title,
    message: error.detail,
  }
}

export function displayError(error) {
  const managedError = {
    type: '',
    severity: '',
    message: '',
  }

  if (error.meta?.message) {
    managedError.type = 'custom'
    managedError.message = error.meta.message
  } else {
    managedError.type = error.type ? error.type : 500
    managedError.severity = error.severity ? error.severity : 'error'
    managedError.message =
      managedError.type !== 500 ? error.message : 'app.error.unknow'
  }

  return managedError.message
}

export default handleError
