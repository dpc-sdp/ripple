export const rplCardElements = ['div', 'li'] as const
export type RplCardElement = (typeof rplCardElements)[number]

export const rplCardTypes = [
  'promo',
  'avatar',
  'nav',
  'call-to-action',
  'key-dates',
  'category-grid'
] as const
export type RplCardType = (typeof rplCardTypes)[number]

export interface RplCardProps {
  el?: RplCardElement
  type?: RplCardType
  highlight?: boolean
  link?: string
}
