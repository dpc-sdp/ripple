import { init as initRfgApi } from 'rfg-api'
import path from 'path'

const { generateFavicon, createRequest } = initRfgApi()

export interface generateOpts {
  masterPath: string
  outputPath: string
  API_KEY: string
  themeColour: string
}

export async function generate(opt: generateOpts): Promise<object | null> {
  console.log('Favicon: generating assets')

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
      name: 'Ripple',
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

  return generateFavicon(
    createRequest({
      apiKey: opt.API_KEY,
      masterPicture: opt.masterPath,
      iconsPath: opt.outputPath,
      design: faviconDesign,
      settings: { usePathAsIs: false }
      // versioning?
    }),
    path.resolve(process.cwd(), opt.outputPath || '.'),
    (err: any) => {
      if (err) {
        throw err
      }

      console.log('Favicon: generate complete!')
    }
  )
}
