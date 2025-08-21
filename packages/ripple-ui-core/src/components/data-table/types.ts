export type tableColumnConfig = {
  label: string
  objectKey?: string
  classes?: string[]
  component?: string
  props?: any
  isHTML?: boolean
  isLabelHTML?: boolean
}

export type tableRow = {
  id?: string
  [key: string]: any
}

export interface HeadingType {
  horizontal: boolean
  vertical: boolean
}
