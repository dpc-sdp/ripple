export interface IRplVerticalNavItem {
  title: string
  url?: string
  items?: IRplVerticalNavItem[]
  active?: boolean
}

export interface RplVerticalNavProps {
  title?: string
  items: IRplVerticalNavItem[]
  toggleLevels?: number
}
