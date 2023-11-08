import { init as initRfgApi } from 'rfg-api'
import fs from 'fs'
import path from 'path'

const { generateFavicon, createRequest } = initRfgApi()

export interface generateOpts {
  masterPath: string
  outputPath: string
  API_KEY: string
  themeColour: string
  siteName: string
}

export async function generate(opt: generateOpts): Promise<string | null> {
  console.info('Favicon: generating assets')

  const iosConfig = {
    pictureAspect: 'noChange'
  }

  const safariConfig = {
    pictureAspect: 'black_and_white',
    backgroundColor: '#ffffff',
    threshold: 60
  }

  const androidConfig = {
    pictureAspect: 'noChange',
    manifest: {
      name: opt.siteName,
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/'
    },
    assets: {
      legacyIcon: false,
      lowResolutionIcons: false
    },
    theme_color: opt.themeColour
  }

  const windowsConfig = {
    pictureAspect: 'white_silhouette',
    backgroundColor: opt.themeColour,
    assets: {
      windows80Ie10Tile: true,
      windows10Ie11EdgeTiles: {
        small: true,
        medium: true,
        big: true,
        rectangle: true
      }
    }
  }

  const faviconDesign = {
    desktopBrowser: {},
    ios: iosConfig,
    androidChrome: androidConfig,
    safariPinnedTab: safariConfig,
    windows: windowsConfig
  }

  return new Promise(function (resolve, reject) {
    generateFavicon(
      createRequest({
        apiKey: opt.API_KEY,
        masterPicture: opt.masterPath,
        iconsPath: opt.outputPath,
        design: faviconDesign,
        settings: { usePathAsIs: false }
        // versioning?
      }),
      path.resolve(process.cwd(), opt.outputPath || '.'),
      async (err: any) => {
        if (err) {
          // dont reject as we want to continue building regardless
          resolve(`Favicon: error generating - ${err.message}`)
        }
        // Remove outputPath from manifest files
        for (const manifest of ['browserconfig.xml', 'site.webmanifest']) {
          const path = `${opt.outputPath}/${manifest}`
          const pathExists = fs.existsSync(path)
          if (pathExists) {
            const original = await fs.promises.readFile(path, 'utf8')
            const updated = original.replace(
              new RegExp(opt.outputPath, 'g'),
              ''
            )
            await fs.promises.writeFile(path, updated, 'utf8')
          }
        }

        resolve('Favicon: generate complete!')
      }
    )
  })
}
