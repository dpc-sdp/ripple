import { RplPropLabel, RplPropUrl } from '../../lib/constants'

export const RplContactUsDetailsArray = {
  name: typeof RplPropLabel as string,
  department: typeof RplPropLabel as string,
  street: typeof RplPropLabel as string
} as const

export const RplContactUsItemArray = {
  label: typeof RplPropLabel as string,
  url: typeof RplPropUrl as string,
  icon: String
} as const
