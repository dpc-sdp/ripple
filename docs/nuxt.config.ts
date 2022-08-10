import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  extends: ['./../node_modules/@docus/docs-theme'],
  buildModules: ['@dpc-sdp/ripple-ui-core/nuxt'],
  target: 'static',
  github: {
    repo: 'nuxtlabs/docus-starter'
  },
  algolia: {
    apiKey: 'b2950a4074034ae56a3647c7e0fc9aae',
    applicationId: 'PZLGV82Q8R',
    instantSearch: {
      theme: 'reset'
    },
    crawler: {
      apiKey: 'b2950a4074034ae56a3647c7e0fc9aae',
      indexName: 'ripple_2_docs',
      meta: ['title', 'description'],
      include: () => true
    },
    // DocSearch key is used to configure DocSearch extension.
    docSearch: {
      indexName: 'ripple_2_docs'
    }
  }
})
