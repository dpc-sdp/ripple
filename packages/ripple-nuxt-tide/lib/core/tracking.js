/**
 * Based on: https://dev.to/corbindavenport/how-to-correctly-check-for-do-not-track-with-javascript-135d
 * Determine if do not track is enabled through the browser.
 * @returns {Boolean}
 */
function clientDoNotTrack () {
  const supportsDNT = (window.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack || 'msTrackingProtectionEnabled' in window.external)
  return supportsDNT ? (window.doNotTrack == "1" || navigator.doNotTrack == "yes" || navigator.doNotTrack == "1" || navigator.msDoNotTrack == "1" || window.external.msTrackingProtectionEnabled()) : false
}

/**
 * Determine if do not track is enabled through the request header.
 * @param {Object} headers request header
 * @returns {Boolean}
 */
function serverDoNotTrack (headers) {
  return (headers.dnt === "1")
}

export { clientDoNotTrack }
export { serverDoNotTrack }
