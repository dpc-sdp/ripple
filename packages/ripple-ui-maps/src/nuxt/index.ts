import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addPlugin
} from '@nuxt/kit'
import vitePlugins from '../vite.plugins'

export default <any>defineNuxtModule({
  meta: {
    name: 'ripple-ui-maps ',
    configKey: 'ripple'
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

    addPlugin({
      src: resolve('./runtime/plugin.js'),
      mode: 'client'
    })
    console.info('Added ripple-ui-maps components')
    // Adds Ripple UI Core global styles
    nuxt.options.css.push('@dpc-sdp/ripple-ui-maps/style')
  }
})
