/* global before, after, cy */

before(function () {
  cy.task('configureProtectedContent', {
    sessionExpiry: '1'
  })
})

afterEach(function () {
  if (this.userId) {
    cy.task('deleteUser', this.userId)
    this.userId = null
  }
})

after(function () {
  cy.task('configureProtectedContent', {
    sessionExpiry: '10'
  })
})
