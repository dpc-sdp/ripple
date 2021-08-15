/**
 * ContentCollection
 * Provides an interface to query a content collection configuration.
 * Extend class to add additional functionality.
 */
module.exports = class ContentCollection {
  // ---------------------------------------------------------------------------
  // Constructor
  // ---------------------------------------------------------------------------
  constructor (configuration) {
    this.config = configuration
  }

  // ---------------------------------------------------------------------------
  // Getters / Setters
  // ---------------------------------------------------------------------------
  getTitle () {
    return this.config.title
  }

  getDescription () {
    return this.config.description
  }

  getCTA () {
    return this.config.callToAction
  }

  getExposedFilterForm () {
    return {}
  }

  getSearchQuery () {
    return this.getDSL()
  }

  // ---------------------------------------------------------------------------
  // DSL Methods
  // ---------------------------------------------------------------------------
  getDSL () {
    if (this.config?.internal?.custom) {
      // Return Custom DSL if available.
      return this.config.internal.custom
    } else if (this.config?.internal) {
      // Generate and return the simplified DSL.
      return this.getSimpleDSL()
    } else {
      return null
    }
  }

  getSimpleDSL () {
    // contentIds
    // contentTypes
    const contentTypeFilters = this.getSimpleContentTypes()
    // contentFields
    // includeCurrentPage
    // excludeIds
    // dateFilter
    // sort
    const sortFilters = this.getSimpleSort()
    // itemsToLoad

    const body = {}

    if (contentTypeFilters.length > 0) {
      body['query'] = {
        bool: {
          filter: [...contentTypeFilters]
        }
      }
    }

    if (sortFilters.length > 0) {
      body['sort'] = sortFilters
    }

    return body
  }

  getSimpleContentTypes () {
    const filters = []
    if (this.config.internal?.contentTypes) {
      filters.push({ "terms": { "type": this.config.internal.contentTypes } })
    }
    return filters
  }

  getSimpleSort () {
    const filters = []
    if (this.config.internal?.sort) {
      this.config.internal.sort.forEach(item => {
        filters.push({ [item.field]: item.direction })
      })
    }
    return filters
  }
}
