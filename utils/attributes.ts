import type { NodeResponse } from '~/services/api/shared/NodeResponse'
import type { NodeResponseData } from '~/services/api/shared/NodeResponseData'
import findRelations from '~/utils/relation-mapper'

export function mergeAttributes(
  retrieved: NodeResponse,
  item: NodeResponseData,
) {
  if (item.id) {
    item.attributes.id = item.id
  }

  return { ...item.attributes, ...findRelations(retrieved, item) }
}
