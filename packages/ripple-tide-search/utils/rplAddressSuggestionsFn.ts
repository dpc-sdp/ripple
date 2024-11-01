import { capitalCase } from 'change-case'

const getLGASuggestions = async (query, args) => {
  const suggestionsIndex = args.lgaIndex

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
      size: args.maxLGASuggestions
    }
  })

  return test.hits.hits.map((itm) => {
    const areaType = getSingleResultValue(itm._source.area_type)
    const rawName = getSingleResultValue(itm._source['name'])
    const name = areaType === 'lga' ? `${rawName} Council` : rawName
    const tag =
      areaType !== 'lga'
        ? `${itm._source.lga_official_name} Council`
        : undefined

    return {
      id: itm._id,
      name,
      lgaOfficialName: itm._source.lga_official_name,
      bbox: itm._source.lga_bbox,
      tag
    }
  })
}

const getSuburbSuggestions = async (query, args) => {
  const suggestionsIndex = args.suburbsIndex

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
      arcGISMagicKey: item.magicKey,
      zoomLevel: args?.addressZoomLevel
    }
  })
}

export default async (query, args) => {
  const defaultArgs = {
    maxLGASuggestions: 0,
    maxSuburbSuggestions: 0,
    maxAddressSuggestions: 10,
    suburbsIndex: 'vicpol-postcode-localities',
    lgaIndex: 'budget-areas-data',
    addressZoomLevel: 12
  }

  const argsWithDefaults = {
    ...defaultArgs,
    ...(args || {})
  }

  return [
    ...(args.maxLGASuggestions > 0
      ? await getLGASuggestions(query, argsWithDefaults)
      : []),
    ...(args.maxSuburbSuggestions > 0
      ? await getSuburbSuggestions(query, argsWithDefaults)
      : []),
    ...(args.maxAddressSuggestions > 0
      ? await getAddressSuggestions(query, argsWithDefaults)
      : [])
  ]
}
