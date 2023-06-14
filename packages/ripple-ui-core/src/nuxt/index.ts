import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addPlugin
} from '@nuxt/kit'
import vitePlugins from '../vite.plugins'

export default <any>defineNuxtModule({
  meta: {
    name: 'ripple-ui-core',
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
      // Add external assets
      if (viteInlineConfig.build?.rollupOptions) {
        if (Array.isArray(viteInlineConfig.build.rollupOptions?.external)) {
          viteInlineConfig.build.rollupOptions?.external?.push(/assets\/fonts/)
        } else if (!viteInlineConfig.build.rollupOptions?.external) {
          viteInlineConfig.build.rollupOptions.external = [/assets\/fonts/]
        }
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
    // Plugin adds runtime setup tasks, eg: event bus
    addPlugin(resolve('./runtime/plugin'))
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
    nuxt.options.css.push('@dpc-sdp/ripple-ui-core/style')
  }
})
