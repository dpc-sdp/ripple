import { format, isValid } from 'date-fns'

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
  } else if (options?.dateStyle === 'full') {
    tokens.push('EEEE d MMMM yyyy')

    if (options?.timeStyle === undefined || options?.timeStyle === 'short') {
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

export { formatDateRange } from './formatDateRange'
