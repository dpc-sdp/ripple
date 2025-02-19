import { vi } from 'vitest'

export const mockLogger = {
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn()
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
