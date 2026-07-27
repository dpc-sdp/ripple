export interface IRplPrimaryNavLogo {
  src: string
  alt: string
  url?: string
}

export interface IRplPrimaryNavItem {
  text: string
  url?: string
  items?: IRplPrimaryNavItem[]
  active?: boolean
}

export interface RplPrimaryNavProps {
  primaryLogo: IRplPrimaryNavLogo
  secondaryLogo?: IRplPrimaryNavLogo
  items: IRplPrimaryNavItem[]
  showSearch?: boolean
  searchUrl?: string
  searchMaxLength?: number
  showQuickExit?: boolean
}
