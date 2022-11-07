import { join } from 'pathe'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'
import vitePlugins from './vite.plugins'

export default defineNuxtModule({
  hooks: {
    'vite:extendConfig'(viteInlineConfig) {
      if (Array.isArray(viteInlineConfig.plugins)) {
        viteInlineConfig.plugins?.push(vitePlugins)
      } else {
        viteInlineConfig.plugins = vitePlugins
      }
    },
    'components:dirs'(dirs) {
      // Add ./components dir to the list
      console.log('Added Ripple UI components')
      dirs.push({
        extensions: ['vue'],
        path: join(__dirname, './../src/components'),
        prefix: 'rpl',
        global: true
      })
    }
  },
  async setup(_options, nuxt) {
    // Adds all ripple plugins, note this is not compiled and is directly used in Nuxt
    addPlugin({
      src: join(__dirname, './../src/plugins/nuxt.mjs')
    })

    nuxt.options.postcss.plugins = {
      ...nuxt.options.postcss.plugins,
      autoprefixer: {},
      'postcss-nested': {},
      'postcss-normalize': {},
      'postcss-preset-env': {
        features: {
          'custom-properties': false
        }
      },
      'postcss-for': {},
      'postcss-each': {}
    }
    nuxt.options.css.push('@dpc-sdp/ripple-ui-core/style')
  }
})
