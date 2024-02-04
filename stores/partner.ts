import { defineStore } from 'pinia'
import PartnerNodeProvider from '~/services/api/partner/PartnerNodeProvider'
import type { FilterParam } from '~/services/api/shared/FilterParam'
import { mergeAttributes } from '~/utils/attributes'

export const usePartnerStore = defineStore('partner', {
  state: () => {
    return {
      loading: false,
      error: null,
      items: {} as Record<string, any>,
    }
  },
  actions: {
    async fetchAll(filters?: Array<FilterParam>, include?: string[]) {
      const response = await PartnerNodeProvider.fetchAll(filters, include)
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
