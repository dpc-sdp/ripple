import type { Ref } from 'vue'

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

export type MapDeadSpace = {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export interface IRplMapInstance {
  defaultExtent: [number, number, number, number]
  deadSpace: Ref<MapDeadSpace>
}
