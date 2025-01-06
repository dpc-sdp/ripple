import { differenceInDays, isWithinInterval, isBefore } from 'date-fns'

export interface TideGrantStatus {
  status: 'opening_soon' | 'open' | 'closed'
  displayLabel: string
}

const openStatus = (end: Date | number, now): TideGrantStatus => {
  const daysRemaining = differenceInDays(end, now)

  if (daysRemaining === 0) {
    return {
      status: 'open',
      displayLabel: 'Open, closes today'
    }
  }

  return {
    status: 'open',
    displayLabel: `Open, closes ${Intl.DateTimeFormat('en-AU', {
      dateStyle: 'long'
    }).format(end)}`
  }
}

const openingSoonStatus = (start: Date | number): TideGrantStatus => ({
  status: 'opening_soon',
  displayLabel: `Opens ${Intl.DateTimeFormat('en-AU', {
    dateStyle: 'long'
  }).format(start)}`
})

const ongoingStatus: TideGrantStatus = {
  status: 'open',
  displayLabel: 'Ongoing'
}

const closedStatus: TideGrantStatus = {
  status: 'closed',
  displayLabel: 'Closed'
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
    return ongoingStatus
  }

  if (start && end) {
    if (isBefore(start, end) && isWithinInterval(now, { start, end })) {
      return openStatus(end, now)
    } else if (isBefore(now, start)) {
      return openingSoonStatus(start)
    } else {
      return closedStatus
    }
  } else if (start) {
    if (isBefore(now, start)) {
      return openingSoonStatus(start)
    } else {
      return ongoingStatus
    }
  } else if (end) {
    if (isBefore(now, end)) {
      return openStatus(end, now)
    } else {
      return closedStatus
    }
  } else {
    return ongoingStatus
  }
}

export default getGrantStatus
