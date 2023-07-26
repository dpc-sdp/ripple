import type { IRplFeatureFlags } from '@dpc-sdp/ripple-tide-api/types'

declare module '@nuxt/schema' {
  interface AppConfigInput {
    ripple?: {
      featureFlags?: IRplFeatureFlags
      theme?: {
        ['rpl-clr-primary']?: string
        ['rpl-clr-primary-alt']?: string
        ['rpl-clr-accent']?: string
        ['rpl-clr-accent-alt']?: string
        ['rpl-clr-link']?: string
        ['rpl-clr-focus']?: string
        ['rpl-clr-type-focus-contrast']?: string
      }
      search?: {
        filterFunctions?: Record<
          string,
          (filterConfig: any, values: string[]) => void
        >
      }
    }
  }
}

export default defineAppConfig({
  ripple: {
    featureFlags: {},
    theme: {}
  }
})
