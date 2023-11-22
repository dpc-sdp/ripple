import { useAppConfig, useHead } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('tide:page', () => {
    useHead({
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color: useAppConfig()?.ripple?.theme?.['rpl-clr-primary'] || '#0054c9'
        }
      ],
      meta: [
        {
          name: 'msapplication-TileColor',
          content:
            useAppConfig()?.ripple?.theme?.['rpl-clr-primary'] || '#0054c9'
        },
        { name: 'theme-color', content: '#ffffff' }
      ]
    })
  })
})
