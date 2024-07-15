import { TideSiteData } from '../types'

export default (site: TideSiteData, theme: any) => {
  const { public: config } = useRuntimeConfig()

  let link = []
  const siteUrl = config?.siteUrl || ''
  const themeColour = theme?.['rpl-clr-primary'] ?? '#ffffff'

  const manifest = {
    id: siteUrl,
    name: site?.name,
    short_name: site?.shortName,
    description: site?.slogan?.replace(/<[^>]*>/g, ''),
    start_url: siteUrl,
    icons: [
      {
        src: site.appIcon?.src ?? siteUrl + (site.appIcon?.android || ''),
        sizes: 'any'
      }
    ],
    theme_color: themeColour,
    background_color: '#ffffff',
    display: 'standalone'
  }

  link.push({
    rel: 'apple-touch-icon',
    href: site.appIcon?.src ?? site.appIcon?.apple
  })

  link.push({
    rel: 'manifest',
    href: `data:application/manifest+json,${encodeURIComponent(JSON.stringify(manifest))}`
  })

  link.push({
    rel: 'icon',
    href: site.favicon?.src
  })

  useHead({ link, meta: [{ name: 'theme-color', content: themeColour }] })
}
