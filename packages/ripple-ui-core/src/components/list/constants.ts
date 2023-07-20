import { RplColorThemes } from '../../lib/constants'

export type RplListTypes = 'ul' | 'ol'

export interface IRplListItemArray {
  text: string
  icon?: string
  iconColour?: (typeof RplColorThemes)[number]
  url?: string
  active?: boolean
  type?: string
  items?: IRplListItemArray[]
}
