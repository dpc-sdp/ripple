/* global afterEach, cy */

afterEach(() => {
  cy.get('@nodeId').then(nodeId => {
    if (nodeId) {
      cy.task('deleteNode', nodeId)
    }
  })
})
