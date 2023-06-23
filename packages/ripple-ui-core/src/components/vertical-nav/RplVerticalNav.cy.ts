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

  it('displays the active menu as open', () => {
    cy.mount(RplVerticalNav, { props })

    cy.get('.rpl-vertical-nav__list-item')
      .first()
      .find('.rpl-expandable')
      .should('be.visible')
  })

  it('toggles the display on nav items', () => {
    cy.mount(RplVerticalNav, { props })

    cy.get('.rpl-vertical-nav__list-item').first().as('item')

    cy.get('@item').find('.rpl-vertical-nav__toggle').click()
    cy.get('@item').find('.rpl-expandable').should('be.hidden')

    cy.get('@item').find('.rpl-vertical-nav__toggle').click()
    cy.get('@item').find('.rpl-expandable').should('be.visible')
  })
})
