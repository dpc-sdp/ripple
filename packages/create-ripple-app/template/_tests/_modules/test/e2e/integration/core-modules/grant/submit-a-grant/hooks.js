/* global before, after, cy */

before(function () {
  cy.fixture('Pages/grantlandingpage').as('pageData')
  cy.get('@pageData').then(data => {
    cy.task('createLandingPage', data).as('nodeId')
  })
})

after(function () {
  if (this.nodeId) {
    cy.task('deleteNode', this.nodeId)
  }
})
