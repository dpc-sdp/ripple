import {
  isWithinInterval,
  differenceInDays,
  isBefore,
  subMonths
} from 'date-fns'

interface TideGrantStatus {
  status: 'opening_soon' | 'open' | 'closed'
  displayLabel: string
}
/**
 * @description Format grant audience string
 */
export const formatGrantAudiences = (audiences = []) => {
  if (!audiences || audiences.length === 0) return ''

  const audienceStr = [...new Set(audiences)]
    .map((input: any) => {
      const term = input.name ? input.name : input
      if (term) {
        switch (term) {
          case 'Individual':
            return 'individuals'
          case 'Business':
            return 'businesses'
          default:
            return term.toLowerCase()
        }
      }
    })
    .join(', ')
  return `${audienceStr.charAt(0).toUpperCase() + audienceStr.slice(1)}`
}

/**
 * @description Output a formatted price range
 */
export const formatPriceRange = (
  from: string | number,
  to: string | number
) => {
  if (from === 'Free entry' || (from === 0 && to === 0)) {
    return 'Free entry'
  }
  if (typeof from === 'string' || typeof to === 'string') {
    return `${from} ${to}`
  }
  const formatOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    minimumFractionDigits: 0,
    currency: 'AUD'
  }
  if (from >= 0 && to > 0) {
    if (from === to) {
      return new Intl.NumberFormat('en-AU', formatOptions).format(from)
    } else {
      return [
        new Intl.NumberFormat('en-AU', formatOptions).format(from),
        new Intl.NumberFormat('en-AU', formatOptions).format(to)
      ].join(' - ')
    }
  }
  return null
}

const getBeforeOpenStatus = (
  now: Date | number,
  start: Date | number
): TideGrantStatus => {
  if (isBefore(now, subMonths(start, 1))) {
    return {
      status: 'closed',
      displayLabel: 'Closed'
    }
  } else {
    return {
      status: 'opening_soon',
      displayLabel: `Opening on ${Intl.DateTimeFormat('en-AU', {
        dateStyle: 'long'
      }).format(start)}`
    }
  }
}

const getBeforeCloseStatus = (
  now: Date | number,
  end: Date | number
): TideGrantStatus => {
  const daysRemaining = differenceInDays(end, now)
  let displayLabel

  if (daysRemaining > 0) {
    displayLabel = `Open, closing in ${new Intl.NumberFormat('en-AU').format(
      daysRemaining
    )} day${daysRemaining > 1 ? 's' : ''}`
  } else {
    displayLabel = 'Open, closing today'
  }

  return {
    status: 'open',
    displayLabel
  }
}
/**
 * @description Calculate Grant status in relation to current date
 */
export const getGrantStatus = (
  now: Date,
  isOngoing: boolean,
  dateStart: string,
  dateEnd: string
): TideGrantStatus => {
  const start = dateStart ? new Date(dateStart) : null
  const end = dateEnd ? new Date(dateEnd) : null

  if (isOngoing) {
    return {
      status: 'open',
      displayLabel: 'Ongoing'
    }
  }

  if (start && end) {
    if (isWithinInterval(now, { start, end })) {
      return getBeforeCloseStatus(now, end)
    } else if (isBefore(now, start)) {
      return getBeforeOpenStatus(now, start)
    } else {
      return {
        status: 'closed',
        displayLabel: 'Closed'
      }
    }
  } else if (start) {
    if (isBefore(now, start)) {
      return getBeforeOpenStatus(now, start)
    } else {
      return {
        status: 'open',
        displayLabel: 'Ongoing'
      }
    }
  } else if (end) {
    if (isBefore(now, end)) {
      return getBeforeCloseStatus(now, end)
    } else {
      return {
        status: 'closed',
        displayLabel: 'Closed'
      }
    }
  } else {
    return {
      status: 'open',
      displayLabel: 'Ongoing'
    }
  }
}
