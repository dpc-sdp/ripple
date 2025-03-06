export interface IRplMapFeature {
  id: string
  lat: number
  lng: number
  title?: string
  description?: string
  data?: Record<string, any>
}

export interface IRplMapLayer {
  id: string
  label: string
  image: string
}
