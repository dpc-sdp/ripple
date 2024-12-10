import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      tide: {
        analytics: {
          GTM: 'GTM-KF8NCW2'
        }
      },
      newRelic: {
        browser: {
          enabled: false,
          accountID: '',
          trustKey: '',
          agentID: '',
          licenseKey: '',
          applicationID: ''
        }
      }
    }
  }
})
