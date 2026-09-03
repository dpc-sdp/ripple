import type { IRplListItemArray } from '../list'

export interface IRplContactUsDetails {
  name?: string
  department?: string
  street?: string
  suburb?: string
  state?: string
  postcode?: string
}

export interface RplContactUsProps {
  title?: string | boolean
  address?: IRplContactUsDetails | null
  items?: IRplListItemArray[]
}
