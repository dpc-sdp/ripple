import RplSearchBar from './RplSearchBar.vue'
import { mockSuggestions } from './fixtures'

const baseProps = {
  suggestions: mockSuggestions,
  id: 'search-bar'
}

describe('RplSearchBar', () => {
  it('opens', () => {
    cy.mount(RplSearchBar, {
      props: {
        ...baseProps
      }
    })
    cy.get('#search-bar__menu').should('not.exist')
    cy.get('#search-bar').click()
    cy.get('#search-bar__menu').should('exist')
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
    cy.get('#search-bar').click()
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

    cy.get('.rpl-search-bar__clear').should('not.exist')
    cy.get('#search-bar').type('rip', { delay: 100 })
    cy.get('@onChangeSpy').should('have.been.calledWith', 'rip')
    cy.get('.rpl-search-bar__clear').should('exist')
  })

  it('submits when enter is pressed', () => {
    const onSubmitSpy = cy.spy().as('onSubmitSpy')
    cy.mount(RplSearchBar, {
      props: {
        ...baseProps,
        onSubmit: onSubmitSpy
      }
    })

    cy.get('#search-bar').type('ripple{enter}')
    cy.get('@onSubmitSpy').should('have.been.calledOnce')
    cy.get('@onSubmitSpy').should('have.been.calledWithMatch', {
      value: 'ripple'
    })
  })

  it('submits when submit button is clicked', () => {
    const onSubmitSpy = cy.spy().as('onSubmitSpy')
    cy.mount(RplSearchBar, {
      props: {
        ...baseProps,
        onSubmit: onSubmitSpy
      }
    })

    cy.get('#search-bar').type('ripp')
    cy.get('button[type="submit"]').click()
    cy.get('@onSubmitSpy').should('have.been.calledOnce')
    cy.get('@onSubmitSpy').should('have.been.calledWithMatch', {
      value: 'ripp'
    })
  })

  it('does not submit suggestion selection is required and there are no suggestions', () => {
    const onSubmitSpy = cy.spy().as('onSubmitSpy')
    cy.mount(RplSearchBar, {
      props: {
        ...baseProps,
        submitOnSuggestionOnly: true,
        onSubmit: onSubmitSpy,
        suggestions: []
      }
    })

    cy.get('button[type="submit"]').should('not.exist')

    cy.get('#search-bar').type('ripx{enter}')
    cy.get('@onSubmitSpy').should('not.have.been.called')

    cy.get('#search-bar').type('ripz{enter}')
    cy.get('@onSubmitSpy').should('not.have.been.called')
  })

  it('submits with first suggestion when a suggestion selection is required', () => {
    const onSubmitSpy = cy.spy().as('onSubmitSpy')
    cy.mount(RplSearchBar, {
      props: {
        ...baseProps,
        submitOnSuggestionOnly: true,
        onSubmit: onSubmitSpy,
        suggestions: ['ripple', 'riptide']
      }
    })

    cy.get('#search-bar').type('ripp{enter}')
    cy.get('@onSubmitSpy').should('have.been.calledOnce')
    cy.get('@onSubmitSpy').should('have.been.calledWithMatch', {
      value: 'ripple'
    })
    cy.get('#search-bar').should('have.value', 'ripple')
  })
})
