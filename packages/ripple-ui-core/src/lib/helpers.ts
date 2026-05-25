import { format, isValid } from 'date-fns'
import type { RplDateRange } from './constants'

export const distanceAsPercentage = (point: number, total: number): number => {
  if (point < 0) {
    return 0
  }
  if (point > total) {
    return 100
  }

  return Number(((point / total) * 100).toFixed(2))
}

export const formatDate = (
  value: Date | string | number,
  options?: Intl.DateTimeFormatOptions
): string | unknown => {
  const input = new Date(value)

  if (!isValid(input)) {
    return value
  }

  const tokens: Array<string> = []

  if (options?.dateStyle === 'medium') {
    tokens.push('d MMM yyyy, h:mm aaa')
  } else if (options?.dateStyle === 'long') {
    tokens.push('d MMMM yyyy')
  } else if (options?.dateStyle === 'full') {
    tokens.push('EEEE d MMMM yyyy')

    if (options?.timeStyle === 'short') {
      tokens.push("'at' h:mm aaa")
    }
  } else {
    if (options?.weekday === 'long') {
      tokens.push('EEEE')
    }

    if (options?.day === '2-digit') {
      tokens.push('dd')
    } else {
      tokens.push('d')
    }

    if (options?.month === 'long') {
      tokens.push('MMMM')
    } else {
      tokens.push('MMM')
    }

    if (<'none'>options?.year === 'none') {
      // skip
    } else if (options?.year === '2-digit') {
      tokens.push('yy')
    } else {
      tokens.push('yyyy')
    }

    if (options?.timeStyle === 'short') {
      tokens[tokens.length - 1] += ','
      tokens.push('h:mm aaa')
    }
  }

  if (options?.timeZone) {
    // Reinstantiate with custom TZ
    const date = new Date(
      input.toLocaleString('en', { timeZone: options.timeZone })
    )
    return format(date, tokens.join(' '))
      .replace('Jun ', 'June ')
      .replace('Jul ', 'July ')
  } else {
    const date = new Date(
      input.toLocaleString('en', { timeZone: 'Australia/Melbourne' })
    )
    return format(date, tokens.join(' '))
      .replace('Jun ', 'June ')
      .replace('Jul ', 'July ')
  }
}

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
    const startDateWithYear = formatDate(from, dateOpts) as string
    const endDateWithYear = formatDate(to, dateOpts) as string
    dateOpts.year = 'none' as '2-digit' | 'numeric' | undefined
    const startDate = formatDate(from, dateOpts) as string

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
