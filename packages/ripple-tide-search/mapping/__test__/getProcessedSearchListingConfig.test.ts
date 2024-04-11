import { expect, describe, it } from '@jest/globals'
import { getProcessedSearchListingConfig } from '../utils'
import {
  testListingUI,
  testListingConfig,
  testListingMix,
  expectedListingUI,
  expectedListingConfig,
  expectedListingMix
} from './data'

const tidePageApi = new (class mockTidePageApi {
  async getTaxonomy(): Promise<object[]> {
    return new Promise((resolve) =>
      resolve([
        {
          drupal_internal__tid: 1,
          name: 'Option 1',
          weight: 0,
          status: true
        }
      ])
    )
  }
})()

describe('getProcessedSearchListingConfig', () => {
  it('it maps the Drupal UI fields into the correct structure', async () => {
    const output = await getProcessedSearchListingConfig(
      testListingUI,
      tidePageApi
    )

    expect(output).toEqual(expectedListingUI)
  })

  it('it handles using a supplied config directly, taking into account Drupal defaults', async () => {
    const output = await getProcessedSearchListingConfig(
      testListingConfig,
      tidePageApi
    )

    expect(output).toEqual(expectedListingConfig)
  })

  it('it merges the data from Drupal UI fields and the JSON blob, with the blob taking precedence', async () => {
    const output = await getProcessedSearchListingConfig(
      testListingMix,
      tidePageApi
    )

    expect(output).toEqual(expectedListingMix)
  })
})
