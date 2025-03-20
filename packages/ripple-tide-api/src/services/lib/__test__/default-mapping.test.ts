import { expect, describe, it } from 'vitest'
import defaultMapping from './../default-mapping'

const { mapping } = defaultMapping,
  raw = {
    title: 'Demo Landing Page',
    changed: '2023-10-26T09:41:42+11:00',
    created: '2023-10-26T09:41:42+11:00',
    type: 'node--landing_page',
    drupal_internal__nid: '11dede11-10c0-111e1-1100-000000000330'
  },
  output = {
    title: 'Demo Landing Page',
    changed: '2023-10-26T09:41:42+11:00',
    created: '2023-10-26T09:41:42+11:00',
    type: 'landing_page',
    nid: '11dede11-10c0-111e1-1100-000000000330'
  },
  processed = {}

for (const [key, value] of Object.entries(mapping)) {
  if (typeof value === 'function') {
    processed[key] = value(raw)
  } else {
    processed[key] = raw[value]
  }
}

describe('BaseMapping', () => {
  it(`passes raw API through default mapping`, () => {
    expect(processed).toEqual(output)
  })
})
