import get from 'lodash.get'

export const getTermsFilter = (params) => {
  if (params.filters) {
    return Object.keys(params.filters).map(key => {
      const values = params.filters[key] && params.filters[key] && params.filters[key].values
      if (values && !Array.isArray(values)) {
        return {
          term: {
            [`${key}`]: `${values}`
          }
        }
      } else if (Array.isArray(values)) {
        return {
          terms: {
            [`${key}`]: values
          }
        }
      }
    }).filter(f => f)
  }
}
export const getField = (source, fields = [], defaultVal = '') => {
  for (let i = 0; i < fields.length; i++) {
    const field = get(source, fields[i])
    if (field) {
      if (field.length > 0 && field[0].length > 0) {
        return field[0]
      }
      return field
    }
  }
  return defaultVal
}

export const getMappedData = async (mapping, resource) => {
  if (!mapping || !resource) { throw new Error('Error: Unable to retrive data from mapping' + mapping) }
  const data = {}
  for (const key in mapping) {
    if (mapping.hasOwnProperty(key)) {
      const resolver = mapping[key]
      if (typeof resolver === 'string' || Array.isArray(resolver)) {
        data[key] = this.utils.get(resource, resolver)
      } else if (resolver.constructor.name === 'AsyncFunction') {
        data[key] = await resolver(resource, this)
      } else if (typeof resolver === 'function') {
        data[key] = resolver(resource)
      } else if (typeof resolver === 'object') {
        data[key] = resolver
      }
    }
  }
  return data
}

export const responseMappingByType = async (mappingConfig, item) => {
  if (item && item.hasOwnProperty('type') && item.type.length > 0) {
    const mapping = mappingConfig[item.type[0]] || mappingConfig['default']
    if (!mapping || !item) { throw new Error('Error: Unable to retrive ' + item.type[0] + ' mapping') }
    const data = {}
    if (mapping) {
      for (const key in mapping) {
        const resolver = mapping[key]
        if (resolver) {
          if (typeof resolver === 'string' || Array.isArray(resolver)) {
            data[key] = getField(item, resolver)
          } else if (resolver.constructor.name === 'AsyncFunction') {
            data[key] = await resolver(item, this)
          } else if (typeof resolver === 'function') {
            data[key] = resolver(item)
          } else if (typeof resolver === 'object') {
            /*
             * TODO : process objects recursively - for now use a function instead, eg:
               link: (item) => ({
                  url: getField(item, ['field_node_link', 'url']),
                  text: ''
                })
             */
            data[key] = resolver
          } else {
            data[key] = resolver
          }
        }
      }
    }
    return data
  }
  return null
}

export const getPagination = (params) => {
  const query = {}
  if (params.limit) {
    query.size = parseInt(params.limit, 10)
  }
  if (params.page) {
    const page = parseInt(params.page, 10)
    if (page > 1) {
      query.from = ((page - 1) * query.size)
    }
  }
  return query
}
