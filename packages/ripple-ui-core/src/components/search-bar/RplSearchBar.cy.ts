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
        ...baseProps,
        [`onUpdate:inputValue`]: () => {
          console.log('testest')
        }
      },
      slots: {
        suggestion: (props) => `test - ${props.option.option}`
      }
    })
    cy.get('input#1234').click()
    cy.get('#rip').should('contain.text', `test - rip`)
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
  it('debounces input', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy1')
    cy.mount(RplSearchBar, {
      props: {
        ...baseProps,
        debounce: 1000,
        [`onUpdate:inputValue`]: onChangeSpy
      }
    })
    cy.get('input#1234').type('rip', { delay: 100 })
    cy.wait(1500)
    cy.get('input#1234').type('ple', { delay: 100 })
    cy.get('@onChangeSpy1').should('have.callCount', 2)
  })
  it('doesnt debounce when turned off', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy1')
    cy.mount(RplSearchBar, {
      props: {
        ...baseProps,
        debounce: 0,
        [`onUpdate:inputValue`]: onChangeSpy
      }
    })
    cy.get('input#1234').type('rip', { delay: 100 })
    cy.wait(1500)
    cy.get('input#1234').type('ple', { delay: 100 })
    cy.get('@onChangeSpy1').should('have.callCount', 6)
  })
})
