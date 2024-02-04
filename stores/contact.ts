import { defineStore } from 'pinia'
import ContactNodeProvider from '~/services/api/contact/ContactNodeProvider'
import type { CreatePayload } from '~/services/api/shared/CreatePayload'

export const useContactStore = defineStore('contact', {
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
      const response = await ContactNodeProvider.post(payload)

      return response.data
    },
  },
})
