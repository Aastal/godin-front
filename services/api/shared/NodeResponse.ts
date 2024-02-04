import type { NodeResponseData } from '~/services/api/shared/NodeResponseData'

export interface NodeResponse {
  data: NodeResponseData[]
  included: NodeResponseData[]
  jsonapi: Object
  links: Object
}
