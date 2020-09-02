import qB from './querybuilder'

export default ({
  info: async function (client) {
    const response = await client.info({
      requestTimeout: 30000
    })
    return response
  },
  search: async function (client, index, queryString, filters, filterFields, qFields, sFields, from, size, sort, exclude) {
    // TODO: Add a check for node_grants and published
    const computedQuery = qB.getEsQueryBody(queryString, filters, qFields, exclude)

    const dsl = {
      from: from,
      size: size,
      index: index,
      filterPath: [
        'hits.hits',
        'hits.total',
        'aggregations'
      ],
      body: computedQuery,
      _source: sFields
    }

    if (sort) {
      if (sort instanceof Array) {
        Array.from(sort).forEach((item) => { qB.setSort(dsl.body, item) })
      } else {
        dsl.body = qB.setSort(dsl.body, sort)
      }
    }

    for (let inputField of filterFields) {
      // Only update the filter options if a selection hasn't already been made, otherwise the filter would need to be
      // cleared before another selection can be made.
      if (!filters[inputField.model]) {
        if (inputField.type === 'rplchecklist' && inputField.values.length > 0 && (typeof inputField.filter.computedFilter === 'undefined' || inputField.filter.computedFilter === false)) {
          dsl.body = qB.addAgg(dsl.body, inputField)
        }
      }
    }

    return client.search(dsl)
  },
  /**
   * Collects terms associated with documents for filter context queries.
   *
   * @param   {Object}  client      The ES js client.
   * @param   {Object}  fieldMap    Field and field type.
   * @param   {String}  index       The ES index to perform the operation on.
   *
   * @returns {Array}               An array of the filter values in the index.
   */
  getUniqueVals: async function (client, fieldMap, index) {
    const values = []
    const aggName = `${fieldMap.fieldName}_options`
    const agg = {
      size: 0,
      index: index,
      body: {
        aggregations: {}
      }
    }

    agg.body.aggregations[aggName] = {
      'terms': {
        'field': fieldMap.fieldName,
        'order': {
          '_key': 'asc'
        }
      }
    }

    const filterVals = await client.search(agg)
    if (filterVals.aggregations[aggName].buckets.length > 0) {
      for (let value of filterVals.aggregations[aggName].buckets) {
        values.push(value.key)
      }
    }
    return values
  }
})
