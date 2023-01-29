import { RplDateRange } from './constants.js'

/**
 * @description Output a formatted date range, but only show range if days are different
 * @param date - { from: string, to: string }
 * @param options
 * @param showTime - false
 */
export const formatDateRange = (
  date: RplDateRange,
  options: Intl.DateTimeFormatOptions = {},
  showTime = false
) => {
  const out: string[] = []
  const from = new Date(date.from)
  const to = new Date(date.to)

  if (date.from && date.to) {
    // 2 July 2019 <D MMM YYYY>
    const dateOpts: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      timeZone: 'Australia/Melbourne',
      ...options
    }
    const startDate = new Intl.DateTimeFormat('en-AU', dateOpts).format(from)
    dateOpts.year = 'numeric'
    const startDateWithYear = new Intl.DateTimeFormat('en-AU', dateOpts).format(
      from
    )
    const endDateWithYear = new Intl.DateTimeFormat('en-AU', dateOpts).format(
      to
    )

    // Display year on start date, if
    //   1. Different start year and end year
    //   2. Exact match start date to end date (e.g. not a range)
    //   3. Showing time
    if (
      from.getFullYear() !== to.getFullYear() ||
      startDateWithYear === endDateWithYear ||
      showTime
    ) {
      out.push(startDateWithYear)
    } else {
      out.push(startDate)
    }

    if (showTime) {
      // 9:00 am <H:MM>
      const timeOpt: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Australia/Melbourne'
      }
      const startTime = new Intl.DateTimeFormat('en-AU', timeOpt).format(from)
      const endTime = new Intl.DateTimeFormat('en-AU', timeOpt).format(to)

      out.push(startTime)

      // Same day
      if (startDateWithYear === endDateWithYear) {
        // Different end time
        if (startTime !== endTime) {
          out.push('to', endTime)
        }

        // Date range, start/end time doesn't matter
      } else {
        out.push('to', endDateWithYear, endTime)
      }

      return out.join(' ')
    } else {
      // Date range
      if (startDateWithYear !== endDateWithYear) {
        out.push('to', endDateWithYear)
      }

      return out.join(' ')
    }
  }

  return null
}
