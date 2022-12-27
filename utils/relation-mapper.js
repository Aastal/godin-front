export default {
  findRelations(data, target) {
    if (data.included === undefined) {
      return null
    }

    if (target.relationships === undefined) {
      return null
    }

    const relations = []
    Object.entries(target.relationships).forEach((e) => {
      data.included.forEach((el) => {
        if (Array.isArray(e[1].data)) {
          if (e[1].data.find((d) => el.id === d.id)) {
            if (relations[e[0]] === undefined) {
              relations[e[0]] = []
            }
            if (el.id) {
              el.attributes.id = el.id
            }
            relations[e[0]].push(el.attributes)
          }
        }

        if (
          e[1].data &&
          el.id === e[1].data.id &&
          relations[e[0]] === undefined
        ) {
          if (el.id) {
            el.attributes.id = el.id
          }
          relations[e[0]] = el.attributes
          const elRelations = this.findRelations(data, el)
          relations[e[0]] = { ...relations[e[0]], ...elRelations }
        }
      })
    })

    return relations
  },
}
