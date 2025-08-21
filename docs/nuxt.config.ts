import { defineNuxtConfig } from 'nuxt/config'
import ViteYaml from '@modyfi/vite-plugin-yaml'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  css: ['~/public/assets/css/main.css'],
  modules: [
    '@dpc-sdp/ripple-ui-core/nuxt',
    '@dpc-sdp/ripple-ui-forms/nuxt',
    '@nuxt/content'
  ],
  // https://content.nuxtjs.org
  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-light',
          langs: ['css', 'vue', 'js', 'bash', 'markdown']
        }
      }
    }
  },
  vite: {
    plugins: [ViteYaml()]
  },
  nitro: {
    prerender: {
      ignore: ['/storybook']
    },
    preset: 'netlify-static'
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
