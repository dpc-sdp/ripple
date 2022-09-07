// This file is used to declare component specific constants. Delete if not needed

export const RplCardElements = ['div', 'li'] as const

export const RplCardTypes = [
  'promo',
  'avatar',
  'nav',
  'call-to-action',
  'key-dates',
  'category-grid'
] as const

export const RplCardTitleClasses = [
  'rpl-card__cta',
  'rpl-type-h3',
  'rpl-u-focusable',
  'rpl-u-focusable--inline'
]

export interface RplCardItem {
  title: string,
  subtitle: string,
  content: string
}
