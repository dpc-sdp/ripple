---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/src/nuxt.ts
---

import { join } from 'pathe'
import { defineNuxtModule, addComponentsDir } from '@nuxt/kit'

export default defineNuxtModule({
  setup() {
    // Add Tide<%= h.changeCase.pascalCase(name) %> components as dynamic imports in Nuxt apps - See https://v3.nuxtjs.org/guide/concepts/auto-imports
    addComponentsDir({
      extensions: ['vue'],
      path: join(__dirname, './components'),
      prefix: 'Tide<%= h.changeCase.pascalCase(name) %>',
      global: true
    })
    console.log('Added Tide<%= h.changeCase.pascalCase(name) %> UI components')
  }
})
