import { defineEventHandler, H3Event } from 'h3'
// @ts-ignore
import { createHandler } from '@dpc-sdp/ripple-tide-api'
import {
  findLGAByQuery,
  getLGAByLocalityQuery,
  getSuggestionsByAddress,
  getCouncilByEsriLatLng
} from './../../../lib/address'
import {
  DEFAULT_SCORE,
  COUNCIL_PER_SUGGESTION
} from './../../../lib/address/constants'
import { addressGeoCoderEnum } from './../../../lib/address/types'

interface addressQuery {
  q?: string
  geocoder?: addressGeoCoderEnum
  limit?: string
  score?: string
  addresses: string
  postcodes: string
  localities: string
  lgas: string
}
const boolVal = (val, defaultVal) => {
  if (typeof val !== 'undefined') {
    if (val === 'true') {
      return true
    } else if (val === 'false') {
      return false
    }
  }
  return defaultVal
}

export const createAddressHandler = (event: H3Event) => {
  return createHandler(event, 'AddressServiceHandler', async () => {
    const queryObj: addressQuery = await getQuery(event)
    const query = queryObj.q
    const addressSearch = boolVal(queryObj.addresses, true)
    const localitiesSearch = boolVal(queryObj.localities, true)
    const postcodeSearch = boolVal(queryObj.postcodes, true)
    const lgasSearch = boolVal(queryObj.lgas, true)
    const results = []
    const geocoder = queryObj.geocoder || 'mapbox'
    const resultsLimit = queryObj.limit ? parseInt(queryObj.limit) : 8
    const score = queryObj.score ? parseFloat(queryObj.score) : DEFAULT_SCORE

    if (!query) {
      return {
        error: 'No query defined'
      }
    }

    console.log('queryObj.addresses', queryObj)
    console.log(addressSearch)

    // Simple string match on LGA name
    if (lgasSearch) {
      const lgaResults = findLGAByQuery(query)

      if (lgaResults && lgaResults.length > 0) {
        results.push(...lgaResults)
      }
    }

    // match suburb or postcode from budget data
    if (localitiesSearch || postcodeSearch) {
      const localityResults = await getLGAByLocalityQuery(query)

      console.log('localityResults', localityResults)

      if (localityResults && localityResults.length > 0) {
        results.push(...localityResults)
      }
    }

    // get address suggestions from geocoder
    if (addressSearch) {
      const suggestions = await getSuggestionsByAddress(
        query,
        geocoder,
        resultsLimit,
        score
      )

      if (suggestions && suggestions.length > 0) {
        for (let i = 0; i < suggestions.length; i++) {
          const suggestion = suggestions[i]
          // NOTE: this is very slow
          if (COUNCIL_PER_SUGGESTION) {
            const council = await getCouncilByEsriLatLng(
              suggestion.latitude,
              suggestion.longitude
            )
            if (council && council !== 'unknown') {
              results.push({
                ...suggestion,
                council
              })
            }
          } else {
            results.push(suggestion)
          }
        }
      }
    }

    const limitResults = (results: unknown[], limit: number) => {
      if (limit && typeof limit === 'number' && results.length > limit) {
        return results.slice(0, limit)
      }
      return results
    }

    return { query, results: limitResults(results, resultsLimit) }
  })
}

export default defineEventHandler((event: H3Event) => {
  return createAddressHandler(event)
})
