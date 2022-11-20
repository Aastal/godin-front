import Vue from 'vue'
import { updateField } from 'vuex-map-fields'
import { ACTIONS } from './actions'
import relationMapper from '~/utils/relation-mapper'

export function mergeAttributes (retrieved, item, customAttributes = null) {
  if (item.id) {
    item.attributes.id = item.id
  }
  let attributes = { ...item.attributes, ...customAttributes }
  if (retrieved) {
    const relations = relationMapper.findRelations(retrieved, item)
    if (relations) {
      attributes = { ...attributes, ...relations }
    }
  }

  return attributes
}

export const MUTATIONS = {
  updateField,
  [ACTIONS.TOGGLE_LOADING]: (state, force) => {
    Object.assign(state, { error: '', isLoading: force || !state.isLoading })
  },
  [ACTIONS.SET_ERROR]: (state, error) => {
    Object.assign(state, { error, isLoading: false })
  },
  [ACTIONS.ADD]: (state, { item, retrieved, customAttributes }) => {
    Vue.set(state.items, item.id, mergeAttributes(retrieved, item, customAttributes))
  },
  [ACTIONS.SET_UPDATED]: (state, { item, retrieved, customAttributes }) => {
    Object.assign(state.items, {
      [item.id]: mergeAttributes(retrieved, item, customAttributes)
    })
  },
  [ACTIONS.SET_DELETED]: (state, deleted) => {
    Vue.delete(state.items, deleted.id)
  },
  [ACTIONS.RESET_LIST]: (state) => {
    Object.assign(state, {
      items: {}
    })
  },
  [ACTIONS.LAST_REQUEST]: (state, lastRequest) => {
    Object.assign(state, { lastRequest: lastRequest.cancel })
  },
  [ACTIONS.CANCEL]: (state) => {
    state.lastRequest.cancel()
  }
}
