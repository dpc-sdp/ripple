import mockRoutes from './mock-routes'
export default {
  site: 'http://localhost:3000',
  debug: true,
  scanner: {
    device: 'mobile'
  },
  urls: mockRoutes.map((route: { path: string }) => route.path),
  ci: {
    budget: {
      performance: 95,
      accessibility: 90,
      'best-practices': 90,
      seo: 80
    }
  }
}
