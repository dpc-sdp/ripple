import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addPlugin,
  addTemplate
} from '@nuxt/kit'
import vitePlugins from '../vite.plugins'
import { getIcons } from './lib/icons'

export default <any>defineNuxtModule({
  meta: {
    name: 'ripple-ui-core',
    configKey: 'ripple'
  },
  defaults: {
    iconPath: 'assets/icons'
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
    // Add any custom icons
    const icons = await getIcons(_options.iconPath, nuxt.options._layers)
    const iconMap = (icons || []).map(
      ({ file, name }) => `'${name}': () => import('${file}?component')`
    )
    nuxt.options.alias['#icons'] =
      addTemplate({
        write: true,
        filename: 'icons.mjs',
        getContents: () => `export default { ${iconMap.join(',')} }`
      }).dst || ''
    // Adds all ripple Vue components to autoimports in Nuxt
    addComponentsDir({
      extensions: ['vue'],
      path: resolve('./../../src/components'),
      prefix: 'rpl',
      pathPrefix: false,
      // Nuxt 3.7.x changed the way that components take precedence over eachother,
      // we need to set a zero priority here so that nuxt-ripple components take
      // precedence over nuxt-ripple-core components
      priority: 0
    })
    console.info('Added ripple-ui-core components')
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
