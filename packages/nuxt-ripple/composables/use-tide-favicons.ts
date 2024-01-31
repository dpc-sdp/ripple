export default () => {
  const theme = useAppConfig().ripple?.theme

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
        color:
          theme && theme.hasOwnProperty('rpl-clr-primary')
            ? theme['rpl-clr-primary']
            : '#0054c9'
      }
    ],
    meta: [
      {
        name: 'msapplication-TileColor',
        content:
          theme && theme.hasOwnProperty('rpl-clr-primary')
            ? theme['rpl-clr-primary']
            : '#0054c9'
      },
      { name: 'theme-color', content: '#ffffff' }
    ]
  })
}
