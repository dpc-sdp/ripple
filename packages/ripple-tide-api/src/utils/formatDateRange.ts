import { TidePropRange } from '../../types'

/**
 * @description Output a formatted date range, but only show range if days are different
 */
export const formatDateRange = (date: TidePropRange, showTime = false) => {
  if (date.from && date.to) {
    // 02 July 2019 at 9:00 am <DD MMM YYYY at H:MM>
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: showTime ? 'numeric' : undefined,
      minute: showTime ? 'numeric' : undefined,
      timeZone: 'Australia/Melbourne'
    }
    const start = new Intl.DateTimeFormat('en-AU', options).format(
      new Date(date.from)
    )
    const end = new Intl.DateTimeFormat('en-AU', options).format(
      new Date(date.to)
    )

    // Only send a range if the days are different
    if (start === end) {
      return start
    } else {
      return `${start} - ${end}`
    }
  }
  return null
}
