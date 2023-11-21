import * as jsonapiParse from 'jsonapi-parse'
import fs from 'fs'
import path from 'path'
import { Readable } from 'stream'
import { finished } from 'stream/promises'
import { init as initRfgApi } from 'rfg-api'

const { generateFavicon, createRequest } = initRfgApi()

export interface generateOpts {
  masterPath: string
  outputPath: string
  API_KEY: string
  themeColour: string
  siteName: string
}

// Set config for RFG and call API
async function generate(opt: generateOpts): Promise<object | null> {
  console.info('Favicon: generating assets...')

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
    async (err: any) => {
      if (err) {
        throw err
      }

      // Remove outputPath from manifest files
      for (const manifest of ['browserconfig.xml', 'site.webmanifest']) {
        const path = `${opt.outputPath}/${manifest}`,
          original = await fs.promises.readFile(path, 'utf8'),
          updated = original.replace(new RegExp(opt.outputPath, 'g'), '')
        await fs.promises.writeFile(path, updated, 'utf8')
      }

      console.info('Favicon: generate complete!')
    }
  )
}

interface faviconArgs {
  apiKey: string
  baseUrl: string
  siteId: string
  publicPath: string
}

// Main
export default async function favicon(args: faviconArgs) {
  const publicFolderPath = args.publicPath

  if (!args.apiKey) {
    console.info('Favicon: missing apiKey')
    return
  }
  if (!args.baseUrl) {
    console.info('Favicon: missing baseUrl')
    return
  }
  if (!args.siteId) {
    console.info('Favicon: missing siteId')
    return
  }

  // @todo allow overwrite
  // 1. Check if asset already exists
  if (fs.existsSync(`${publicFolderPath}/favicon.ico`)) {
    console.info('Favicon: Assets already exist')
    return
  }

  // 2. Fetch theme and master asset url from site taxonomy
  const siteTaxonomyRes = await fetch(
      `${args.baseUrl}/api/v1/taxonomy_term/sites?filter%5Bdrupal_internal__tid%5D=${args.siteId}&site=${args.siteId}&include=field_site_favicon`,
      {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'text/plain',
          Authorization: 'Basic ' + Buffer.from('dpc:sdp').toString('base64')
        }
      }
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
    console.info('Favicon: Master asset not set in site taxonomy')
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
    API_KEY: args.apiKey,
    themeColour: themeColour,
    siteName: siteName
  }).then(() => {
    // 9. Remove master asset
    fs.unlinkSync(savedFaviconPath)
  })
}
