import { PropType } from 'vue'
import { RplPropLabel, RplPropUrl } from '../../lib/constants'
import { RplIconNames } from '../icon/constants'

export const RplContactUsDetailsArray = {
  name: typeof RplPropLabel as string,
  department: typeof RplPropLabel as string,
  street: typeof RplPropLabel as string
} as const

export const RplContactUsItemArray = {
  label: typeof RplPropLabel as string,
  url: typeof RplPropUrl as string,
  icon: {
    type: [String, undefined] as PropType<
      typeof RplIconNames[number] | undefined
    >,
    default: undefined
  }
} as const
