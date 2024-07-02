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

  it('allows for single options to be selected', () => {
    cy.mount(RplFormDropDown, { props })

    cy.get('.rpl-form-dropdown-input').click()
    cy.get('.rpl-form-dropdown-option').contains('Apple').click()
    cy.get('.rpl-form-dropdown-input').should('contain', 'Apple')

    cy.get('.rpl-form-dropdown-input').click()
    cy.get('.rpl-form-dropdown-option').contains('Orange').click()
    cy.get('.rpl-form-dropdown-input').should('contain', 'Orange')
  })

  it('allows for multiple options to be selected', () => {
    cy.mount(RplFormDropDown, { props: { ...props, multiple: true } })

    cy.get('.rpl-form-dropdown-input').click()
    cy.get('.rpl-form-dropdown-option').contains('Apple').click()
    cy.get('.rpl-form-dropdown-option').contains('Orange').click()

    cy.get('.rpl-form-dropdown-input').should(($div) => {
      expect($div.get(0).innerText).to.eq('Apple, Orange')
    })
  })

  it('correctly displays the number of hidden selected options', () => {
    cy.viewport(960, 680)
    cy.mount(RplFormDropDown, { props: { ...props, multiple: true } })
    cy.get('.rpl-form-dropdown-input').click()
    cy.get('.rpl-form-dropdown-option').click({ multiple: true })
    cy.get('.rpl-form-dropdown__more-label').contains('+2 more')

    cy.viewport(746, 680)
    cy.get('.rpl-form-dropdown__more-label').contains('+5 more')

    cy.viewport(480, 680)
    cy.get('.rpl-form-dropdown__more-label').contains('+8 more')

    cy.viewport(370, 680)
    cy.get('.rpl-form-dropdown__more-label').contains('+10 more')
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
