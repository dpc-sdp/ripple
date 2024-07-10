export default async (
  query: string,
  suggestionsIndex: string = 'vic-postcode-localities',
  suggestionsKey: string = 'name',
  mapResultsFnName?: string
) => {
  const searchUrl = `/api/tide/app-search/${suggestionsIndex}/elasticsearch/_search`
  const queryDSL = {
    query: {
      bool: {
        should: [
          {
            match: {
              [suggestionsKey]: {
                query,
                operator: 'and'
              }
            }
          },
          {
            prefix: {
              [suggestionsKey]: {
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

  const response = await $fetch(searchUrl, {
    method: 'POST',
    body: {
      ...queryDSL,
      size: 20
    }
  })

  let mappingFn = (itm: any) => {
    const center = getSingleResultValue(itm._source.center)?.split(',')

    return {
      id: itm._id,
      name: getSingleResultValue(itm._source[suggestionsKey]),
      postcode: getSingleResultValue(itm._source.postcode),
      bbox: itm._source.bbox,
      center: center?.length === 2 ? [center[1], center[0]] : undefined
    }
  }

  // If no transform function is defined, return an empty array
  if (mapResultsFnName) {
    mappingFn = useAppConfigFunction(
      mapResultsFnName,
      'locationSuggestionMappingFunctions'
    )
  }

  if (response && response.hits.total.value > 0) {
    return response.hits.hits.map(mappingFn)
  }
}
