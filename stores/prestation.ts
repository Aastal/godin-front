import type { FilterParam } from '~/services/api/shared/FilterParam'
import { defineStore } from 'pinia'
import PrestationNodeProvider from '~/services/api/prestation/PrestationNodeProvider'
import { mergeAttributes } from '~/utils/attributes'

export const usePrestationStore = defineStore('prestation', {
  state: () => {
    return {
      loading: false,
      error: null,
      items: {} as Record<string, any>,
    }
  },
  actions: {
    async fetchAll(filters?: Array<FilterParam>, include?: string[]) {
      const response = await PrestationNodeProvider.fetchAll(filters, include)
      const data = response.data

      data.forEach((item) => {
        Object.assign(this.items, {
          [item.id]: mergeAttributes(response, item),
        })
      })

      return data
    },
  },
})
