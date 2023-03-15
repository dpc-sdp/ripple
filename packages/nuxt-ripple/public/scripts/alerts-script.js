/**
 * This script needs to be loaded as the very first asset on the page in order to avoid
 * the alerts showing that the user has already dismissed
 *
 * The reason for this script is because we can't cache the users preference on which alerts
 * are dismissed. They are hidden on the client side but that can take a moment and cause the
 * page to briefly jump in height , so we read the cookie immediately and set the hidden alerts
 * to `display: none`.
 */

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const DISMISSED_ALERTS_COOKIE = 'dismissedAlerts'

try {
  const dismissedIds = JSON.parse(decodeURIComponent(getCookie(DISMISSED_ALERTS_COOKIE)))

  const styles = dismissedIds.reduce((result, id) => {
    return `${result} [data-alert-id="${id}"] {display: none;}`
  }, '')

  const styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
} catch (e) {
  console.error(e)
}
