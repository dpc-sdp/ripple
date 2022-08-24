import { join } from 'pathe'

import { defineNuxtModule, installModule, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  async setup(options) {
    const { resolve } = createResolver(import.meta.url)
    await installModule('@formkit/nuxt', {
      configFile: options.formkit?.configFile || resolve('./formkit.config.js')
    })
  },
  hooks: {
    'components:dirs'(dirs) {
      // Add ./components dir to the list
      console.log('Added Ripple Form UI components')
      dirs.push({
        extensions: ['vue'],
        path: join(__dirname, './../src/components'),
        prefix: 'rpl',
        global: true
      })
    }
  }
})
