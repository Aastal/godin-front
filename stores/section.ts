import { defineStore } from 'pinia'
import SectionNodeProvider from '~/services/api/section/SectionNodeProvider'
import type { FilterParam } from '~/services/api/shared/FilterParam'
import { mergeAttributes } from '~/utils/attributes'

export const useSectionStore = defineStore('section', {
  state: () => {
    return {
      loading: false,
      error: null,
      items: {} as Record<string, any>,
    }
  },
  getters: {
    getSectionByPage: (state) => {
      return (page: string) =>
        Object.values(state.items).filter((item) => item.field_page === page)
    },
  },
  actions: {
    async fetchAll(filters?: Array<FilterParam>, include?: string[]) {
      const response = await SectionNodeProvider.fetchAll(filters, include)
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
