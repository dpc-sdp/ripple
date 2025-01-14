import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  runtimeConfig: {
    tide: {
      webformSubmit: {
        username: '',
        password: ''
      },
      captchaSecret: {
        // Placeholder for captcha id: secret mapping
      }
    }
  }
})
