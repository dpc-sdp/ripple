import 'cypress-real-events'
import '@dpc-sdp/ripple-test-utils/step_definitions'
import '@frsource/cypress-plugin-visual-regression-diff'

Cypress.on('uncaught:exception', (err) => {
  // https://stackoverflow.com/a/50387233
  // Ignore Resize observer loop issue in expand search filters for now
  if (err.message.includes('ResizeObserver loop')) {
    return false
  }
})
