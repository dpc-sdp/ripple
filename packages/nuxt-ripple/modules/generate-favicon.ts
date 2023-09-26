// `nuxt/kit` is a helper subpath import you can use when defining local modules
// that means you do not need to add `@nuxt/kit` to your project's dependencies
import { createResolver, defineNuxtModule } from 'nuxt/kit'
import { generate } from './../lib/generate'
import * as jsonapiParse from 'jsonapi-parse'

export default defineNuxtModule({
  meta: {
    name: 'generateFavicon'
  },
  hooks: {
    ready: async (nuxtApp) => {
      console.info(`app ready`)
      const faviconApiKey = ''

      // the tide baseurl
      const tideBaseUrl = nuxtApp.options.runtimeConfig.public.tide.baseUrl

      // the public folder
      const publicFolderPath = nuxtApp.options.alias.public

      // 1. check the public folder does not already have a favicon.ico

      // 2. fetch the site taxonomy
      const siteTaxonomyRes = await fetch(
        `${tideBaseUrl}/api/v1/taxonomy_term/sites?filter%5Bdrupal_internal__tid%5D=8888&site=8888&include=field_site_favicon`
      )
      const siteTaxonomyData = await siteTaxonomyRes.json()
      const parsedData = jsonapiParse.parse(siteTaxonomyData).data

      // This is the favicon URL from the site taxonomy
      console.log('siteTaxonomy', parsedData[0]?.field_site_favicon?.url)

      // 3. fetch and save the favicon in the public folder nuxtApp.options.alias.public
      // save a reference to the saved favicon path savedFaviconPath

      // 4. generate the icons

      // https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites?filter%5Bdrupal_internal__tid%5D=8888&site=8888&include=field_site_favicon

      // await generate({
      //   masterPath: `${publicFolderPath}/${savedFaviconPath}`,
      //   outputPath: publicFolderPath,
      //   API_KEY: faviconApiKey,
      //   themeColour: 'red'
      // })
    }
  },
  setup() {
    const { resolve } = createResolver(import.meta.url)
    // console.log(resolve('./../lib/generate'))
  }
})
