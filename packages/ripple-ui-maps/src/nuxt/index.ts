import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addPlugin,
  addImportsDir
} from '@nuxt/kit'

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
      ignore: ['**/*.example.vue'],
      path: resolve('./../../src/components'),
      prefix: 'rpl',
      pathPrefix: false
    })

    addImportsDir(resolve('./runtime/composables'))
    addImportsDir(resolve('./runtime/utils'))

    addPlugin({
      src: resolve('./runtime/plugin.js'),
      mode: 'client'
    })
    // Adds Ripple UI Maps global styles
    nuxt.options.css.push('@dpc-sdp/ripple-ui-maps/style')

    console.info('Added ripple-ui-maps components')
  }
})
