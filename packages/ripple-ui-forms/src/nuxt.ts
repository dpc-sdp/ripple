import {
  defineNuxtModule,
  installModule,
  addComponentsDir,
  createResolver
} from '@nuxt/kit'

export default <any>defineNuxtModule({
  async setup(options, nuxt) {
    await installModule('@formkit/nuxt')
    nuxt.options.build.transpile ||= []
    nuxt.options.build.transpile.push('@vuepic/vue-datepicker')

    const { resolve } = createResolver(import.meta.url)
    addComponentsDir({
      extensions: ['vue'],
      path: resolve('./../src/components'),
      prefix: 'rpl',
      pathPrefix: false,
      // Nuxt 3.7.x changed the way that components take precedence over eachother,
      // we need to set a zero priority here so that nuxt-ripple components take
      // precedence over nuxt-ripple-form components
      priority: 0
    })
    console.info('Added ripple-ui-forms components')
  }
})
