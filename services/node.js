let client

export function setClient (newClient) {
  client = newClient
}

export default function makeService (endpoint) {
  return {
    client: () => client,
    find (id, params) {
      return client.get(`api/node/${endpoint}/${id}`, params)
    },
    findAll (params, filter, include) {
      let request = 'api/node/' + endpoint
      if (filter) {
        request += '?' + filter
      }

      if (include) {
        include = include.join()
        request += filter ? '&' : '?'
        request += `include=${include}`
      }

      return client.get(request, params)
    },
    create (payload) {
      return client.post(
        'api/node/' + endpoint,
        {
          data: {
            type: 'node--' + endpoint,
            attributes: payload.attributes,
            relationships: payload.relationships
          }
        },
        {
          headers: {
            'Content-Type': 'application/vnd.api+json'
          }
        }
      )
    },
    del (id) {
      return client.delete(`api/node/${endpoint}/${id}`)
    },
    update (payload) {
      return client.patch(`api/node/${endpoint}/${payload.id}`,
        {
          data: {
            id: payload.id,
            type: 'node--' + endpoint,
            attributes: payload.attributes,
            relationships: payload.relationships
          }
        },
        {
          headers: {
            'Content-Type': 'application/vnd.api+json'
          }
        })
    },
    cancel () {
      return client.CancelToken.source()
    }
  }
}
