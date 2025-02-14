import { promises as fs } from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import { defineNuxtModule } from '@nuxt/kit'
import type { NitroConfig, PrerenderRoute } from 'nitropack'
import { extractLinksFromHtml } from './utils'

interface PrerenderFileDownloaderOptions {
  pathPrefix: string
  fileRegex: string
}

export default defineNuxtModule<PrerenderFileDownloaderOptions>({
  meta: {
    name: 'prerenderFileDownloader',
    configKey: 'prerenderFileDownloader'
  },
  defaults: {
    pathPrefix: '/_local/files/',
    fileRegex: 'pdf|jpg|png|zip|docx|txt|mp3|mp4|csv|xlsx|pptx'
  },
  setup(options, nuxt) {
    const baseURL = process.env.NUXT_PUBLIC_TIDE_BASE_URL

    nuxt.hook('nitro:config', (nitroConfig: NitroConfig) => {
      if (!nitroConfig.hooks) {
        nitroConfig.hooks = {}
      }
      ;(nitroConfig.hooks as any)['prerender:done'] = async (ctx: {
        prerenderedRoutes: PrerenderRoute[]
      }) => {
        console.log('✅ Prerendering completed! Processing HTML files...')

        const outputDir = path.join(nuxt.options.rootDir, '.output/public')
        const filesDir = path.join(outputDir, options.pathPrefix)
        await fs.mkdir(filesDir, { recursive: true })

        const htmlFiles = ctx.prerenderedRoutes.filter((routeCtx) =>
          routeCtx.fileName?.endsWith('.html')
        )

        const filePromises = htmlFiles.map(async (route) => {
          const filePath: string = path.join(
            outputDir,
            route.fileName === '/'
              ? 'index.html'
              : route.fileName || 'index.html'
          )

          try {
            let html = await fs.readFile(filePath, 'utf-8')
            const matches = extractLinksFromHtml(
              html,
              options.pathPrefix,
              options.fileRegex
            )

            // Process each matched file link
            const downloads = matches.map(async (relativePath) => {
              const localPath = path.join(outputDir, relativePath)
              const drupalFilePath =
                baseURL +
                relativePath.replace('/_local/files/', '/sites/default/files/')

              // Ensure the local directory exists before saving the file
              await fs.mkdir(path.dirname(localPath), { recursive: true })

              try {
                // Fetch the file from the external source
                const res = await fetch(drupalFilePath)
                const buffer = await res.buffer()

                // Save the file locally
                await fs.writeFile(localPath, buffer)
                console.log(`📁 Downloaded: ${relativePath} -> ${localPath}`)
              } catch (err) {
                console.error(`❌ Failed to download ${relativePath}:`, err)
              }
            })

            // Wait for all downloads to complete before proceeding
            await Promise.all(downloads)
            console.log(`Processed: ${filePath}`)
          } catch (err) {
            console.error(`❌ Error processing ${filePath}:`, err)
          }
        })

        await Promise.all(filePromises)
        console.log('✅ All HTML files processed!')
      }
    })
  }
})
