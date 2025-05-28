import type { TideSiteData } from '../types'
import { useRuntimeConfig, useHead } from '#imports'

export default (site: TideSiteData, theme: { 'rpl-clr-primary'?: string }) => {
  const { public: config } = useRuntimeConfig()

  const link = []
  const siteUrl = config?.siteUrl || ''
  const themeColour = theme?.['rpl-clr-primary'] ?? '#ffffff'

  const manifest = {
    id: siteUrl,
    name: site?.name,
    short_name: site?.shortName || '',
    description: site?.slogan?.replace(/<[^>]*>|<|>/g, ''),
    start_url: siteUrl,
    icons: site.appIcon?.src
      ? [
          {
            src: siteUrl + site.appIcon.src,
            sizes: 'any'
          }
        ]
      : undefined,
    theme_color: themeColour,
    background_color: '#ffffff',
    display: 'standalone'
  }

  if (site.appIcon?.src) {
    link.push({
      rel: 'apple-touch-icon',
      href: site.appIcon?.src
    })
  }

  link.push({
    rel: 'manifest',
    href: `data:application/manifest+json,${encodeURIComponent(JSON.stringify(manifest))}`
  })

  if (site.favicon?.src) {
    link.push({
      rel: 'icon',
      href: site.favicon?.src
    })
  }

  useHead({ link, meta: [{ name: 'theme-color', content: themeColour }] })
}
