/* global afterEach, cy */

afterEach(function () {
  if (this.nodeId) {
    cy.task('deleteNode', this.nodeId)
  }
})
