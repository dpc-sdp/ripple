// `nuxt/kit` is a helper subpath import you can use when defining local modules
// that means you do not need to add `@nuxt/kit` to your project's dependencies
import { createResolver, defineNuxtModule } from 'nuxt/kit'
import { generate } from './../lib/generate'
import * as jsonapiParse from 'jsonapi-parse'
import fs from 'fs'
import path from 'path'
import { Readable } from 'stream'
import { finished } from 'stream/promises'

export default defineNuxtModule({
  meta: {
    name: 'generateFavicon'
  },
  hooks: {
    ready: async (nuxtApp) => {
      console.info(`app ready`)
      const faviconApiKey = 'key'

      const publicFolderPath = nuxtApp.options.alias.public

      // 1. Exit early if asset exists
      if (fs.existsSync(`${publicFolderPath}/favicon.ico`)) {
        console.log('Favicon: Assets already exist, skipping')
        return
      }

      // 2. Fetch theme and master asset url from site taxonomy
      const siteTaxonomyRes = await fetch(
          `${nuxtApp.options.runtimeConfig.public.tide.baseUrl}/api/v1/taxonomy_term/sites?filter%5Bdrupal_internal__tid%5D=7&site=7&include=field_site_favicon`
        ),
        siteTaxonomyData = await siteTaxonomyRes.json(),
        parsedData = jsonapiParse.parse(siteTaxonomyData).data[0]

      // 3. Extract theme colour (use Vic primary if theme is not set)
      const themeColour =
        parsedData.field_site_theme_values?.filter(
          (t: any) => t.key.trim() === 'rpl-clr-primary'
        )[0]?.value || '#0052C2'

      // 4. Fetch master asset
      const masterAssetUrl = parsedData.field_site_favicon?.url
      if (!masterAssetUrl) {
        console.log('Favicon: Master asset not set in site taxonomy, skipping')
        return
      }

      const savedFaviconPath = `${publicFolderPath}/${path.basename(
          masterAssetUrl
        )}`,
        masterAssetRes = await fetch(masterAssetUrl)

      // Create public folder if it doesn't exist at the app level
      if (!fs.existsSync(publicFolderPath)) {
        await fs.promises.mkdir(publicFolderPath)
      }
      const fileStream = fs.createWriteStream(savedFaviconPath, { flags: 'wx' })
      await finished(Readable.fromWeb(masterAssetRes.body).pipe(fileStream))

      // 5. Generate assets
      await generate({
        masterPath: savedFaviconPath,
        outputPath: publicFolderPath,
        API_KEY: faviconApiKey,
        themeColour: themeColour
      })
    }
  },
  setup() {
    const { resolve } = createResolver(import.meta.url)
    // console.log(resolve('./../lib/generate'))
  }
})
