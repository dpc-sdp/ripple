import {
  isWithinInterval,
  differenceInDays,
  isBefore,
  subMonths
} from 'date-fns'

export interface TideGrantStatus {
  status: 'opening_soon' | 'open' | 'closed'
  displayLabel: string
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
const getGrantStatus = (
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
    if (isBefore(start, end) && isWithinInterval(now, { start, end })) {
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

export default getGrantStatus
