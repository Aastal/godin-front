import service from '../services/prestation'
import { actionList } from '~/utils/actions'
import { MUTATIONS } from '~/utils/mutations'
import { GETTERS } from '~/utils/getters'

const initialState = () => ({
  isLoading: false,
  error: null,
  items: {}
})

export default {
  actions: {
    ...actionList(service)
  },
  getters: {
    ...{ ...GETTERS }
  },
  mutations: {
    ...{ ...MUTATIONS }
  },
  namespaced: true,
  state: initialState
}
