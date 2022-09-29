export interface RplPrimaryNavLogo {
  href: string
  src: string
  altText: string
}

export interface RplPrimaryNavItem {
  id: string
  text: string
  href: string
  items?: RplPrimaryNavItem[]
  active: boolean
}
