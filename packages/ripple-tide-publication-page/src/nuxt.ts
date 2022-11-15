import { join } from 'pathe'
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  hooks: {
    'components:dirs'(dirs) {
      console.log('Added Tide PublicationPage UI components')
      dirs.push({
        extensions: ['vue'],
        path: join(__dirname, './components'),
        prefix: 'TidePublicationPage',
        global: true
      })
    }
  }
})
