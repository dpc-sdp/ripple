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
