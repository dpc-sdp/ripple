export interface IRplVerticalNavItem {
  id: string
  text: string
  url: string
  active: boolean
  items?: IRplVerticalNavItem[]
}

export interface IRplVerticalNavProcessed {
  active?: string[]
  items?: IRplVerticalNavItem[]
}
