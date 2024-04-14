export const mockLogger = {
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
}

export const exampleMapping = {
  includes: [],
  mapping: {
    test: 'field'
  }
}

export const exampleApiConnection = {
  site: '123',
  baseUrl: ''
}

export const exampleApiConfig = {
  apiPrefix: '/api/v1'
}

export const exampleConfig = {
  ...exampleApiConnection,
  mapping: {
    site: exampleMapping,
    event: exampleMapping
  },
  ...exampleApiConfig,
  debug: false
}
