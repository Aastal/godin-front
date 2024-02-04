import { defineStore } from 'pinia'
import QuotationNodeProvider from '~/services/api/quotation/QuotationNodeProvider'
import type { CreatePayload } from '~/services/api/shared/CreatePayload'

export const useQuotationStore = defineStore('quotation', {
  state: () => {
    return {
      loading: false,
      error: null,
      items: {} as Record<string, any>,
    }
  },
  getters: {
    isLoading: (state) => state.loading,
  },
  actions: {
    async post(payload: CreatePayload) {
      const response = await QuotationNodeProvider.post(payload)

      return response.data
    },
  },
})
