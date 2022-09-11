describe('test', () => {
  it('should work', () => {
    cy.startMockServer()
    cy.visit('/')
    cy.get('[data-component-id="678"]').should('exist')
  })
})
