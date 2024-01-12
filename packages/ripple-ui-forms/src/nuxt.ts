import {
  defineNuxtModule,
  installModule,
  addComponentsDir,
  createResolver
} from '@nuxt/kit'

export default <any>defineNuxtModule({
  async setup() {
    await installModule('@formkit/nuxt')

    const { resolve } = createResolver(import.meta.url)
    addComponentsDir({
      extensions: ['vue'],
      path: resolve('./../src/components'),
      prefix: 'rpl',
      pathPrefix: false
    })
    console.info('Added ripple-ui-forms components')
  }
})
