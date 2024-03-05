import coreIconKeys from './../../assets/icons/sprite.js'
import customIconImports from './custom.js'

export const RplCoreIconNames = coreIconKeys
export const RplCustomIconNames = Object.keys(customIconImports)
export const RplIconNames = [...RplCoreIconNames, ...RplCustomIconNames]
export const RplIconSizes = ['xs', 's', 'm', 'l'] as const
export type RplIconPlacement = 'before' | 'after'
export const RplIconGroups = {
  alert: [
    'icon-fire',
    'icon-flood',
    'icon-lightning',
    'icon-medical',
    'icon-smoke',
    'icon-temperature',
    'icon-traffic'
  ],
  social: [
    'icon-facebook',
    'icon-instagram',
    'icon-linkedin',
    'icon-spotify',
    'icon-wechat',
    'icon-whatsapp',
    'icon-youtube',
    'icon-x'
  ],
  standard: [
    'icon-accessible',
    'icon-add',
    'icon-arrow-up',
    'icon-arrow-right',
    'icon-arrow-down',
    'icon-arrow-left',
    'icon-attach',
    'icon-browser',
    'icon-calendar-lined',
    'icon-cancel',
    'icon-cancel-circle-filled',
    'icon-car',
    'icon-check',
    'icon-check-circle-filled',
    'icon-chevron-up',
    'icon-chevron-right',
    'icon-chevron-down',
    'icon-chevron-left',
    'icon-child-lined',
    'icon-current-location',
    'icon-document',
    'icon-document-lined',
    'icon-dollar-circle-filled',
    'icon-download',
    'icon-enlarge',
    'icon-enlarge-square-filled',
    'icon-exclamation-circle-filled',
    'icon-free',
    'icon-home',
    'icon-information-circle-filled',
    'icon-link',
    'icon-link-external-square-filled',
    'icon-list',
    'icon-loading',
    'icon-log-in-lined',
    'icon-mail',
    'icon-mail-lined',
    'icon-menu',
    'icon-microphone',
    'icon-pause-circle-lined',
    'icon-person',
    'icon-phone',
    'icon-pin',
    'icon-play-circle-lined',
    'icon-print-lined',
    'icon-question-circle-lined',
    'icon-search',
    'icon-senior',
    'icon-share',
    'icon-star',
    'icon-stop-circle-lined',
    'icon-table-lined',
    'icon-trash-lined',
    'icon-upload',
    'icon-user-circle-filled',
    'icon-video',
    'icon-view',
    'icon-zoom-in',
    'icon-zoom-out'
  ],
  map: ['icon-enlarge', 'icon-map-zoom-in', 'icon-map-zoom-out', 'icon-home']
} as const

export default {
  RplCoreIconNames,
  RplCustomIconNames,
  RplIconNames,
  RplIconSizes
}
