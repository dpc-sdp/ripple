import { TideSiteData } from '../types'

export default (site: TideSiteData) => {
  const theme = useAppConfig()?.ripple?.theme
  const { public: config } = useRuntimeConfig()

  let link = []
  const favicon = site.favicon?.src ?? '/favicon.png'
  const appIcon = site.appIcon?.src ?? '/app-icon.png'
  const themeColour = theme?.['rpl-clr-primary'] ?? '#ffffff'

  const manifest = {
    id: config?.siteUrl,
    name: site?.name,
    short_name: site?.shortName,
    description: site?.slogan?.replace(/<[^>]*>/g, ''),
    start_url: config?.siteUrl,
    icons: [
      {
        src: appIcon,
        sizes: 'any'
      }
    ],
    theme_color: themeColour,
    background_color: '#ffffff',
    display: 'standalone'
  }

  link.push({
    rel: 'apple-touch-icon',
    href: appIcon
  })

  link.push({
    rel: 'manifest',
    href: `data:application/manifest+json,${encodeURIComponent(JSON.stringify(manifest))}`
  })

  link.push({
    rel: 'icon',
    href: favicon
  })

  useHead({ link, meta: [{ name: 'theme-color', content: themeColour }] })
}
