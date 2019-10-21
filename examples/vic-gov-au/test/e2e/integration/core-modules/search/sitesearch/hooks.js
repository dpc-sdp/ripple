/* global after, cy */

after(function () {
  // All stubbed routes should be removed
  cy.server({ enable: false })
})
