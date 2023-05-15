global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
}

process.env.NUXT_PUBLIC_TIDE_CONTENT_API_BASE_URL = 'https://develop.content.reference.sdp.vic.gov.au/';
