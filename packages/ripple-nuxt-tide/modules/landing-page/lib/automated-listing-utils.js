/**
 * Get the relevant url from Elasticsearch results.
 * @param {Array} urls List of urls e.g. [ '/site-38/demo-event', '/site-4/demo-event' ]
 * @param {String} site Site ID of current site section
 * @param {String} primarySite Site ID of primary site
 * @param {Object} domains Mapping of domains { '4': 'demosite.com' }. Found in store.state.tideSite.sitesDomainMap.
 */
function getLocalDomainURL (urls, site, primarySite, domains) {
  let domain = ''
  let path = ''
  if (urls && urls.length > 0) {
    let siteIds = {}
    for (let url of urls) {
      let siteId = url.substring(
        url.indexOf('-') + 1,
        url.indexOf('/', 2)
      )
      let path = url.substring(url.indexOf('/', 2))
      siteIds[siteId] = path
    }
    if (site in siteIds) {
      domain = domains[site]
      path = siteIds[site]
    } else {
      domain = domains[primarySite]
      path = '//' + domain + siteIds[primarySite]
    }
  }
  return { domain, path }
}
/**
 * Get operator used for DSL based on AND / OR string. Defaults to OR.
 * @param {String} operator 'AND' or 'OR'
 */
function getDSLOperator (operator) {
  return (operator === 'AND') ? 'must' : 'should'
}
/**
 * Get Array with fields for use with DSL _source.
 * @param {Object} settings
 * @param {Array} existingSources
 */
function getDSLSource (settings, existingSources) {
  const returnSource = [...existingSources]
  const newSources = []
  if (settings.card_display) {
    if (settings.card_display.date) {
      newSources.push(settings.card_display.date)
    }
    if (settings.card_display.hide) {
      if (!settings.card_display.hide.image) {
        newSources.push('field_media_image_absolute_path')
      }
      if (!settings.card_display.hide.title) {
        newSources.push('title')
      }
      if (!settings.card_display.hide.summary) {
        newSources.push('field_landing_page_summary')
      }
      if (!settings.card_display.hide.topic) {
        newSources.push('field_topic_name')
      }
      if (!settings.card_display.hide.location) {
        newSources.push('field_event_details_event_locality')
      }
    }
  }
  if (settings.filter_today) {
    if (settings.filter_today.start_date) {
      newSources.push(settings.filter_today.start_date)
    }
    if (settings.filter_today.end_date) {
      newSources.push(settings.filter_today.end_date)
    }
  }
  if (settings.sort && settings.sort.field) {
    newSources.push(settings.sort.field)
  }
  newSources.forEach(newSource => {
    if (returnSource.indexOf(newSource) < 0) {
      returnSource.push(newSource)
    }
  })
  return returnSource
}
/**
 * Get from number for use with DSL from. Takes into account pagination offset.
 * @param {Object} settings
 * @param {Object} state { page }
 */
function getDSLFrom (settings, state) {
  let returnFrom = 0
  if (settings.display.type === 'grid' && settings.display.items_per_page > 0 && state.page && state.page > 1) {
    returnFrom = (state.page - 1) * settings.display.items_per_page
  }
  return returnFrom
}
/**
 * Get total search result size for use with DSL size.
 * @param {Object} settings
 */
function getDSLSize (settings) {
  let returnSize = 500
  if (settings.display.type === 'grid' && settings.display.items_per_page > 0) {
    returnSize = settings.display.items_per_page
  } else if (settings.results.max > 0) {
    returnSize = settings.results.max
  }
  return returnSize
}
/**
 * Get DSL conditions for filter settings.
 * @param {Object} settings
 */
function getFilterConditions (settings) {
  const rootConditions = []
  if (settings.filters) {
    Object.keys(settings.filters).forEach(key => {
      const filter = settings.filters[key]
      const conditions = []
      if (filter.values && filter.values.length > 0) {
        filter.values.forEach(val => {
          const isValid = (typeof val === 'string') ? (val.length > 0) : true
          if (isValid) {
            conditions.push({ match: { [key]: val } })
          }
        })
        if (conditions.length > 0) {
          rootConditions.push({ bool: { [getDSLOperator(filter.operator)]: conditions } })
        }
      }
    })
  }
  return rootConditions
}
/**
 * Get DSL conditions for filter_today settings.
 * @param {Object} settings
 */
