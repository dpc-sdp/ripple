import RplFormDropDown from './RplFormDropdown.vue'
import { RplFormDropdownOptions } from './fixtures/sample'

const props = {
  id: 'dropdown',
  labelId: 'dropdown',
  placeholder: 'Select',
  options: RplFormDropdownOptions
}

describe('RplFormDropDown', () => {
  it('mounts', () => {
    cy.mount(RplFormDropDown, { props })

    cy.get('.rpl-form-dropdown').should('be.visible')
  })

  it('can be toggled open and closed', () => {
    cy.mount(RplFormDropDown, { props })

    cy.get('.rpl-form-dropdown-input').click()
    cy.get('.rpl-form-dropdown-menu').should('be.visible')
    cy.get('.rpl-form-dropdown-input').click()
    cy.get('.rpl-form-dropdown-menu').should('not.exist')
  })

  it('can be "searched" by typing from the input', () => {
    cy.mount(RplFormDropDown, { props })

    cy.get('.rpl-form-dropdown-input').type('b')
    cy.focused().contains('Banana')

    cy.get('.rpl-form-dropdown-input').type('bl')
    cy.focused().contains('Blueberries')
  })

  it('can be "searched" by typing from an option', () => {
    cy.mount(RplFormDropDown, { props })

    cy.get('.rpl-form-dropdown-input').click()
    cy.get('.rpl-form-dropdown-option').first().type('apr')
    cy.focused().contains('Apricots')

    cy.get('.rpl-form-dropdown-option').first().type('l')
    cy.focused().contains('Lemon')
  })

  it('can be "traversed" by cycling through a single key stroke', () => {
    cy.mount(RplFormDropDown, { props })

    cy.get('.rpl-form-dropdown-input').type('a')
    cy.focused().contains('Apple')

    cy.focused().type('a')
    cy.focused().contains('Apricots')

    cy.focused().type('a')
    cy.focused().contains('Avocado')

    cy.focused().type('a')
    cy.focused().contains('Apple')
  })
})
