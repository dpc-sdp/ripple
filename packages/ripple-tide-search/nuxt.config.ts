import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      tide: {
        appSearch: {
          searchKey: '',
          endpointBase: '',
          engineName: ''
        },
        elasticsearch: {
          host: '',
          index: ''
        }
      }
    },
    tide: {
      appSearch: {
        privateSearchKey: ''
      }
    }
  },
  modules: ['@dpc-sdp/ripple-ui-maps/nuxt'],
  alias: {
    '@elastic/search-ui': '@elastic/search-ui/lib/esm/index.js',
    '@elastic/search-ui-app-search-connector':
      '@elastic/search-ui-app-search-connector/lib/esm/index.js',
    '@elastic/search-ui-elasticsearch-connector':
      '@elastic/search-ui-elasticsearch-connector/lib/esm/index.js',
    '@searchkit/sdk': '@searchkit/sdk/lib/esm/index.js'
  },
  build: {
    transpile: [
      ({ isDev }) => !isDev && '@elastic/search-ui',
      ({ isDev }) => !isDev && '@elastic/search-ui-app-search-connector',
      ({ isDev }) => !isDev && '@elastic/search-ui-elasticsearch-connector',
      ({ isDev }) => !isDev && '@searchkit/sdk'
    ]
  },
  vite: {
    optimizeDeps: {
      include: [
        '@elastic/search-ui > deep-equal',
        '@elastic/search-ui > qs',
        'ol > color-name',
        'ol/style',
        'ol/format',
        'ol/layer',
        'ol/color',
        'ol/style/Icon',
        'ol/Feature',
        'ol > geotiff',
        'ol > earcut',
        'lodash'
      ]
    }
  }
})
