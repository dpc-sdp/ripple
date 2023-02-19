export interface IRplPrimaryNavLogo {
  href: string
  src: string
  altText: string
}

export interface IRplPrimaryNavItem {
  id: string
  text: string
  url: string
  items?: IRplPrimaryNavItem[]
  active: boolean
}

export interface IRplPrimaryNavActiveItems {
  level1?: IRplPrimaryNavItem
  level2?: IRplPrimaryNavItem
  level3?: IRplPrimaryNavItem
}
