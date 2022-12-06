import { TidePropRange } from '../../types'

/**
 * @description Output a formatted price range
 */
export const formatPriceRange = (price: TidePropRange) => {
  if (
    <string>price.from === 'Free entry' ||
    (<number>price.from === 0 && <number>price.to === 0)
  ) {
    return 'Free entry'
  }
  const formatOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    minimumFractionDigits: 0,
    currency: 'AUD'
  }
  if (<number>price.from >= 0 && <number>price.to > 0) {
    if (<number>price.from === <number>price.to) {
      return new Intl.NumberFormat('en-AU', formatOptions).format(
        <number>price.from
      )
    } else {
      return [
        new Intl.NumberFormat('en-AU', formatOptions).format(
          <number>price.from
        ),
        new Intl.NumberFormat('en-AU', formatOptions).format(<number>price.to)
      ].join(' - ')
    }
  }
  return null
}
