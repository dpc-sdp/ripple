import { RplPropLabel, RplPropUrl } from '../../lib/constants'

export const RplTimelineItemArray = {
  image: typeof RplPropLabel as string,
  title: typeof RplPropLabel as string,
  subtitle: typeof RplPropLabel as string,
  dateStart: typeof RplPropLabel as string,
  dateEnd: typeof RplPropLabel as string,
  current: false as boolean,
  description: typeof RplPropLabel as string,
  url: typeof RplPropUrl as string
} as const
