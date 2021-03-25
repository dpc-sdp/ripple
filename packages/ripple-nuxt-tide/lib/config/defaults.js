// Module default configuration.
const defaults = {
  baseUrl: '',
  auth: {
    username: null,
    password: null
  },
  site: false, // Set a site id if nuxt-tide-site installed.
  extendConfigs: [],
  extendFilters: [],
  customConfig: {},
  customFilters: {},
  pageTypes: [], // Dynamic Tide page type components importing.
  dynamicComponents: [], // Dynamic components importing for Tide mapping.
  middleware: [],
  markupPlugins: [],
  proxyTimeout: 30000,
  tideTimeout: 10000,
  tideListingTimeout: 30000,
  searchTemplates: {},
  modules: {
    site: 0,
    page: 0,
    landingPage: 0,
    event: 0,
    grant: 0,
    news: 0,
    media: 0,
    webform: 0,
    search: 0,
    publication: 0,
    authenticatedContent: 0,
    preview: 0,
    alert: 0
  },
  search: {
    service: '',
    index: '',
    url: '',
    log: '',
    auth: {
      username: '',
      password: ''
    }
  },
  cachePurgePattern: []
}

export default defaults
