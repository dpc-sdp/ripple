import { defineNuxtConfig } from 'nuxt/config'
import ViteYaml from '@modyfi/vite-plugin-yaml'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@dpc-sdp/ripple-ui-core/nuxt',
    '@dpc-sdp/ripple-ui-forms/nuxt',
    '@nuxt/content'
  ],
  github: {
    repo: 'dpc-sdp/ripple-framework'
  },
  // https://content.nuxtjs.org
  content: {
    navigation: {
      fields: ['icon']
    },
    documentDriven: {
      layoutFallbacks: ['page']
    },
    highlight: {
      theme: 'github-light',
      preload: ['vue', 'bash', 'markdown']
    }
  },
  vite: {
    plugins: [ViteYaml()]
  },
  experimental: {
    inlineSSRStyles: (id) => !id?.includes('entry')
  },
  nitro: {
    prerender: {
      ignore: ['/storybook']
    }
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
  }
})
