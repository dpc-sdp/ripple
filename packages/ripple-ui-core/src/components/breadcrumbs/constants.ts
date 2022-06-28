// This file is used to declare component specific constants. Delete if not needed

import { RplPropLabel, RplPropUrl } from '../../lib/constants'

export const RplBreadcrumbsThemes = ['primary', 'accent', 'neutral'] as const
export const RplBreadcrumbsItemArray = {
  label: typeof RplPropLabel as string,
  url: typeof RplPropUrl as string
} as const
