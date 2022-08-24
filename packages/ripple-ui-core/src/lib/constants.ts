import { PropType } from 'vue'

export const RplCardElements = ['div', 'li'] as const

export const RplColorThemes = [
  'default',
  'white',
  'text',
  'information',
  'success',
  'warning',
  'error',
  'inactive'
] as const

export const RplPropLabel = {
  type: String,
  default: ''
} as const

export const RplPropStringRequired = {
  type: String,
  required: true
} as const

export const RplPropUrl = {
  type: String,
  default: ''
} as const

export const RplPropEl = {
  type: String as PropType<typeof RplCardElements[number]>,
  default: 'div'
} as const
