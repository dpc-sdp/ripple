import { cardColsSetting } from '../../../lib/config/layout.config.js'
import { truncateText } from '@dpc-sdp/ripple-global/utils/helpers.js'
import search from './search/module'
import { logger } from '@dpc-sdp/ripple-nuxt-tide/lib/core'

const searchMixin = {
  data () {
    let tideSearch
    if (this.$tideSearchOptions.loadOnDemand) {
      tideSearch = search(this.$tideSearchOptions, this.$router, this.$store.state.tideSite.siteId)
    } else {
      tideSearch = this.$tideSearch
    }
    return {
      errorMsg: '',
      loading: true,
      noResultsCopy: '',
      searchResults: [],
      pager: {
        totalSteps: 0,
        initialStep: this.$route.query.page ? Number(this.$route.query.page) : 1,
        stepsAround: 2
      },
      searchComponent: 'default',
      type: null,
      count: null,
      cardColBp: cardColsSetting,
      tideSearch: tideSearch,
      setPageTitleOnResults: true
    }
  },
  methods: {
    async getSearchResults (queryString = false, page = 0) {
      this.loading = true
      let filters = JSON.parse(JSON.stringify(this.getComputedFilters()))

      if (queryString.length === 0) {
        queryString = false
      }

      // Set page title.
      if (this.setPageTitleOnResults) {
        this.$store.dispatch('tide/setPageHead', {
          title: queryString ? `Search results for "${queryString}"` : this.searchForm.title
        })
      }

      this.searchOptions.isMatchAll = Boolean(queryString)

      if (!Array.isArray(this.searchOptions.filterFromURI)) {
        this.searchOptions.filterFromURI = []
      }

      // we never want to show these to the user because they are meaningless
      this.searchOptions.filterFromURI.push('field_node_site', 'type')

      // TODO: Refactor this to something like getSystemQueryFilters
      if (this.$route.query && this.$route.query.filters && this.$route.query.filters.type) {
        this.docType = this.$route.query.filters.type
      }
      this.updateSubmitLoader(true)

      try {
        const response = await this.tideSearch.search(this.searchOptions, queryString, page, filters, this.fields, this.docType, this.sort)
        this.updateSubmitLoader(false)
        if (response.aggregations) {
          this.tideSearch.updateFilterOptions(this.searchForm.filterForm, response.aggregations)
        }
        const results = []
        const hits = response.hits.hits
        for (let hit of hits) {
          results.push(this.mapSearchResults({
            ...hit._source,
            id: hit._id
          }))
        }
        this.searchResults = results
        this.pager.totalSteps = response.totalSteps
        this.count = response.hits.total
        this.noResultsCopy = this.count === 0 ? this.noResultsMsg(queryString) : ''
      } catch (error) {
        const msg = 'Search isn\'t working right now, please try again later.'
        this.errorMsg = msg

        if (process.server) {
          logger.error('Retrieving search results failed in getSearchResults()', { error, label: 'SearchMixin' })
        }
      }
      this.loading = false
    },
    mapSearchResults (source) {
      // override this method in your page component to map the search results to your results component
      return source
    },
    updateSubmitLoader (loadingVal) {
      if (this.searchForm.filterForm.schema.groups) {
        this.searchForm.filterForm.schema.groups.forEach(group => {
          const submitField = group.fields.find(f => f.type === 'rplsubmitloader')
          if (submitField) {
            submitField.loading = loadingVal
          }
        })
      }
      if (this.searchForm.filterForm.schema.fields) {
        const submitField = this.searchForm.filterForm.schema.fields.find(item => item.type === 'rplsubmitloader')
        if (submitField) {
          submitField.loading = loadingVal
        }
      }
    },
    changed (event) {
      this.pager.initialStep = event
      this.getSearchResults(this.$route.query.q, event)
    },
    getComputedFilters () {
      // override this method in your page component this to post process filter values
      return this.tideSearch.getFiltersValues(this.searchForm.filterForm)
    },
    noResultsMsg (searchString) {
      let noResultsMsg = `Sorry! We couldn't find any matches`
      if (searchString && searchString.length > 0) {
        noResultsMsg += ` for '${searchString}'`
      } if (searchString === 'match_all') {
        noResultsMsg = `Sorry! No documents exist`
      }
      return noResultsMsg + '.'
    },
    truncateText: (text, stop = 150, clamp) => {
      return truncateText(text, stop, clamp)
    },
    getLink: (urls, site, primarySite, domains, returnObj = { text: 'text', url: 'url' }, text) => {
      let siteIds = {}
      let domain = ''
      let path = ''
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
      return {
        [returnObj['text']]: text || domain + path,
        [returnObj['url']]: path
      }
    }
  },
  async created () {
    // Set the site domain map for generating search result link url
    if (this.$store.state.tideSite.sitesDomainMap === null) {
      const domains = await this.$tide.getSitesDomainMap()
      this.$store.commit('tideSite/setSitesDomainMap', domains)
    }

    // TODO: Refactor default page load query state so that a flag is used instead of string comparison.
    if (this.$route.query.page || this.$route.query.q) {
      this.tideSearch.setFiltersOnCreate(this.searchForm, this.$route.query)
      this.getSearchResults(this.$route.query.q, this.$route.query.page)
    } else {
      this.tideSearch.setFiltersOnCreate(this.searchForm)
      this.getSearchResults()
    }
  },
  computed: {
    fields () {
      const _fields = []
      const schema = this.searchForm.filterForm.schema
      if (schema) {
        if (schema.groups) {
          schema.groups.forEach(group => {
            _fields.push(...group.fields)
          })
        }
        if (schema.fields) {
          _fields.push(...schema.fields)
        }
      }

      return _fields
    }
  },
  watch: {
    '$route' (to, from) {
      this.pager.initialStep = to.query.page ? Number(to.query.page) : 1
    }
  }
}

export default searchMixin
