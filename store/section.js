import service from '../services/section'
import { actionList } from '~/utils/actions'
import { MUTATIONS } from '~/utils/mutations'
import { GETTERS } from '~/utils/getters'

const initialState = () => ({
  isLoading: false,
  error: null,
  items: {},
})

export default {
  actions: {
    ...actionList(service),
  },
  getters: {
    ...{ ...GETTERS },
    sectionByPage: (state) => (page) => {
      return Object.values(state.items).filter((el) => {
        return el.field_page === page
      })
    },
  },
  mutations: {
    ...{ ...MUTATIONS },
  },
  namespaced: true,
  state: initialState,
}
