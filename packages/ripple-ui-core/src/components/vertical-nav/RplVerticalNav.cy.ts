import RplVerticalNav from './RplVerticalNav.vue'
import { RplVerticalNavItems } from './fixtures/sample'

const props = {
  title: 'Vertical Nav',
  items: RplVerticalNavItems
}

describe('RplVerticalNav', () => {
  it('mounts', () => {
    cy.mount(RplVerticalNav, { props })
  })

  it('displays the active menu and all children as open', () => {
    cy.mount(RplVerticalNav, { props })

    cy.get('.rpl-vertical-nav__list-item').first().as('item')

    cy.get('@item')
      .find(
        '.rpl-vertical-nav__list--level-2, .rpl-vertical-nav__list--level-3, .rpl-vertical-nav__list--level-4, .rpl-vertical-nav__list--level-5'
      )
      .should('be.visible')
  })

  it('displays the active menu and direct children', () => {
    cy.mount(RplVerticalNav, { props: { ...props, toggleLevels: 3 } })

    cy.get('.rpl-vertical-nav__list-item').first().as('item')

    cy.get('@item')
      .find('.rpl-vertical-nav__list--level-2')
      .should('be.visible')

    cy.get('@item')
      .find(
        '.rpl-vertical-nav__list--level-3, .rpl-vertical-nav__list--level-4, .rpl-vertical-nav__list--level-5'
      )
      .should('be.hidden')
  })

  it('toggles the display of top level nav items', () => {
    cy.mount(RplVerticalNav, { props })

    cy.get('.rpl-vertical-nav__list-item').first().as('item')

    cy.get('@item').find('.rpl-vertical-nav__toggle').click()
    cy.get('@item').find('.rpl-expandable').should('be.hidden')

    cy.get('@item').find('.rpl-vertical-nav__toggle').click()
    cy.get('@item').find('.rpl-expandable').should('be.visible')
  })

  it('toggles the display of nav items to 3 levels', () => {
    cy.mount(RplVerticalNav, { props: { ...props, toggleLevels: 3 } })

    cy.get('.rpl-vertical-nav__list-item').first().as('item')

    cy.get('@item')
      .find('.rpl-vertical-nav__list--level-2')
      .should('be.visible')
    cy.get('@item')
      .find('.rpl-vertical-nav__toggle')
      .contains('Second level')
      .click()

    cy.get('@item')
      .find('.rpl-vertical-nav__list--level-3')
      .should('be.visible')
    cy.get('@item')
      .find('.rpl-vertical-nav__toggle')
      .contains('Third level')
      .click()

    cy.get('@item')
      .find(
        '.rpl-vertical-nav__list--level-4, .rpl-vertical-nav__list--level-5'
      )
      .should('be.visible')
  })
})
