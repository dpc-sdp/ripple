export const rplIconSizes = ['xs', 's', 'm', 'l'] as const
export type RplIconSize = (typeof rplIconSizes)[number]

export const rplIconColours = [
  'default',
  'white',
  'text',
  'information',
  'success',
  'warning',
  'error',
  'inactive'
] as const

export type RplIconColour = (typeof rplIconColours)[number]

export const RplCoreIconNames = [
  'icon-cancel',
  'icon-check-circle-filled',
  'icon-chevron-down',
  'icon-chevron-left',
  'icon-chevron-right',
  'icon-chevron-up',
  'icon-current-location',
  'icon-document-lined',
  'icon-document',
  'icon-download',
  'icon-enlarge-square-filled',
  'icon-enlarge',
  'icon-exclamation-circle-filled',
  'icon-facebook',
  'icon-file-secure',
  'icon-home',
  'icon-information-circle-filled',
  'icon-link-external-square-filled',
  'icon-linkedin',
  'icon-mail',
  'icon-phone',
  'icon-pin',
  'icon-twitter',
  'icon-view',
  'icon-whatsapp',
  'icon-x'
] as const

export const RplCoreIconNameSet = new Set<string>(RplCoreIconNames)

export interface RplIconProps {
  name?: string
  colour?: RplIconColour
  size?: RplIconSize
  padded?: boolean
  title?: string
}
