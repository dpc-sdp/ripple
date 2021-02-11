import moment from 'moment'
import formatdateMixin from '@dpc-sdp/ripple-global/mixins/formatdate'
const formatDate = formatdateMixin.methods.formatDate

export const defaultStatusTerms = {
  open: 'Open',
  closed: 'Closed',
  ongoing: 'Ongoing',
  openingSoon: (startdate) => `Opening on ${startdate}`,
  closingSoon: (end, now) => {
    if (!end || !now) { return 'Opening soon' }
    const daysRemaining = parseInt(end.diff(now, 'days'))
    if (daysRemaining > 1) {
      return `Open, closing in ${daysRemaining} days`
    } else if (daysRemaining === 1) {
      return `Open, closing in ${daysRemaining} day`
    }
    return `Open, closing today`
  }
}
export default function calcStatus (startDate, endDate, displaySoon = true, statusTerms = defaultStatusTerms) {
  if (!statusTerms) {
    statusTerms = defaultStatusTerms
  }

  if (startDate || endDate) {
    const now = moment()
    const start = startDate ? moment(startDate) : null
    const end = endDate ? moment(endDate) : null

    if (start) {
      if (now.isAfter(start)) {
        if (end) {
          if (now.isBefore(end)) {
            // displays status as "Open, closing in x days" when current date is more start date and less than end date
            if (displaySoon) {
              return statusTerms.closingSoon(end, now)
            }
            return statusTerms.open
          } else {
            // displays status as "closed" when current date is after start date and after end date
            return statusTerms.closed
          }
        } else {
          // displays status as "Ongoing" if there is no end date and the current date is after the start date
          return statusTerms.ongoing
        }
      }

      // displays status as "Opening on startdate" when current date is within one month of startdate
      if (now.isBetween(moment(start).subtract(1, 'months'), start)) {
        if (!displaySoon) {
          return statusTerms.openingSoon()
        }
        return statusTerms.openingSoon(formatDate(startDate))
      }
      // displays status as "Closed" when current date is more than one month of startdate
      return statusTerms.closed
    } else {
      if (end) {
        if (now.isBefore(end) && displaySoon) {
          // displays status as "Open, closing in x days" when current date is more start date and less than end date
          return statusTerms.closingSoon(end, now)
        } else {
          return statusTerms.closed
        }
      } else {
        // displays status as "Ongoing" if there is no start or end date
        return statusTerms.ongoing
      }
    }
  }

  // displays status as "Ongoing" if there is no start or end date
  return statusTerms.ongoing
}
