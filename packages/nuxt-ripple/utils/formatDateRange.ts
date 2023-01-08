import { TidePropRange } from '../types'

/**
 * @description Output a formatted date range, but only show range if days are different
 */
export const formatDateRange = (date: TidePropRange, showTime = false) => {
  const out: string[] = []
  const from = new Date(date.from)
  const to = new Date(date.to)

  if (date.from && date.to) {
    // 02 July 2019 <DD MMM YYYY>
    const dateOpt: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'Australia/Melbourne'
    }
    const startDate = new Intl.DateTimeFormat('en-AU', dateOpt).format(from)
    const endDate = new Intl.DateTimeFormat('en-AU', dateOpt).format(to)

    out.push(startDate)

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
      if (startDate === endDate) {
        // Different end time
        if (startTime !== endTime) {
          out.push('-', endTime)
        }

        // Date range, start/end time doesn't matter
      } else {
        out.push('-', endDate, endTime)
      }

      return out.join(' ')
    } else {
      // Date range
      if (startDate !== endDate) {
        out.push('-', endDate)
      }

      return out.join(' ')
    }
  }

  return null
}
