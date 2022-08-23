// This file is used to declare component specific constants. Delete if not needed

import { RplPropLabel, RplPropUrl } from '../../lib/constants'

export const RplListTypes = ['ul', 'ol'] as const

export const RplListItemArray = {
  text: typeof RplPropLabel as string,
  icon: typeof RplPropLabel as string,
  url: typeof RplPropUrl as string,
  active: Boolean,
  items: Array
} as const
