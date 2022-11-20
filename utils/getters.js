import { getField } from 'vuex-map-fields'

export const GETTERS = {
  getField,
  items: state => state.items,
  error: state => state.error,
  isLoading: state => state.isLoading,
  hasItems: state => Object.keys(state.items).length > 0,
  count: state => Object.keys(state.masterclasses).length,
  find: state => (id) => {
    return state.items[id]
  },
  findOneBy: state => (field, value) => {
    return Object.values(state.items).find((el) => {
      return el[field] === value
    })
  },
  findBy: state => (field, value) => {
    return Object.values(state.items).filter((el) => {
      return el[field] === value
    })
  }
}
