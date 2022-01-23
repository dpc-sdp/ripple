import dayjs from 'dayjs'

export const formatDate = (date, format) => {
  // Example output: 26 January 2022 01:30 pm - 26 January 2022 08:45 pm
  format = (format === undefined) ? 'DD MMMM' : format
  dayjs.locale('en-au')
  return dayjs(date).format(format)
}
