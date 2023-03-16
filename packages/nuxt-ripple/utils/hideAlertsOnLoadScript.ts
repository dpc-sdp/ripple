/**
 * This script needs to be loaded as the very first asset on the page in order to avoid
 * the alerts showing that the user has already dismissed
 *
 * The reason for this script is because we can't cache the users preference on which alerts
 * are dismissed. They are hidden on the client side but that can take a moment and cause the
 * page to briefly jump in height , so we read the cookie immediately and set the hidden alerts
 * to `display: none`.
 *
 * The script is stored as a string so that it can be added to Nuxt using the `useHead` composable
 *
 * The script checks that each id is a guid before adding it to the stylesheet to mitigate the risk
 * of cross site scripting.
 */

const hideAlertsOnLoadScript = `function getCookie(name) {
  const value = \`; \${document.cookie}\`;
  const parts = value.split(\`; \${name}=\`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const DISMISSED_ALERTS_COOKIE = 'dismissedAlerts'
const guidRegex = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', 'g')

try {
  const dismissedIds = JSON.parse(decodeURIComponent(getCookie(DISMISSED_ALERTS_COOKIE)))

  const styles = dismissedIds.reduce((result, id) => {
    if (guidRegex.test(id)) {
      return \`\${result} [data-alert-id="\${id}"] {display: none;}\`
    }

    return result
  }, '')

  const styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
} catch (e) {
  console.error(e)
}`

export default hideAlertsOnLoadScript
