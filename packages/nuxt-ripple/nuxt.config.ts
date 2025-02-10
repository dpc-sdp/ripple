import { defineNuxtConfig } from 'nuxt/config'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  css: [resolve('./assets/css/languages.css')],
  runtimeConfig: {
    basicAuth: 0,
    compatibilityDate: '2024-10-31',
    tide: {
      config: {
        apiPrefix: '/api/v1',
        auth: {
          username: 'dpc',
          password: 'sdp'
        }
      }
    },
    public: {
      isStatic: true,
      siteUrl: '',
      apiUrl: '',
      isProduction: process.env?.LAGOON_ENVIRONMENT_TYPE === 'production',
      tide: {
        baseUrl: 'https://develop.content.reference.sdp.vic.gov.au',
        site: '8888'
      }
    }
  },
  experimental: {
    inlineSSRStyles: (id) => !id?.includes('entry'),
    externalVue: false // See https://github.com/nuxt/nuxt/issues/14820
  },
  // A change in nuxt 3.8.0 means we were getting errors whenever a type was imported without the 'type' keyword
  // This is a temporary workaround until we can fix all the types
  // TODO: Add 'type' keyword to all type imports
  // https://github.com/nuxt/nuxt/releases/tag/v3.8.0
  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false
      }
    }
  },
  // @ts-ignore TS2345 adding to runtimeConfig
  robots: {
    configPath: resolve('./robots.config.ts')
  },
  nitro: {
    routeRules: {
      '**': {
        headers: {
          // rendered html pages should be cached by the browser for 30s and by reverse proxies for 15min. Always revalidate
          'cache-control': `public,max-age=30,s-maxage=900,must-revalidate`
        }
      },
      '/_nuxt/**': {
        headers: {
          // assets should be cached by the browser for a day and reverse proxies for a year
          'cache-control': `public,max-age=86400,s-maxage=31536000`
        }
      }
    },
    prerender: {
      crawlLinks: process.env.NUXT_PUBLIC_IS_STATIC === 'true'
    }
  },
  // defaults for static prerendering - can be overridden in the project

  image: {
    domains: [process.env.NUXT_PUBLIC_TIDE_BASE_URL || ''],
    provider: process.env.NUXT_PUBLIC_IS_STATIC === 'true' ? 'ipx' : 'section',
    providers: {
      section: {
        provider: resolve('./providers/section.ts') // Path to custom provider
      }
    },
    alias: {
      images: process.env.NUXT_PUBLIC_TIDE_BASE_URL
    }
  },
  modules: [
    '@nuxt/image',
    'nuxt-proxy',
    '@dpc-sdp/ripple-ui-core/nuxt',
    '@dpc-sdp/ripple-ui-forms/nuxt',
    '@nuxtjs/robots'
  ]
})
