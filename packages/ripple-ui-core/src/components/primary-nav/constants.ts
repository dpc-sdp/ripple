export interface RplPrimaryNavLogo {
  href: string
  src: string
  altText: string
}

export interface RplPrimaryNavItem {
  text: string
  href: string
  items?: RplPrimaryNavItem[]
  active: boolean
}
