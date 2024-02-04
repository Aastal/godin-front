import type { NodeResponseData } from '~/services/api/shared/NodeResponseData'
import type { NodeResponse } from '~/services/api/shared/NodeResponse'

export default function findRelations(
  data: NodeResponse,
  target: NodeResponseData,
): Record<string, any> | null {
  if (!data.included || !target.relationships) {
    return null
  }

  const relations: Record<string, any[]> = {}

  for (const [relationKey, relationValue] of Object.entries(
    target.relationships,
  )) {
    if (Array.isArray(relationValue.data)) {
      const relatedIds = new Set(relationValue.data.map((d: any) => d.id))
      relations[relationKey] = data.included
        .filter((includedItem) => relatedIds.has(includedItem.id))
        .map((includedItem) => ({
          ...includedItem.attributes,
          id: includedItem.id,
        }))
    } else if (relationValue.data) {
      const includedItem = data.included.find(
        (item) => item.id === relationValue.data.id,
      )
      if (includedItem) {
        relations[relationKey] = {
          ...includedItem.attributes,
          id: includedItem.id,
        }
        const elRelations = findRelations(data, includedItem)
        relations[relationKey] = { ...relations[relationKey], ...elRelations }
      }
    }
  }

  return relations
}
