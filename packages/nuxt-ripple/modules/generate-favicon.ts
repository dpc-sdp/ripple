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
      const faviconApiKey = process.env.RFG_API_KEY

      // Exit early if API key is not set
      if (faviconApiKey === undefined) {
        console.info('Favicon: missing RFG_API_KEY, skipping')
        return
      }

      const publicFolderPath = nuxtApp.options.alias.public

      // 1. Check if asset already exists
      if (fs.existsSync(`${publicFolderPath}/favicon.ico`)) {
        console.info('Favicon: Assets already exist, skipping')
        return
      }

      // 2. Fetch theme and master asset url from site taxonomy
      const siteTaxonomyRes = await fetch(
          `${nuxtApp.options.runtimeConfig.public.tide.baseUrl}/api/v1/taxonomy_term/sites?filter%5Bdrupal_internal__tid%5D=${nuxtApp.options.runtimeConfig.public.tide.site}&site=${nuxtApp.options.runtimeConfig.public.tide.site}&include=field_site_favicon`
        ),
        siteTaxonomyData = await siteTaxonomyRes.json(),
        parsedData = jsonapiParse.parse(siteTaxonomyData).data[0]

      // 3. Extract site name
      const siteName =
        parsedData.field_site_slogan.processed.replace(/<p>|<\/p>/g, '') ||
        parsedData.name ||
        'SDP'

      // 4. Extract theme colour (use Vic primary if theme is not set)
      const themeColour =
        parsedData.field_site_theme_values?.filter(
          (t: any) => t.key.trim() === 'rpl-clr-primary'
        )[0]?.value || '#0052C2'

      // 5. Set up master asset in public
      const masterAssetUrl = parsedData.field_site_favicon?.url
      if (!masterAssetUrl) {
        console.info('Favicon: Master asset not set in site taxonomy, skipping')
        return
      }

      // 6. Create public folder if it doesn't exist at the app level
      if (!fs.existsSync(publicFolderPath)) {
        await fs.promises.mkdir(publicFolderPath)
      }

      // 7. Fetch master asset
      const savedFaviconPath = `${publicFolderPath}/${path.basename(
        masterAssetUrl
      )}`

      if (!fs.existsSync(savedFaviconPath)) {
        const masterAssetRes = await fetch(masterAssetUrl),
          fileStream = fs.createWriteStream(savedFaviconPath, { flags: 'wx' })
        // @ts-ignore TS2345
        await finished(Readable.fromWeb(masterAssetRes.body).pipe(fileStream))
      }

      // 8. Generate assets
      await generate({
        masterPath: savedFaviconPath,
        outputPath: publicFolderPath,
        API_KEY: faviconApiKey,
        themeColour: themeColour,
        siteName: siteName
      }).then(() => {
        // 9. Remove master asset
        fs.unlinkSync(savedFaviconPath)
      })
    }
  },
  setup() {
    const { resolve } = createResolver(import.meta.url)
    // console.log(resolve('./../lib/generate'))
  }
})
