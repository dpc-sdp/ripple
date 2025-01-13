// Default robots.txt rules for all sites
export default [
  { UserAgent: 'SemrushBot', Disallow: '/' },
  {
    UserAgent: '*',
    CrawlDelay: 2,
    Disallow: [
      '/js',
      '/img',
      '/_nuxt/*',
      '/oauth/*',
      '/preview/*',
      '/share-link'
    ]
  },
  {
    Sitemap: (req) => {
      return req?.headers?.host ? `https://${req.headers.host}/sitemap.xml` : ''
    }
  }
]
