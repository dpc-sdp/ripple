/* global before, after, cy */

before(function () {
  cy.fixture('Pages/Event/event').as('pageData')
  cy.get('@pageData').then(data => {
    cy.task('createEventPage', data).as('nodeId')
  })
})

after(function () {
  if (this.nodeId) {
    cy.task('deleteNode', this.nodeId)
  }
})
