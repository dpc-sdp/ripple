export interface IRplBreadcrumbsItem {
  text: string
  url: string
}

export interface RplBreadcrumbsProps {
  items?: IRplBreadcrumbsItem[]
  besideQuickExit?: boolean
  displayBeforeCollapse?: number
  collapse?: boolean
  currentClass?: string
  currentDir?: string
}
