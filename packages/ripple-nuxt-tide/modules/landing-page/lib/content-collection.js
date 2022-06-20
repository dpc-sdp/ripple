// const moment = require('dayjs')
const moment = require('moment')
const { cardColsSetting } = require('@dpc-sdp/ripple-nuxt-tide/lib/config/layout.config.js')

/**
 * ContentCollection
 * Provides an interface to query a content collection configuration.
 * Extend class to add additional functionality.
 */
module.exports = class ContentCollection {
  // ---------------------------------------------------------------------------
  // Constructor
  // ---------------------------------------------------------------------------
  constructor (configuration, searchEndpoint, environment) {
    this.config = configuration
    this.searchClient = searchEndpoint
    this.envConfig = environment
    this.defaults = {
      EnvironmentSiteId: '4',
      ResultItemFieldNameUrl: 'url',
      ResultItemFieldNamePrimarySite: 'field_node_primary_site',
      SkipToResultLink: true,
      SkipToResultLinkLabel: 'Skip to results',
      ExposedFilterKeywordLabel: 'Search by keyword',
      ExposedFilterKeywordPlaceholder: 'Enter keywords',
      ExposedFilterSubmitLabel: 'Filter results',
      ExposedFilterClearFormLabel: 'Clear search filters',
      ExposedControlSortModel: 'sort',
      ExposedControlSortLabel: 'Sort by',
      ExposedControlSortPlaceholder: 'Select a value',
      ExposedControlItemsPerPageModel: 'items_per_page',
      ExposedControlItemsPerPageLabel: 'Items per page',
      ExposedControlItemsPerPagePlaceholder: 'Select a value',
      ExposedControlPaginationModel: 'page',
      ExposedFilterKeywordModel: 'q',
      ExposedFilterKeywordType: 'phrase_prefix',
      ExposedFilterKeywordDefaultFields: ['title', 'body', 'summary_processed', 'field_landing_page_summary', 'field_paragraph_summary', 'field_page_intro_text', 'field_paragraph_body'],
      ExposedFilterAggregationOrder: 'asc',
      ExposedFilterAggregationSize: 30,
      DisplayResultComponentType: 'card',
      DisplayResultComponentCardStyle: 'noImage',
      DisplayResultComponentColumns: cardColsSetting,
      DisplayPaginationComponentColumns: cardColsSetting,
      ItemsToLoad: 12,
      scrollToResults: true,
      scrollToResultsOffsetHeight: 102,
      pageChangeFocusSelector: 'a'
    }
    if (!this.searchClient) {
      throw Error('Content Collection Error: A search client function is required.')
    }
    if (!this.envConfig) {
      console.warn('Content Collection Error: Environmental variables are required. Falling back to default.')
      const siteId = this.getDefault('EnvironmentSiteId')
      this.envConfig = {
        siteId: siteId,
        domains: { [siteId]: '' }
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Utilities
  // ---------------------------------------------------------------------------
  getLocalDomainURL (urls, site, primarySite, domains) {
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
      } else if (primarySite) {
        domain = domains[primarySite]
        path = '//' + domain + siteIds[primarySite]
      }
    }
    return { domain, path }
  }

  getLocalisedLink (urls, primarySiteId) {
    let returnPath = null
    if (urls?.length > 0) {
      const cfg = this.envConfig
      if (cfg.siteId && cfg.domains) {
        returnPath = this.getLocalDomainURL(urls, cfg.siteId, primarySiteId, cfg.domains)
      } else {
        returnPath = { domain: '', path: urls[0] }
      }
    }
    return returnPath
  }

  getLocalisedLinkFromSource (source, urlField, primarySiteField) {
    const url = urlField || this.getDefault('ResultItemFieldNameUrl')
    const primarySite = primarySiteField || this.getDefault('ResultItemFieldNamePrimarySite')
    const link = this.getLocalisedLink(source[url], source[primarySite])
    return link
  }

  cloneObject (obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  stripEmptyValues (obj) {
    Object.keys(obj).forEach(key => {
      if (obj[key] === null) {
        delete obj[key]
      } else if (obj[key] === '') {
        delete obj[key]
      } else if (Array.isArray(obj[key])) {
        if (obj[key].length === 0) {
          delete obj[key]
        }
      } else if (typeof obj[key] === 'object') {
        this.stripEmptyValues(obj[key])
      }
    })
  }

  getNewValue (value) {
    return Array.isArray(value) ? [...value] : value
  }

  syncObject (from, to, allowed) {
    Object.keys(from).forEach(key => {
      const canSync = allowed ? (allowed.indexOf(key) >= 0) : true
      if (canSync) {
        to[key] = this.getNewValue(from[key])
      }
    })
  }

  getDiffObject (state, standard) {
    const returnState = {}
    Object.keys(state).forEach(key => {
      if (state[key] !== standard[key]) {
        returnState[key] = state[key]
      }
    })
    this.stripEmptyValues(returnState)
    return returnState
  }

  getTypeCorrectedQuery (query, defaultState) {
    // Correct the type on state key if it's a string, but should be an array.
    const returnQuery = {}
    Object.keys(query).forEach(key => {
      if (Array.isArray(defaultState[key]) && !Array.isArray(query[key])) {
        returnQuery[key] = [query[key]]
      } else {
        returnQuery[key] = query[key]
      }
    })
    return returnQuery
  }

  getIdName (value) {
    return value.toString()
  }

  getDefault (key) {
    return this.defaults[key]
  }

  getStateValue (state, defaultKey) {
    return state?.[this.getDefault(defaultKey)]
  }

  // ---------------------------------------------------------------------------
  // Schema Get Methods
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

  getDisplayType () {
    return this.config?.interface?.display?.type
  }

  getInternalSort () {
    return this.config?.internal?.sort
  }

  getInternalItemsToLoad () {
    return this.config?.internal?.itemsToLoad
  }

  getDisplayResultCountText () {
    return this.config?.interface?.display?.options?.resultsCountText
  }

  getDisplayLoadingText () {
    return this.config?.interface?.display?.options?.loadingText
  }

  getDisplayNoResultsText () {
    return this.config?.interface?.display?.options?.noResultsText
  }

  getDisplayErrorText () {
    return this.config?.interface?.display?.options?.errorText
  }

  getDisplaySort () {
    return this.config?.interface?.display?.options?.sort
  }

  getDisplayItemsToLoad () {
    return this.config?.interface?.display?.options?.itemsToLoad
  }

  getDisplayResultComponent () {
    return this.config?.interface?.display?.resultComponent
  }

  getDisplayResultComponentType () {
    return this.config?.interface?.display?.resultComponent?.type || this.getDefault('DisplayResultComponentType')
  }

  getDisplayPagination () {
    return this.config?.interface?.display?.options?.pagination
  }

  getKeepState () {
    return this.config?.interface?.keepState
  }

  getSkipToResultLinkLabel () {
    return this.config?.interface?.SkipToResultLinkLabel || this.getDefault('SkipToResultLinkLabel')
  }

  getSkipToResultLink () {
    return this.config?.interface?.skipToResultLink === undefined ? this.getDefault('SkipToResultLink') : this.config?.interface?.skipToResultLink
  }

  getSkipToResultLinkID () {
    const skipToResultLinkID = this.envConfig?.skipToResultLinkID
    return skipToResultLinkID !== undefined ? skipToResultLinkID : 'content-collection-results'
  }

  // ---------------------------------------------------------------------------
  // Additional Getter Methods
  // ---------------------------------------------------------------------------
  getDisplayResultComponentName () {
    let returnName = null
    switch (this.getDisplayResultComponentType()) {
      case 'search-result':
        returnName = 'rpl-search-result'
        break
      case 'card':
        returnName = 'rpl-card-promo'
        break
    }
    return returnName
  }

  getDisplayResultComponentColumns () {
    let returnColumn = null
    switch (this.getDisplayResultComponentType()) {
      case 'card':
        const columnSettings = this.getDefault('DisplayResultComponentColumns')
        returnColumn = this.envConfig?.sidebar ? columnSettings.narrow : columnSettings.wide
        break
    }
    return returnColumn
  }

  getSortModelName () {
    return this.getDefault('ExposedControlSortModel')
  }

  getItemsPerPageModelName () {
    return this.getDefault('ExposedControlItemsPerPageModel')
  }

  getPaginationModelName () {
    return this.getDefault('ExposedControlPaginationModel')
  }

  getDisplayPaginationComponentColumns () {
    const columnSettings = this.getDefault('DisplayPaginationComponentColumns')
    return this.envConfig?.sidebar ? columnSettings.narrow : columnSettings.wide
  }

  getDisplayPaginationData () {
    let returnPagination = null
    const pagination = this.getDisplayPagination()
    if (pagination) {
      switch (pagination.type) {
        case 'numbers':
          returnPagination = { totalSteps: 0, initialStep: 1, stepsAround: 2 }
          break
      }
    }
    return returnPagination
  }

  getScrollToResults () {
    return this.getDefault('scrollToResults')
  }

  getScrollToResultsOffsetHeight () {
    return this.getDefault('scrollToResultsOffsetHeight')
  }

  pageChangeFocusSelector () {
    return this.getDefault('pageChangeFocusSelector')
  }

  // ---------------------------------------------------------------------------
  // DSL Methods
  // ---------------------------------------------------------------------------
  getDSL (state) {
    let returnDSL = null
    if (this.config?.internal?.custom) {
      // Return Custom DSL if available.
      returnDSL = this.config.internal.custom
    } else {
      // Generate and return the simplified DSL.
      returnDSL = this.getSimpleDSL(state)
    }
    return returnDSL
  }

  getSimpleDSL (state) {
    // TODO - I feel this function is getting too big.
    // I think there might be some way we can simplify it.
    const siteId = this.envConfig.siteId
    // contentIds
    const contentIdFilters = this.getSimpleDSLContentIds()
    // contentTypes
    const contentTypeFilters = this.getSimpleDSLContentTypes()
    // contentFields
    const contentFieldFilters = this.getSimpleDSLContentFields()
    // includeCurrentPage
    const currentPageFilter = this.getSimpleDSLCurrentPageFilter()
    // excludeIds
    // dateFilter
    const dateRangeFilters = this.getSimpleDSLDateRange()
    // sort
    const sortFilters = this.getSimpleDSLSort(state)
    // keyword
    const exposedKeyword = this.getSimpleDSLExposedKeyword(state)
    // advanced filters
    const advancedFilters = this.getSimpleDSLExposedAdvancedFilters(state)

    const body = {
      query: {
        bool: {
          must: [],
          filter: [],
          must_not: []
        }
      },
      sort: [],
      aggs: []
    }

    if (exposedKeyword) {
      body.query.bool.must.push(exposedKeyword)
    }

    if (currentPageFilter) {
      body.query.bool.must_not.push(currentPageFilter)
    }

    if (advancedFilters) {
      body.query.bool.filter.push(...advancedFilters.filters)
      if (advancedFilters.aggs) {
        body.aggs = advancedFilters.aggs
      }
    }

    if (siteId) {
      body.query.bool.filter.push(
        { terms: { 'field_node_site': [siteId] } }
      )
    }

    if (contentIdFilters) {
      body.query.bool.filter.push(
        { terms: contentIdFilters }
      )
    }

    if (contentTypeFilters) {
      body.query.bool.filter.push(
        { terms: contentTypeFilters }
      )
    }

    if (contentFieldFilters.length > 0) {
      contentFieldFilters.forEach(item => {
        body.query.bool.filter.push(
          { 'terms': { [item.fieldName]: item.fieldConfig.values } }
        )
      })
    }

    if (dateRangeFilters.length > 0) {
      dateRangeFilters.forEach(item => {
        body.query.bool.filter.push(item)
      })
    }

    if (sortFilters.length > 0) {
      body.sort = sortFilters
    }

    this.stripEmptyValues(body)

    return body
  }

  getSimpleDSLCurrentPageFilter () {
    let returnStatement = null
    const includeCurrentPage = this.config?.internal?.includeCurrentPage
    const excludeId = this.envConfig?.currentPage
    if (!includeCurrentPage && excludeId) {
      returnStatement = {
        match: { nid: excludeId }
      }
    }
    return returnStatement
  }

  getSimpleDSLExposedKeyword (state) {
    let returnStatement = null
    const keyword = this.config?.interface?.keyword
    if (keyword?.type === 'basic') {
      const stateValue = this.getStateValue(state, 'ExposedFilterKeywordModel')
      if (stateValue) {
        returnStatement = {
          multi_match: {
            query: stateValue,
            type: this.getDefault('ExposedFilterKeywordType'),
            fields: keyword.fields || this.getDefault('ExposedFilterKeywordDefaultFields')
          }
        }
      }
    }
    return returnStatement
  }

  getSimpleDSLExposedAdvancedFilters (state) {
    let returnStatement = null
    const filterFields = this.config?.interface?.filters?.fields
    if (filterFields) {
      const filters = []
      let aggs = null
      filterFields.forEach(group => {
        const model = group.options.model
        const value = state[model]
        const esField = group['elasticsearch-field'] || model
        const fieldData = this.getSimpleDSLExposedAdvancedFiltersField(group, esField, value)
        if (fieldData?.filter) {
          filters.push(fieldData.filter)
        }
        if (fieldData?.agg) {
          if (!aggs) {
            aggs = {}
          }
          aggs[model] = fieldData.agg
        }
      })
      returnStatement = { filters, aggs }
    }
    return returnStatement
  }

  getSimpleDSLExposedAdvancedFiltersField (field, esField, stateValue) {
    let returnESField = null
    switch (field.type) {
      case 'basic':
        let filter = null
        let agg = null
        if (Array.isArray(stateValue)) {
          if (stateValue.length > 0) {
            filter = { 'terms': { [esField]: stateValue } }
          }
        } else if (stateValue) {
          filter = { 'terms': { [esField]: [stateValue] } }
        }
        // Check for aggregation fields
        if (field['elasticsearch-aggregation']) {
          let order = field['elasticsearch-aggregation-order'] || this.getDefault('ExposedFilterAggregationOrder')
          let size = field['elasticsearch-aggregation-size'] || this.getDefault('ExposedFilterAggregationSize')
          agg = { terms: { field: esField, order: { _key: order }, size } }
        }
        returnESField = { filter, agg }
        break
    }
    return returnESField
  }

  getSimpleDSLContentIds () {
    let returnStatement = null
    if (this.config.internal?.contentIds && !this.config.internal.contentIds.some(isNaN)) {
      returnStatement = { 'nid': this.config.internal.contentIds }
    }
    return returnStatement
  }

  getSimpleDSLContentTypes () {
    let returnStatement = null
    if (this.config.internal?.contentTypes) {
      returnStatement = { 'type': this.config.internal.contentTypes }
    }
    return returnStatement
  }

  getSimpleDSLContentFields () {
    const filters = []
    if (this.config.internal?.contentFields) {
      for (let [fieldName, fieldConfig] of Object.entries(this.config.internal.contentFields)) {
        filters.push(
          { 'fieldName': fieldName, 'fieldConfig': fieldConfig }
        )
      }
    }
    return filters
  }

  getSimpleDSLSort (state) {
    if (this.config?.internal?.managedSort) {
      let filters = []
      let sortValue = null
      let internalSort = this.getInternalSort()
      let displaySort = this.getDisplaySort()

      if (displaySort) {
        const stateValue = this.getStateValue(state, 'ExposedControlSortModel')
        if (stateValue) {
          sortValue = this.getFieldValueFromId(stateValue, this.getExposedSortValues())
        }
      } else if (internalSort) {
        sortValue = internalSort
      }

      if (sortValue) {
        filters = sortValue.map(item => ({ [item.field]: item.direction }))
      }
      return filters
    } else {
      // SDPA-6254 default to just sorting by date, enable config.managedSort for previous behaviour
      if (state && state.q && state.q.length > 0) {
        return []
      }
      const contentTypes = this.getSimpleDSLContentTypes()
      // sort news content type by the news item date
      if (contentTypes.type.includes('news')) {
        return [{ field_news_date: 'desc' }, { created: 'desc' }]
      }
      // All other items sorted by created date
      return [{ created: 'desc' }]
    }
  }

  getSimpleDSLDateRange () {
    const filters = []
    if (this.config.internal?.dateFilter) {
      const df = this.config.internal.dateFilter
      var start = null
      var end = null
      var dates = null

      switch (df.criteria) {
        case 'range':
          start = df.dateRangeStart
          end = df.dateRangeEnd || df.dateRangeStart
          break

        case 'today':
          dates = this.getStartEndDates('day')
          start = dates.start
          end = dates.end
          break

        case 'this_week':
          dates = this.getStartEndDates('week')
          start = dates.start
          end = dates.end
          break

        case 'this_month':
          dates = this.getStartEndDates('month')
          start = dates.start
          end = dates.end
          break

        default:
          console.log('Criteria not supported')
          break
      }

      if (start && end) {
        filters.push({ 'range': { [df.startDateField]: { gte: start } } })
        filters.push({ 'range': { [df.endDateField]: { lte: end } } })
      }
    }
    return filters
  }

  getStartEndDates (type) {
    return {
      start: moment().startOf(type).format(),
      end: moment().endOf(type).format()
    }
  }

  // ---------------------------------------------------------------------------
  // Exposed Form Methods
  // ---------------------------------------------------------------------------
  getExposedFilterForm () {
    let returnFilterFormData = null
    const groups = []
    const model = {}
    const filterGroups = this.getExposedFilterGroups()

    filterGroups.forEach(group => {
      if (group.models) {
        group.models.forEach((item, idx) => {
          model[item] = group.values[idx]
        })
      }
      groups.push(group.group)
    })

    if (groups.length > 0) {
      returnFilterFormData = { model, schema: { groups }, formState: {} }
    }
    return returnFilterFormData
  }

  getExposedFilterGroups () {
    const groups = [
      this.getExposedFilterKeywordGroup(),
      this.getExposedFilterAdvancedFilterGroup(),
      this.getExposedFilterSubmissionGroup()
    ]
    return groups.filter(item => item !== null)
  }

  getExposedFilterKeywordGroup () {
    let returnKeywordGroup = null
    const keyword = this.config?.interface?.keyword
    if (keyword) {
      const model = this.getDefault('ExposedFilterKeywordModel')
      returnKeywordGroup = {
        models: [model],
        values: [''],
        group: {
          fields: [{
            type: 'input',
            inputType: 'text',
            label: keyword?.label || this.getDefault('ExposedFilterKeywordLabel'),
            placeholder: keyword?.placeholder || this.getDefault('ExposedFilterKeywordPlaceholder'),
            model: model
          }]
        }
      }
    }
    return returnKeywordGroup
  }

  getExposedFilterAdvancedFilterGroup () {
    let returnFilterGroup = null
    const filters = this.config?.interface?.filters?.fields
    if (filters?.length > 0) {
      const models = []
      const values = []
      const fields = []
      filters.forEach(schemaField => {
        const field = this.getExposedFilterField(schemaField)
        models.push(field.model)
        values.push(this.getExposedFilterFieldDefaultValue(schemaField))
        if (field) {
          fields.push(field)
        }
      })
      returnFilterGroup = {
        models: models,
        values: values,
        group: {
          styleClasses: ['app-content-collection__form-wrap'],
          fields
        }
      }
    }
    return returnFilterGroup
  }

  getExposedFilterFieldDefaultValue (schemaField) {
    let returnfieldDefaultValue = ''
    if (schemaField.type === 'basic') {
      if (schemaField.options.type === 'rplselect') {
        if (schemaField.options.multiselect) {
          returnfieldDefaultValue = []
        }
      }
    }
    return returnfieldDefaultValue
  }

  getExposedFilterField (schemaField) {
    let returnFilterField = null
    switch (schemaField.type) {
      case 'basic':
        const field = this.cloneObject(schemaField.options)
        field.styleClasses = this.getExposedFilterFieldClass(schemaField)
        returnFilterField = field
        break
    }
    return returnFilterField
  }

  getExposedFilterFieldClass (schemaField) {
    let returnClasses = []
    if (schemaField.additionalClasses) {
      returnClasses = returnClasses.concat(schemaField.additionalClasses)
    }
    if (this.config.interface.filters?.defaultStyling) {
      const filterCount = this.config.interface.filters.fields.length
      let suffix = ''
      if (this.envConfig?.sidebar) {
        suffix = (filterCount === 1) ? 'full' : '2'
      } else {
        switch (filterCount) {
          case 1:
          case 2:
            suffix = '2'
            break
          case 4:
            suffix = '4'
            break
          default:
            suffix = '3'
            break
        }
      }
      returnClasses.push(`app-content-collection__form-col-${suffix}`)
    }
    return returnClasses
  }

  getExposedFilterFromModelName (model) {
    let returnFilter = null
    const filters = this.config?.interface?.filters?.fields
    if (filters) {
      for (let i = 0; i < filters.length; i++) {
        if (filters[i].options.model === model) {
          returnFilter = filters[i]
          break
        }
      }
    }
    return returnFilter
  }

  getExposedFilterSubmissionGroup () {
    let returnSubmissionGroup = null
    const fields = []
    const submit = this.config?.interface?.filters?.submit
    if (submit?.visibility === 'visible') {
      fields.push({
        type: 'rplsubmitloader',
        buttonText: submit?.label || this.getDefault('ExposedFilterSubmitLabel'),
        loading: false,
        autoUpdate: true,
        styleClasses: ['app-content-collection__form-inline']
      })
    }
    const clear = this.config?.interface?.filters?.clearForm
    if (clear?.visibility === 'visible') {
      fields.push({
        type: 'rplclearform',
        buttonText: clear?.label || this.getDefault('ExposedFilterClearFormLabel'),
        styleClasses: ['app-content-collection__form-inline']
      })
    }
    if (fields.length > 0) {
      returnSubmissionGroup = {
        group: {
          styleClasses: ['app-content-collection__form-wrap', 'app-content-collection__form-wrap-no-gutter'],
          fields: fields
        }
      }
    }
    return returnSubmissionGroup
  }

  getExposedFilterModelNames () {
    let modelNames = []
    this.getExposedFilterGroups().forEach(group => {
      if (group.models) {
        modelNames.push(...group.models)
      }
    })
    return modelNames
  }

  // ---------------------------------------------------------------------------
  // Exposed Control Methods
  // ---------------------------------------------------------------------------
  getExposedControlModelNames () {
    return this.getExposedControlFields().map(control => control.model)
  }

  getExposedControlFields () {
    const controls = [
      this.getExposedSortField(),
      this.getExposedItemsToLoadField()
    ]
    return controls.filter(item => item !== null)
  }

  getExposedControlForm () {
    let returnControlForm = null
    const fields = []
    const model = {}
    const controls = this.getExposedControlFields()
    controls.forEach(control => {
      model[control.model] = control.value
      fields.push(control.field)
    })

    if (fields.length > 0) {
      returnControlForm = {
        model,
        schema: {
          groups: [{
            styleClasses: ['app-content-collection__form-wrap'],
            fields: fields
          }]
        },
        formState: {}
      }
    }
    return returnControlForm
  }

  getExposedControlValues (field) {
    let returnValues = null
    if (field) {
      returnValues = field.values.map(item => {
        return {
          id: this.getIdName(item.name),
          name: item.name,
          value: item.value
        }
      })
    }
    return returnValues
  }

  getExposedSortValues () {
    return this.getExposedControlValues(this.getDisplaySort())
  }

  getExposedItemsToLoadValues () {
    return this.getExposedControlValues(this.getDisplayItemsToLoad())
  }

  getExposedFieldDefaultValue (options) {
    // Returns the first item as default value
    let returnDefaultValue = ''
    if (options.length > 0) {
      returnDefaultValue = options[0].id
    }
    return returnDefaultValue
  }

  getExposedSortField () {
    let returnField = null
    const exposedValues = this.getExposedSortValues()
    if (exposedValues) {
      returnField = {
        model: this.getSortModelName(),
        value: this.getExposedFieldDefaultValue(exposedValues),
        field: {
          type: 'rplselect',
          model: this.getSortModelName(),
          label: this.getDefault('ExposedControlSortLabel'),
          placeholder: this.getDefault('ExposedControlSortPlaceholder'),
          values: exposedValues.map(({ id, name }) => ({ id, name })),
          styleClasses: ['app-content-collection__form-inline']
        }
      }
    }
    return returnField
  }

  getExposedItemsToLoadField () {
    let returnField = null
    const exposedValues = this.getExposedItemsToLoadValues()
    if (exposedValues) {
      returnField = {
        model: this.getItemsPerPageModelName(),
        value: this.getExposedFieldDefaultValue(exposedValues),
        field: {
          type: 'rplselect',
          model: this.getItemsPerPageModelName(),
          label: this.getDefault('ExposedControlItemsPerPageLabel'),
          placeholder: this.getDefault('ExposedControlItemsPerPagePlaceholder'),
          values: exposedValues.map(({ id, name }) => ({ id, name })),
          styleClasses: ['app-content-collection__form-inline']
        }
      }
    }
    return returnField
  }

  // ---------------------------------------------------------------------------
  // General Form Helpers
  // ---------------------------------------------------------------------------
  submitFormOnModelChange (value, model, form) {
    let returnSubmitForm = false
    switch (form) {
      case 'exposedFilterForm':
        if (this.config?.interface?.filters?.submitOnChange) {
          if (model !== this.getDefault('ExposedFilterKeywordModel')) {
            returnSubmitForm = true
          }
        }
        break
      case 'controlForm':
        returnSubmitForm = true
        break
    }
    return returnSubmitForm
  }

  // ---------------------------------------------------------------------------
  // State Methods
  // ---------------------------------------------------------------------------
  getDefaultState () {
    const defaultState = {}
    if (this.getDisplayPagination()) {
      defaultState[this.getPaginationModelName()] = 1
    }
    defaultState[this.getSortModelName()] = this.getInitialSort()
    defaultState[this.getItemsPerPageModelName()] = this.getInitialItemsToLoad()
    const advancedFilters = this.getExposedFilterGroups()
    advancedFilters.forEach(group => {
      if (group.models) {
        group.models.forEach((model, idx) => {
          defaultState[model] = group.values[idx]
        })
      }
    })
    return defaultState
  }

  // ---------------------------------------------------------------------------
  // Search Query Methods
  // ---------------------------------------------------------------------------
  async getResults (state) {
    let returnResults = null
    const request = this.getSearchRequest(state)
    const results = await this.searchClient(request)
    if (results) {
      returnResults = {
        hits: results.hits.hits.map(this.mapResult.bind(this)),
        total: results.hits.total,
        aggregations: results.aggregations
      }
    }
    return returnResults
  }

  // ---------------------------------------------------------------------------
  // Result Mapping Method
  // ---------------------------------------------------------------------------
  mapResult (item) {
    let mappedResult = null
    const _source = item._source
    const link = this.getLocalisedLinkFromSource(_source)

    switch (this.getDisplayResultComponentType()) {
      case 'search-result':
        mappedResult = {
          title: _source.title?.[0],
          link: link ? { linkText: link.domain + link.path, linkUrl: link.path } : null,
          date: _source.created?.[0],
          description: _source.field_landing_page_summary?.[0]
        }
        break
      case 'card':
        const style = this.getDisplayResultComponent()?.style
        mappedResult = {
          title: _source.title?.[0],
          link: link ? { text: link.path, url: link.path } : null,
          dateStart: _source.created?.[0],
          summary: _source.field_landing_page_summary?.[0],
          image: _source.field_media_image_absolute_path?.[0],
          displayStyle: style || this.getDefault('DisplayResultComponentCardStyle')
        }
        break
    }
    return mappedResult
  }

  // ---------------------------------------------------------------------------
  // Aggregation Methods
  // ---------------------------------------------------------------------------
  updateFiltersFromAggregation (aggregations, formData, state, disableFieldCallback) {
    Object.keys(aggregations).forEach(model => {
      formData.schema.groups.forEach(group => {
        group.fields.forEach(field => {
          if (field.model === model) {
            let dataField = this.getExposedFilterFromModelName(model)
            let values = this.getAggregatedFilterValues(aggregations[model].buckets, state[model], dataField)
            field.values = values
            const disableField = (values.length === 0)
            disableFieldCallback(field, disableField)
          }
        })
      })
    })
  }

  getAggregatedFilterValues (buckets, stateValue, dataField) {
    let returnValues = []
    let hideCount = (dataField['elasticsearch-aggregation-show-count'] === false)
    if (buckets.length > 0) {
      // Has Aggregations
      returnValues = buckets.map(({ key, doc_count: count }) => {
        return hideCount ? { id: key, name: key } : { id: key, name: `${key} (${count})` }
      })
    } else {
      // No result aggregations - return state value
      if (stateValue && Array.isArray(stateValue)) {
        returnValues = stateValue.map(item => {
          return hideCount ? { id: item, name: item } : { id: item, name: `${item} (0)` }
        })
      }
    }
    return returnValues
  }

  // ---------------------------------------------------------------------------
  // Search Result Data Methods
  // ---------------------------------------------------------------------------
  getSearchRequest (state) {
    return {
      from: this.getStartingItem(state),
      size: this.getItemsToLoad(state),
      _source: [],
      ...this.getDSL(state)
    }
  }

  getInitialControlValue (internal, display, displayValues) {
    let returnValue = internal
    if (display) {
      const defaultValue = this.getExposedFieldDefaultValue(displayValues)
      if (defaultValue) {
        returnValue = defaultValue
      }
    }
    return returnValue
  }

  getInitialSort () {
    const initial = this.getInternalSort()
    return this.getInitialControlValue(initial, this.getDisplaySort(), this.getExposedSortValues())
  }

  getInitialItemsToLoad () {
    const initial = this.getInternalItemsToLoad() || this.getDefault('ItemsToLoad')
    return this.getInitialControlValue(initial, this.getDisplayItemsToLoad(), this.getExposedItemsToLoadValues())
  }

  getFieldValueFromId (id, fieldValues) {
    let returnValue = null
    if (fieldValues) {
      for (let i = 0; i < fieldValues.length; i++) {
        if (fieldValues[i].id === id) {
          returnValue = fieldValues[i].value
          break
        }
      }
    }
    return returnValue
  }

  getItemsToLoad (state) {
    let loadCount = this.getInitialItemsToLoad()
    const stateValue = this.getStateValue(state, 'ExposedControlItemsPerPageModel')
    if (stateValue) {
      const fieldValue = this.getFieldValueFromId(stateValue, this.getExposedItemsToLoadValues())
      if (fieldValue) {
        loadCount = fieldValue
      }
    }
    return loadCount
  }

  getStartingItem (state) {
    let start = 0
    const initialStep = state[this.getPaginationModelName()]
    if (initialStep) {
      start = (initialStep - 1) * this.getItemsToLoad(state)
    }
    return start
  }

  getResultCountRange (state, count) {
    let returnCountRange = false
    if (count && count > 0) {
      const initialStep = state[this.getPaginationModelName()] || 1
      const itemsPerPage = this.getItemsToLoad(state)
      const from = initialStep < 2 ? 1 : (itemsPerPage * (initialStep - 1)) + 1
      const byPage = itemsPerPage * initialStep
      const total = (byPage > count) ? count : byPage
      returnCountRange = `${from}-${total}`
    }
    return returnCountRange
  }

  getProcessedResultsCount (state, count) {
    let text = null
    if (count > 0) {
      text = this.getDisplayResultCountText()
      if (text) {
        const range = this.getResultCountRange(state, count)
        text = text.replace('{range}', range)
        text = text.replace('{count}', count)
      }
    }
    return text
  }

  getPaginationTotalSteps (state, count) {
    const total = typeof count === 'object' && count.hasOwnProperty('value') ? count.value : count
    return Math.ceil(parseInt(total) / this.getItemsToLoad(state))
  }
}
