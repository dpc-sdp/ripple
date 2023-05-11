export const epochToDate = (
  epoch: string,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }
): string | null => {
  const date = new Date(0)

  date.setUTCSeconds(Number(epoch))

  if (isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en-AU', options).format(date)
}
