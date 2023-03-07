import { useRuntimeConfig } from '#imports'

const configRobots = useRuntimeConfig()?.robots

// Default robots.txt rules for all sites
const robots = [
  { UserAgent: 'SemrushBot' },
  { Disallow: '/' },
  { UserAgent: '*' },
  {
    Disallow: () => {
      const excludedPaths = [
        '/js',
        '/img',
        '/_nuxt/*',
        '/oauth/*',
        '/preview/*',
        '/share-link'
      ]
      if (process.env.LAGOON_ENVIRONMENT_TYPE !== 'production') {
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

// Custom robots.txt rules, this can be a single object or an array of objects
// which is set under the robots property in the runtimeConfig
if (Array.isArray(configRobots)) {
  robots.push(...configRobots)
} else if (typeof configRobots === 'object') {
  robots.push(configRobots)
}

export default robots
