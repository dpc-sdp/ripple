export default function (config) {
  return function (req, res, next) {
    // Set cache age headers middleware
    const period = config.cacheAge || 300
    if (req.method === 'GET') {
      res.set('Cache-control', `public, max-age=${period}`)
    } else {
      // no cache
      res.set('Cache-control', `no-store`)
    }
    next()
  }
}
