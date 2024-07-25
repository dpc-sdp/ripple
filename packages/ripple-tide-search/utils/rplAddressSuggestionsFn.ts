import { capitalCase } from 'change-case'

const getSuburbSuggestions = async (query, args) => {
  const suggestionsIndex = 'vicpol-postcode-localities'

  const searchUrl = `/api/tide/app-search/${suggestionsIndex}/elasticsearch/_search`

  const queryDSL = {
    query: {
      bool: {
        should: [
          {
            match: {
              name: {
                query,
                operator: 'and'
              }
            }
          },
          {
            prefix: {
              name: {
                value: query,
                case_insensitive: true
              }
            }
          },
          {
            term: {
              postcode: {
                value: query
              }
            }
          }
        ]
      }
    }
  }

  const test = await $fetch(searchUrl, {
    method: 'POST',
    body: {
      ...queryDSL,
      size: args.maxSuburbSuggestions
    }
  })

  return test.hits.hits.map((itm) => {
    const center = getSingleResultValue(itm._source.center)?.split(',')

    return {
      id: itm._id,
      name: getSingleResultValue(itm._source['name']),
      postcode: getSingleResultValue(itm._source.postcode),
      bbox: itm._source.bbox,
      center: center?.length === 2 ? [center[1], center[0]] : undefined
    }
  })
}

const getAddressSuggestions = async (query, args) => {
  const geocodeServerUrl =
    'https://corp-geo.mapshare.vic.gov.au/arcgis/rest/services/Geocoder/VMAddressEZIAdd/GeocodeServer'

  const suggestions = await $fetch(`${geocodeServerUrl}/suggest`, {
    params: {
      text: query,
      maxSuggestions: args.maxAddressSuggestions,
      f: 'json'
    }
  })

  return suggestions.suggestions.map((item) => {
    return {
      id: item.magicKey,
      name: capitalCase(item.text),
      arcGISMagicKey: item.magicKey
    }
  })
}

export default async (query, args) => {
  const defaultArgs = {
    maxSuburbSuggestions: 0,
    maxAddressSuggestions: 10
  }

  const argsWithDefaults = {
    ...defaultArgs,
    ...(args || {})
  }

  return [
    ...(args.maxSuburbSuggestions > 0
      ? await getSuburbSuggestions(query, argsWithDefaults)
      : []),
    ...(await getAddressSuggestions(query, argsWithDefaults))
  ]
}