function getFilterTodayConditions (settings) {
  const rootConditions = []
  if (settings.filter_today && settings.filter_today.status) {
    if (settings.filter_today.start_date) {
      const startField = settings.filter_today.start_date
      const endField = settings.filter_today.end_date || startField
      const today = new Date()
      switch (settings.filter_today.criteria) {
        case 'all':
          // Nothing
          break
        case 'upcoming':
          rootConditions.push({ range: { [startField]: { gte: today } } })
          break
        case 'from_current':
          rootConditions.push({ range: { [endField]: { gte: today } } })
          break
        case 'past':
          rootConditions.push({ range: { [endField]: { lte: today } } })
          break
        default:
          console.log('Criteria not supported')
          break
      }
    } else {
      console.log('Start date not set. Ignoring date filter.')
    }
  }
  return rootConditions
}
/**
 * Get query logic for use with DSL body.query.
 * @param {Object} settings
 */
function getDSLBodyQuery (settings, state) {
  // Filters and filters from today
  const rootConditions = [...getFilterConditions(settings), ...getFilterTodayConditions(settings)]

  if (rootConditions.length > 0) {
    let dslBody = { bool: { [getDSLOperator(settings.filter_operator)]: rootConditions } }
    // Ignore current ID
    if (state.ignoreId) {
      dslBody.bool['must_not'] = { match: { nid: state.ignoreId } }
    }
    return dslBody
  } else {
    return null
  }
}
/**
 * Get sort array for use with DSL body.sort.
 * @param {Object} settings
 */
function getDSLSort (settings) {
  const sortConditions = []
  if (settings && settings.sort) {
    // Sticky
    if (settings.sort.with_sticky) {
      sortConditions.push({ sticky: 'desc' })
    }
    // Sort field
    if (settings.sort.field) {
      sortConditions.push({ [settings.sort.field]: settings.sort.direction })
    }
  }
  return sortConditions.length > 0 ? sortConditions : null
}
/**
 * Check field exists on _source object.
 * @param {Object} obj Elasticsearch results '_source' object
 * @param {String} field _source.field
 */
function hasField (obj, field) {
  return (obj[field] != null && obj[field].length > 0)
}
/**
 * Return first value of field on _source object.
 * @param {Object} obj Elasticsearch results '_source' object
 * @param {String} field _source.field
 */
function getField (obj, field) {
  return obj[field][0]
}
/**
 * Converts Automated Listing settings and state into an Elasticsearch DSL.
 * @param {Object} settings
 * @param {Object} state
 */
function getDSL (settings, state) {
  const DSL = {
    filterPath: ['hits.hits', 'hits.total'],
    _source: ['url'],
    body: {}
  }
  DSL._source = getDSLSource(settings, DSL._source)
  DSL.index = settings.server_index || 'elasticsearch_index_contentsalsadigitaldevelop_dnnfw_node' // TODO - need to change
  DSL.from = getDSLFrom(settings, state)
  DSL.size = getDSLSize(settings)
  const bodyQuery = getDSLBodyQuery(settings, state)
  if (bodyQuery) {
    DSL.body['query'] = bodyQuery
  }
  const sort = getDSLSort(settings)
  if (sort) {
    DSL.body['sort'] = sort
  }
  return DSL
}
/**
 * Convert Elasticsearch results into cards.
 * @param {Object} settings
 * @param {Object} state
 * @param {Array} results
 */
function getProcessedESResults (settings, state, results) {
  return results.hits.hits.map(({ _source }) => {
    const addFields = [
      { cardField: 'image', esField: 'field_media_image_absolute_path' },
      { cardField: 'date', esField: (settings.card_display && settings.card_display.date) ? settings.card_display.date : null },
      { cardField: 'topic', esField: 'field_topic_name' },
      { cardField: 'title', esField: 'title' },
      { cardField: 'location', esField: 'field_event_details_event_locality' },
      { cardField: 'summary', esField: 'field_landing_page_summary' }
    ]
    const card = {}
    addFields.forEach(field => {
      if (field.esField !== null && hasField(_source, field.esField)) {
        card[field.cardField] = getField(_source, field.esField)
      }
    })
    if (hasField(_source, 'url')) {
      const urls = _source.url
      const { path } = getLocalDomainURL(urls, state.siteId, state.primarySiteId, state.domains)
      card.link = {
        text: state.cta || '',
        url: path
      }
    }
    return card
  })
}
/**
 * Get total steps for pagination.
 * @param {Object} settings
 * @param {Number} hitTotal total hit count returned from Elasticsearch
 */
function getTotalSteps (settings, hitTotal) {
  if (settings.display.type === 'grid' && settings.display.items_per_page > 0) {
    return Math.ceil(Number(hitTotal) / settings.display.items_per_page)
  }
  return 0
}

export {
  getLocalDomainURL,
  getDSLOperator,
  getDSLSource,
  getDSLFrom,
  getDSLSize,
  getFilterConditions,
  getFilterTodayConditions,
  getDSLBodyQuery,
  getDSLSort,
  hasField,
  getField,
  getDSL,
  getProcessedESResults,
  getTotalSteps
}
