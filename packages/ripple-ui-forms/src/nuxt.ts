import { join } from 'pathe'

import { defineNuxtModule, installModule } from '@nuxt/kit'

export default defineNuxtModule({
  async setup() {
    await installModule('@formkit/nuxt')
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
