import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  hooks: {
    'build:done': async () => {
      console.info('Added ripple-ui-forms-ext components')
    }
  }
})
