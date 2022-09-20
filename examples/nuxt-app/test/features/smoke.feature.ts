describe('test', () => {
  before(() => {
    cy.task('startMockServer', true)
  })
  it('should work', () => {
    cy.fixture('/landingpage/home').then((fixture) => {
      cy.task('setMockRouteWithQuery', {
        route: `/api/tide/page`,
        status: 200,
        response: fixture,
        query: '?path=/&site=8888'
      })
    })
    cy.visit('/')
    cy.get('[data-component-id="678"]').should('exist')
  })
})
