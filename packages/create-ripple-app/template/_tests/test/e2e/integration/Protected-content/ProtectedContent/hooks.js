/* global before, after, cy */

before(function () {
  cy.task('configureProtectedContent', {
    sessionExpiry: '1'
  })
})

afterEach(() => {

})

after(function () {
  cy.task('configureProtectedContent', {
    sessionExpiry: '10'
  })
})
