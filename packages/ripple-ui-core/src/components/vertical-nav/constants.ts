export interface IRplVerticalNavItem {
  id: string
  text: string
  url: string
  active: boolean
  items: IRplVerticalNavItem[]
}
