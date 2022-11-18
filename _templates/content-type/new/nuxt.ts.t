---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/src/nuxt.ts
---

import { join } from 'pathe'
import { defineNuxtModule, addComponentsDir } from '@nuxt/kit'

export default defineNuxtModule({
  setup() {
    console.log('Added Tide <%= h.changeCase.pascalCase(name) %> UI components')
    addComponentsDir({
      extensions: ['vue'],
      path: join(__dirname, './components'),
      prefix: 'Tide<%= h.changeCase.pascalCase(name) %>',
      global: true
    })
  }
})
