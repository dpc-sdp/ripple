/**
 * Convert epoch value to datetime text
 *
 * IF epoch is today's datetime
 * THEN display "Today at X:XXpm"
 *
 * IF epoch is yesterday's datetime
 * THEN display "Yesterday at X:XXam"
 *
 * IF epoch is past yesterday
 * THEN display "<day> <Month> <Year>"
 *
 * @param epoch
 * @returns {string}
 */
const epochToDateText = (epoch) => {
  if (!isEpoch(epoch)) return ''

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  const date = epochToDate(epoch)

  if (epochIsYesterday(epoch)) return 'Yesterday at ' + formatAMPM(date)
  else if (epochIsToday(epoch)) return 'Today at ' + formatAMPM(date)
  else {
    return String(date.getDate()) +
      ' ' +
      String(monthNames[date.getMonth()]) +
      ' ' +
      String(date.getFullYear())
  }
}

/**
 * Check if given epoch value is yesterday's date.
 *
 * @param epoch
 * @returns {boolean}
 */
const epochIsYesterday = (epoch) => {
  const date = epochToDate(epoch)

  // Yesterdays date
  const yesterday = new Date(new Date())
  yesterday.setDate(yesterday.getDate() - 1)

  return date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
}

/**
 * Check if given epoch value is today's date.
 *
 * @param epoch
 * @returns {boolean}
 */
const epochIsToday = (epoch) => {
  const date = epochToDate(epoch)
  const nowDate = new Date()

  return date.getDate() === nowDate.getDate() &&
    date.getMonth() === nowDate.getMonth() &&
    date.getFullYear() === nowDate.getFullYear()
}

/**
 * Convert epoch value to javascript datetime.
 *
 * @param epoch
 * @returns {Date}
 */
const epochToDate = (epoch) => {
  const utcSeconds = epoch
  const date = new Date(0) // The 0 there is the key, which sets the date to the epoch
  date.setUTCSeconds(utcSeconds)
  return date
}

/**
 * Check if a given value is epoch value.
 *
 * @param epoch
 * @returns {boolean}
 */
const isEpoch = (epoch) => {
  const date = new Date(0) // The 0 there is the key, which sets the date to the epoch
  date.setUTCSeconds(epoch)

  return !isNaN(date.getTime())
}

/**
 * Convert javascript datetime to 12 hour AM/PM.
 *
 * @param date
 * @returns {string}
 */
const formatAMPM = (date) => {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours || 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  return hours + ':' + minutes + ' ' + ampm
}

export {
  epochToDateText,
  epochIsYesterday,
  epochIsToday,
  epochToDate,
  isEpoch,
  formatAMPM
}
