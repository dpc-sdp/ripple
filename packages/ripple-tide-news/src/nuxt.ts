import { join } from 'pathe'
import { defineNuxtModule, addComponentsDir } from '@nuxt/kit'

export default defineNuxtModule({
  setup() {
    console.log('Added Tide News UI components')
    addComponentsDir({
      extensions: ['vue'],
      path: join(__dirname, './components'),
      prefix: 'TideNews',
      global: true
    })
  }
})
