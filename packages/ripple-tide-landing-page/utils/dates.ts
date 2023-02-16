export const formatDatev = (
  value: string,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const date = new Date(value)

  const defaultOptions: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }

  options = { ...defaultOptions, ...options }

  return new Intl.DateTimeFormat('en-AU', options).format(date)
}

export { formatDate } from '@dpc-sdp/ripple-ui-core'
