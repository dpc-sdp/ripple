export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const formatted = new Intl.DateTimeFormat('en-AU', options).format(date)

  return formatted
}

export const formatDateRange = (dateStart: string, dateEnd: string): string => {
  const start = new Date(dateStart)
  const end = new Date(dateEnd)

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: '2-digit'
  }
  const formatted = new Intl.DateTimeFormat('en-AU', options).formatRange(
    start,
    end
  )

  return formatted
}
