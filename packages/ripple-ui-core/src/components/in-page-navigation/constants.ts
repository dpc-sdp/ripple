// This file is used to declare component specific constants. Delete if not needed

import { PropType } from 'vue'
import { RplPropLabel, RplPropUrl } from '../../lib/constants'

export const RplInPageNavigationTypes = ['h2', 'h3'] as const

export const RplInPageNavigationItemArray = {
  text: typeof RplPropLabel as string,
  type: String as PropType<typeof RplInPageNavigationTypes[number]>,
  url: typeof RplPropUrl as string
} as const
