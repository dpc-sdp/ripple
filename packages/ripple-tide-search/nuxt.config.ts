import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      tide: {
        elasticsearch: {
          host: '',
          index: ''
        }
      }
    },
    tide: {
      elasticsearch: {
        username: '',
        password: ''
      }
    }
  },
  modules: ['@dpc-sdp/ripple-ui-maps/nuxt'],
  vite: {
    optimizeDeps: {
      include: [
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
