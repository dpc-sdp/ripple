global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
}

process.env.NUXT_PUBLIC_TIDE_SITE = 'https://develop.content.reference.sdp.vic.gov.au/';
