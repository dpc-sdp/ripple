export interface IRplMapFeature {
  id: string
  lat: number
  lng: number
  title?: string
  description?: string
  data?: Record<string, any>
}
