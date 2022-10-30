import { join } from 'pathe'
import { defineNuxtModule, addComponent } from '@nuxt/kit'

export default defineNuxtModule({
  hooks: {
    'components:dirs'(dirs) {
      console.log('Added Tide Media UI components')
      dirs.push({
        extensions: ['vue'],
        path: join(__dirname, './components'),
        prefix: 'TideMedia',
        global: true
      })

      console.log('Added Tide Media Page components')
      dirs.push({
        extensions: ['vue'],
        path: join(__dirname, './pages'),
        prefix: 'TideMedia',
        global: true
      })
    }
  }
})
