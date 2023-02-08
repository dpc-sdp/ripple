import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  alias: {
    '@elastic/search-ui': '@elastic/search-ui/lib/esm/index.js',
    '@elastic/search-ui-app-search-connector':
      '@elastic/search-ui-app-search-connector/lib/esm/index.js',
    '@elastic/search-ui-elasticsearch-connector':
      '@elastic/search-ui-elasticsearch-connector/lib/esm/index.js'
  }
})
