import { join } from 'pathe'
import { defineNuxtModule } from '@nuxt/kit'
import vitePlugins from './vite.plugins'

export default defineNuxtModule({
  hooks: {
    'build:before'(_builder, buildOptions) {
      const plugins = buildOptions.postcss.postcssOptions.plugins
      buildOptions.postcss.postcssOptions.plugins = {
        ...plugins,
        autoprefixer: {},
        'postcss-nested': {}
      }
    },
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
    nuxt.options.css.push('@dpc-sdp/ripple-ui-core/style')
  }
})
