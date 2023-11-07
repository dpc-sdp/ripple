export type addressGeoCoderEnum = 'mapbox' | 'vicmap' | 'mapbox' | 'esri'

export type lgaDataType = {
  short: string
  name: string
}

export interface IAddressResultResponse {
  name: string
  type?: string
  longitude: number
  latitude: number
}

export interface IMapboxAddressFeatureContext {
  short_code: string
  text: string
}

export interface IMapboxAddressFeature {
  context: IMapboxAddressFeatureContext[]
  relevance: number
  place_name: string
  place_type: string[]
  center: [number[], number[]]
}

export interface IEsriCouncilFeature {
  attributes: {
    LGA_NAME: string
  }
}

export interface IEsriCouncilFeatureResponse {
  features: IEsriCouncilFeature[]
}

export interface IEsriAddressSuggestions {
  score: number
  address: string
  location: {
    x: number
    y: number
  }
}

export interface IVicMapAddressSuggestions {
  attributes: {
    EZI_ADDRESS: string
  }
  geometry: {
    x: number
    y: number
  }
}
