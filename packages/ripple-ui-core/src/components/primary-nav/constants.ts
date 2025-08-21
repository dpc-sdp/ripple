import { Ref } from 'vue'

export interface IRplPrimaryNavLogo {
  href: string
  src?: string
  printSrc?: string
  altText: string
}

export interface IRplPrimaryNavItem {
  id: string
  text: string
  url: string
  items?: IRplPrimaryNavItem[]
  active?: boolean
}

export interface IRplPrimaryNavActiveItems {
  level1?: IRplPrimaryNavItem
  level2?: IRplPrimaryNavItem
  level3?: IRplPrimaryNavItem
}

export type RplPrimaryNavToggleItemOptions = [
  level: 1 | 2 | 3,
  item: IRplPrimaryNavItem,
  open?: boolean
]

export interface IRplPrimaryNavFocusOptions {
  focus: Ref
  setFocus: (string) => void
  navCollapsed: boolean
  hasQuickExit: boolean
  hasUserActions: boolean
}
