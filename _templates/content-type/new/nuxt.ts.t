---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/src/nuxt.ts
---

import { join } from 'pathe'
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  hooks: {
    'components:dirs'(dirs) {
      console.log('Added Tide <%= h.changeCase.pascalCase(name) %> UI components')
      dirs.push({
        extensions: ['vue'],
        path: join(__dirname, './components'),
        prefix: 'Tide<%= h.changeCase.pascalCase(name) %>',
        global: true
      })
    }
  }
})
