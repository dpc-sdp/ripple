import { TidePropRange } from '../../types'

const maybeCastToNumber = (value) =>
  isNaN(parseFloat(value)) ? value : parseFloat(value)

const isPositiveNumber = (value) => typeof value === 'number' && value > 0

const formatPriceValue = (value: number | string) =>
  new Intl.NumberFormat('en-AU', {
    minimumFractionDigits: 0,
    style: 'currency',
    currency: 'AUD'
  }).format(<number>value)

/**
 * @description Output a formatted price range
 */
export const formatPriceRange = (price: TidePropRange) => {
  let from = maybeCastToNumber(price.from)
  let to = maybeCastToNumber(price.to)

  from =
    isPositiveNumber(from) || (isPositiveNumber(to) && from === 0)
      ? formatPriceValue(from)
      : from
  to = isPositiveNumber(to) ? formatPriceValue(to) : to

  if (from === 0 && to === 0) {
    return 'Free entry'
  }
  if ((from && !to) || from === to) {
    return from
  }
  if (from && to) {
    return `${from} - ${to}`
  }
  return null
}
