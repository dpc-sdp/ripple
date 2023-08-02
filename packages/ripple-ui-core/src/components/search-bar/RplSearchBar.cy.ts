import RplSearchBar from './RplSearchBar.vue'
import { mockSuggestions } from './fixtures'

const baseProps = {
  suggestions: mockSuggestions,
  id: '1234'
}

describe('RplSearchBar', () => {
  it('opens', () => {
    cy.mount(RplSearchBar, {
      props: {
        ...baseProps
      }
    })
    cy.get('#1234__menu').should('not.exist')
    cy.get('input#1234').click()
    cy.get('#1234__menu').should('exist')
  })
})
