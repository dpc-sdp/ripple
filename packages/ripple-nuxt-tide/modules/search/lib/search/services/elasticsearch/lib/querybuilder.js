import esb from 'elastic-builder'
import moment from 'moment'

/**
 * Add filters.
 *
 * @param {Object} esbResult  An instance of an Elastic-builder query.
 * @param {Object} filters    Any filters to be added to the body in filter
 *                            context.
 * TODO: Add the ability to pass multiple values to a single date or integer
 * field range query. i.e the following could be achieved by passing an
 * object as the values with the operator as the property.
 * filters.field_name = {
 *   "type": "integer",
 *   "operator": "",
 *   "values": [
 *     'gte': 15000,
 *     'lte': 45000
 *   ]
 * }
 * would generate:
 * "range" : {
 *      "field_name" : {
 *        "gte" : "15000",
 *        "lt" :  "45000"
 *      }
 *   }
 *
 */
const addFilter = function (esbResult, filter, filterName) {
  let operator = filter.operator
  switch (filter.type) {
    case 'date':
      if (moment(filter.values).isValid() || filter.values === 'now') {
        esbResult = esbResult.filter(esb.rangeQuery(filterName)[operator](filter.values))
      }
      break
    case 'term':
      if (Array.isArray(filter.values)) {
        const filterVals = filter.values.map((item) => {
          // Check that filter fields aren't empty string.
          // If it's a boolean value, should be ignored in the check.
          if (item.length > 0 || typeof item === 'boolean') {
            return item
          }
        })
        // Match any terms.
        esbResult = esbResult.filter(esb.termsQuery(filterName, filterVals))
        // Match all terms.
        // esbResult = esbResult.should(esb.termsQuery(filterName, filterVals))
        // esbResult = esbResult.minimumShouldMatch(filterField.length)
      } else {
        let filterField = filter.values.slice()
        esbResult = esbResult.filter(esb.termQuery(filterName, filterField))
      }
      break
    case 'multiMatch':
      esbResult = esbResult.must(esb.multiMatchQuery(filter.fields, filter.values))
      break
    case 'prefix':
      esbResult = esbResult.filter(esb.prefixQuery(filterName, filter.values.toLowerCase()))
      break
    case 'ids':
      esbResult = esbResult.filter(esb.idsQuery(filter.fields, filter.values))
      break
    case 'integer':
      esbResult = esbResult.filter(esb.rangeQuery(filterName)[operator](filter.values))
      break
    default:
  }
}

export default ({
  /**
   * Builds an Elasticsearch DSL query body.
   *
   * @param {String}  docType         The document type.
   * @param {String}  queryString     The query string.
   * @param {Object}  filters         Arguments to refine searh hits using a filter context.
   * @param {Object}  filters.type    Type of query.
   * @param {Array}   filters.values  Values to pass to filter context.
   * @param {Array}   filters.fields  Fields to filter values against.
   * @param {Array}   fields          Fields to query the queryString against.
   * @param {Object}  exclude         (optional) Properties to exclude from hits.
   * @param {String}  exclude.type    The API entity type to exclude.
   * @param {String}  exclude.field   (optional) The API field_name. The API field_name. If set and a value exists, hits are excluded.
   */
  getEsQueryBody: function (queryString, filters, fields, exclude) {
    let esbResult = {}
    if (queryString === false) {
      esbResult = esb.boolQuery().must(esb.matchAllQuery())
    } else if (exclude) {
      let excludes = [
        esb.termQuery('type', exclude.type)
      ]
      if (exclude.field) {
        excludes.push(esb.existsQuery(exclude.field))
      }
      esbResult = esb.boolQuery().must([
        esb.multiMatchQuery(fields, queryString),
        esb.boolQuery().mustNot(esb.boolQuery().must(excludes))
      ])
    } else {
      esbResult = esb.boolQuery().should(esb.matchPhraseQuery('title', queryString).boost(2)).must(esb.multiMatchQuery(fields, queryString))
    }

    if (Object.keys(filters).length > 0) {
      for (let filterName in filters) {
        addFilter(esbResult, filters[filterName], filterName)
      }
    }
    return esb.requestBodySearch().query(
      esbResult
    )
  },

  /**
   * Add Aggregations.
   *
   * @param {Object} body       An instance of an Elastic-builder query.
   * @param {Object} inputField Any filters to be added to the body in filter
   *     context.
   */
  addAgg: function (body, inputField) {
    return body.agg(esb.termsAggregation(inputField.model, inputField.model).order('_key', 'asc').size(inputField.itemLimit || 30)) // Add itemLimit key to select config to override
  },

  setSort: function (body, sort) {
    return body.sort(esb.sort(sort.field, sort.order))
  }
})
