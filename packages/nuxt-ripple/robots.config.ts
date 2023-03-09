// Default robots.txt rules for all sites
export default [
  { UserAgent: 'SemrushBot', Disallow: '/' },
  {
    UserAgent: '*',
    Disallow: () => {
      const excludedPaths = [
        '/js',
        '/img',
        '/_nuxt/*',
        '/oauth/*',
        '/preview/*',
        '/share-link'
      ]
      if (process.env?.LAGOON_ENVIRONMENT_TYPE !== 'production') {
        excludedPaths.push('/')
      }
      return excludedPaths
    }
  },
  {
    Sitemap: (req) => {
      return req?.headers?.host ? `https://${req.headers.host}/sitemap.xml` : ''
    }
  }
]
