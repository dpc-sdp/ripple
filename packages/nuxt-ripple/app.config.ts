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
      languages?: {
        name?: string
        url?: string
        rtl?: boolean
      }
      search?: {
        contentTypes: string[]
        fallbackValues?: Record<
          string,
          (filterConfig: any, values: string[]) => void
        >
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
    theme: {},
    pageMiddleware: [],
    languages: {
      aii: {
        name: 'Noto Sans Syriac Eastern',
        url: 'https://fonts.googleapis.com/earlyaccess/notosanssyriaceastern.css',
        rtl: true
      },
      am: {
        name: 'Noto Sans Ethiopic',
        url: 'https://fonts.googleapis.com/earlyaccess/notosansethiopic.css'
      },
      ar: {
        name: 'Noto Kufi Arabic',
        url: 'https://fonts.googleapis.com/earlyaccess/notokufiarabic.css',
        rtl: true
      },
      bn: {
        name: 'Noto Sans Bengali',
        url: 'https://fonts.googleapis.com/earlyaccess/notosansbengali.css'
      },
      cld: {
        name: 'Noto Naskh Arabic',
        url: 'https://fonts.googleapis.com/earlyaccess/notonaskharabic.css'
      },
      el: {
        name: 'Roboto',
        url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
      },
      fa: {
        name: 'Noto Naskh Arabic',
        url: 'https://fonts.googleapis.com/earlyaccess/notonaskharabic.css',
        rtl: true
      },
      gu: {
        name: 'Noto Sans Gujarati',
        url: 'https://fonts.googleapis.com/earlyaccess/notosansgujarati.css'
      },
      haz: {
        name: 'Noto Naskh Arabic',
        url: 'https://fonts.googleapis.com/earlyaccess/notonaskharabic.css',
        rtl: true
      },
      he: {
        name: 'Noto Sans Hebrew',
        url: 'https://fonts.googleapis.com/earlyaccess/notosanshebrew.css',
        rtl: true
      },
      hi: {
        name: 'Noto Sans Devanagari',
        url: 'https://fonts.googleapis.com/earlyaccess/notosansdevanagari.css'
      },
      ja: {
        name: 'Noto Sans JP',
        url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap'
      },
      kar: {
        name: 'Padauk',
        url: 'https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&display=swap'
      },
      km: {
        name: 'Noto Sans Khmer',
        url: 'https://fonts.googleapis.com/earlyaccess/notosanskhmer.css'
      },
      ko: {
        name: 'Noto Sans KR',
        url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap'
      },
      kyu: {
        name: 'Noto Sans Kayah Li',
        url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Kayah+Li:wght@400;700&display=swap'
      },
      mk: {
        name: 'Noto Sans',
        url: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap'
      },
      my: {
        name: 'Noto Sans Myanmar',
        url: 'https://fonts.googleapis.com/earlyaccess/notosansmyanmar.css'
      },
      ne: {
        name: 'Cambay',
        url: 'https://fonts.googleapis.com/css2?family=Cambay:wght@400;700&display=swap'
      },
      pa: {
        name: 'Noto Sans Gurmukhi',
        url: 'https://fonts.googleapis.com/earlyaccess/notosansgurmukhi.css'
      },
      prs: {
        name: 'Noto Naskh Arabic',
        url: 'https://fonts.googleapis.com/earlyaccess/notonaskharabic.css',
        rtl: true
      },
      ps: {
        name: 'Noto Naskh Arabic',
        url: 'https://fonts.googleapis.com/earlyaccess/notonaskharabic.css',
        rtl: true
      },
      ru: {
        name: 'Roboto',
        url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
      },
      si: {
        name: 'Noto Sans Sinhala',
        url: 'https://fonts.googleapis.com/earlyaccess/notosanssinhala.css'
      },
      sr: {
        name: 'Roboto',
        url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
      },
      ta: {
        name: 'Noto Sans Tamil',
        url: 'https://fonts.googleapis.com/earlyaccess/notosanstamil.css'
      },
      th: {
        name: 'Noto Sans Thai',
        url: 'https://fonts.googleapis.com/earlyaccess/notosansthai.css'
      },
      ti: {
        name: 'Noto Sans Ethiopic',
        url: 'https://fonts.googleapis.com/earlyaccess/notosansethiopic.css'
      },
      ur: {
        name: 'NafeesRegular',
        url: 'https://fontlibrary.org/face/nafees-nastaleeq',
        rtl: true
      },
      vi: {
        name: 'Roboto',
        url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
      },
      'zh-hans': {
        name: 'Noto Sans SC',
        url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap'
      },
      'zh-hant': {
        name: 'Noto Sans TC',
        url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap'
      }
    }
  }
})
