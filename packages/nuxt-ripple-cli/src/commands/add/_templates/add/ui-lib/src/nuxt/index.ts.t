---
to: src/nuxt/index.ts
---
import { defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit'
import vitePlugins from '../vite.plugins'

export default <any>defineNuxtModule({
  meta: {
    name: '<%= h.changeCase.paramCase(name) %> ',
    configKey: 'ripple'
  },
  hooks: {
    'vite:extendConfig'(viteInlineConfig) {
      // Add vite plugins
      if (Array.isArray(viteInlineConfig.plugins)) {
        viteInlineConfig.plugins?.push(vitePlugins)
      } else {
        viteInlineConfig.plugins = vitePlugins
      }
    }
  },
  async setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    // Adds all ripple Vue components to autoimports in Nuxt
    addComponentsDir({
      extensions: ['vue'],
      path: resolve('./../../src/components'),
      prefix: 'rpl',
      pathPrefix: false
    })
    console.info('Added <%= h.changeCase.paramCase(name) %> components')
    // Adds required PostCss plugins
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
      'postcss-each': {}
    }
    // Adds Ripple UI Core global styles
    nuxt.options.css.push('@dpc-sdp/<%= h.changeCase.paramCase(name) %> /style')
  }
})
