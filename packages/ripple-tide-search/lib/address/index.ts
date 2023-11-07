import {
  DEFAULT_SCORE,
  FILTER_UNINCORPORATED_AREAS,
  UNINCORPORATED_AREAS,
  MIN_QUERY_LENGTH
} from './constants'

import type {
  IAddressResultResponse,
  IMapboxAddressFeature,
  IEsriCouncilFeatureResponse,
  addressGeoCoderEnum,
  lgaDataType,
  IEsriAddressSuggestions,
  IVicMapAddressSuggestions
} from './types'

const localityData = []
const lgaNames = []

export const fetchData = (url: string, params = {}): Promise<any> => {
  return $fetch(url, { params })
}

export const getCouncilByEsriLatLng = (
  latitude: number,
  longitude: number
): Promise<string> => {
  const baseUrl =
    'https://services6.arcgis.com/GB33F62SbDxJjwEL/arcgis/rest/services/Vicmap_Admin/FeatureServer/9/query'
  const params = {
    where: '1=1',
    geometry: `${longitude},${latitude}`,
    geometryType: 'esriGeometryPoint',
    inSR: '4326',
    spatialRel: 'esriSpatialRelWithin',
    resultType: 'none',
    distance: '0.0',
    units: 'esriSRUnit_Meter',
    returnGeodetic: 'false',
    outFields: 'LGA_NAME',
    returnGeometry: 'false',
    returnCentroid: 'false',
    featureEncoding: 'esriDefault',
    multipatchOption: 'xyFootprint',
    applyVCSProjection: 'false',
    returnIdsOnly: 'false',
    returnUniqueIdsOnly: 'false',
    returnCountOnly: 'false',
    returnExtentOnly: 'false',
    returnQueryGeometry: 'false',
    returnDistinctValues: 'false',
    cacheHint: 'false',
    returnZ: 'false',
    returnM: 'false',
    returnExceededLimitFeatures: 'true',
    sqlFormat: 'none',
    f: 'json'
  }
  return fetchData(baseUrl, params).then(
    (data: IEsriCouncilFeatureResponse) => {
      if (data && data.features && data.features.length > 0) {
        return data.features[0].attributes.LGA_NAME
      }
      return 'unknown'
    }
  )
}

export const getMapboxAddressSuggestions = (
  address: string,
  limit: number,
  score: number
): Promise<IAddressResultResponse[]> => {
  const baseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`
  const token =
    'pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g'
  const params = {
    country: 'AU',
    access_token: token,
    types: 'address',
    limit,
    bbox: '140.961682,-39.2305638,150.0537139,-33.980426' // Victoria BBox boundary
  }
  return fetchData(baseUrl, params).then((data) => {
    if (data.features && data.features.length > 0) {
      return data.features
        .filter((feature: IMapboxAddressFeature) => {
          if (
            feature.context.some((ctx) => ctx.short_code === 'AU-VIC') &&
            feature.relevance > score / 100
          ) {
            if (!FILTER_UNINCORPORATED_AREAS) {
              return true
            } else if (
              !feature.context.some((ctx) =>
                UNINCORPORATED_AREAS.includes(ctx.text)
              )
            ) {
              return true
            }
          }
          return false
        })
        .map((feature: IMapboxAddressFeature) => {
          return {
            name: feature.place_name,
            type: feature.place_type[0],
            longitude: feature.center[0],
            latitude: feature.center[1]
          }
        })
    }
  })
}

export const getEsriAddressSuggestions = async (
  address: string,
  limit: number,
  score: number
): Promise<IAddressResultResponse[]> => {
  const baseUrl =
    'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates'
  const token =
    'AAPKb4288179ee4c40c99fedf129bcf74633RxWXGuVkAefFF0Iz0GGNu8wjowjpR3YNV9kzJ5W8AIC3pO4xhbIjLWomfgdFebeS'
  const params = {
    address,
    countryCode: 'AU',
    region: 'Victoria',
    maxLocations: limit,
    geometryPrecision: '6',
    category: 'Address',
    f: 'json',
    token
  }
  const { candidates } = await fetchData(baseUrl, params)
  return candidates
    .filter((res: IEsriAddressSuggestions) => {
      return res.score > score
    })
    .map((res: IEsriAddressSuggestions) => {
      return {
        name: res.address,
        longitude: res.location.x,
        latitude: res.location.y
      }
    })
}

export const getVicMapAddressSuggestions = async (
  address: string
): Promise<IAddressResultResponse[]> => {
  const baseUrl =
    'https://services6.arcgis.com/GB33F62SbDxJjwEL/ArcGIS/rest/services/Vicmap_Address/FeatureServer/0/query'
  const params = {
    where: `NUM_ROAD_ADDRESS='${address.replace(/ /g, '+').toUpperCase()}'`,
    outFields: 'EZI_ADDRESS',
    geometryType: 'esriGeometryPoint',
    returnGeometry: 'true',
    f: 'json'
  }
  const response = await fetchData(baseUrl, params)
  return response.features.map((res: IVicMapAddressSuggestions) => {
    return {
      name: res.attributes.EZI_ADDRESS,
      longitude: res.geometry.x,
      latitude: res.geometry.y
    }
  })
}

export const getSuggestionsByAddress = (
  address: string,
  geocoder: addressGeoCoderEnum = 'mapbox',
  limit: number | false,
  score = DEFAULT_SCORE
): Promise<IAddressResultResponse[]> => {
  switch (geocoder) {
    case 'vicmap':
      return getVicMapAddressSuggestions(address)
    case 'mapbox':
      return getMapboxAddressSuggestions(address, limit, score)
    case 'esri':
      return getEsriAddressSuggestions(address, limit, score)
    default:
      return getMapboxAddressSuggestions(address, limit, score)
  }
}

export const getLGAByLocalityQuery = async (query: string) => {
  if (query.length > MIN_QUERY_LENGTH) {
    const q = query.toLowerCase()
    const searchUrl = `https://a83890f7a31dea14e1ae83c6f0afacca.sdp3.elastic.sdp.vic.gov.au/sdp_data_pipelines_vic_localities/_search`
    const queryDSL = {
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query: q,
                fields: ['name', 'lga_key', 'lga', 'lga_gazetted_name']
              }
            }
          ],
          filter: [{ terms: { type: ['postcode'] } }]
        }
      }
    }
    console.log(JSON.stringify(queryDSL))

    let localityResponse
    try {
      localityResponse = await $fetch(searchUrl, {
        method: 'POST',
        body: {
          ...queryDSL,
          size: 6
        }
      })
    } catch (e) {
      console.error(e)
    }

    if (localityResponse?.hits?.hits?.length > 0) {
      const matchedLocalities = localityResponse.hits.hits.map((itm) => {
        console.log(itm)
        return {
          name: itm._source?.name,
          council: itm._source?.lga_gazetted_name,
          lga_key: itm._source?.lga_key,
          type: itm._source?.type
        }
      })
      return matchedLocalities
    } else {
      return []
    }
  }
  return []
}

export const titleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word: string) => {
      return word.replace(word[0], word[0].toUpperCase())
    })
    .join(' ')
}

export const findLGAByQuery = (query: string) => {
  if (!query) {
    return []
  }
  const q = `${query}`.toLowerCase()
  return lgaNames
    .filter((lga) => {
      return lga && (lga.short === q || lga.name?.toLowerCase() === q)
    })
    .map((lga: lgaDataType) => ({
      name: titleCase(lga.short),
      council: lga.name,
      type: 'LGA'
    }))
}
