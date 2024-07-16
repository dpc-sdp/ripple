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

  it('suggestion slot', () => {
    cy.mount(RplSearchBar, {
      props: {
        ...baseProps
      },
      slots: {
        suggestion: (props) => `test - ${props.option.option}`
      }
    })
    cy.get('input#1234').click()
    cy.get('[data-option-id="rip"]').should('contain.text', `test - rip`)
  })

  it('updates', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')
    cy.mount(RplSearchBar, {
      props: {
        ...baseProps,
        [`onUpdate:inputValue`]: onChangeSpy
      }
    })
    cy.get('input#1234').type('rip', { delay: 100 })
    cy.get('@onChangeSpy').should('have.been.calledWith', 'rip')
  })
})
