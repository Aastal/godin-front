import { useApiFetch } from '~/composables/useApiFetch'
import type { FilterParam } from '~/services/api/shared/FilterParam'
import type { CreatePayload } from '~/services/api/shared/CreatePayload'
import type { NodeResponse } from '~/services/api/shared/NodeResponse'

const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl

export default function initialize(node: string) {
  return {
    async fetchOne(id: string): Promise<NodeResponse> {
      const url = new URL(`api/node/${node}/${id}`, apiUrl)

      return await useApiFetch(url.toString()).get()
    },
    async fetchAll(
      filters?: Array<FilterParam>,
      include?: string[],
    ): Promise<NodeResponse> {
      const url = new URL(`api/node/${node}`, apiUrl)

      if (filters) {
        Object.values(filters).forEach((filter) => {
          url.searchParams.append(
            `filter[${filter.name}][condition][path]`,
            filter.path,
          )
          url.searchParams.append(
            `filter[${filter.name}][condition][value]`,
            filter.value,
          )
          url.searchParams.append(
            `filter[${filter.name}][condition][operator]`,
            filter.operator,
          )
        })
      }
      if (include) {
        url.searchParams.append('include', include.join(','))
      }

      return await useApiFetch(url.toString()).get()
    },
    async post(payload: CreatePayload): Promise<NodeResponse> {
      const url = new URL(`api/node/${node}`, apiUrl)

      return await useApiFetch(url.toString()).post(
        {
          data: {
            type: 'node--' + node,
            attributes: payload.attributes,
            relationships: payload.relationships,
          },
        },
        {
          headers: {
            'Content-Type': 'application/vnd.api+json',
          },
        },
      )
    },
  }
}
