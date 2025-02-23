/// <reference types="cypress" />
// @ts-expect-error vue sfc import
import RplPrimaryNav from './RplPrimaryNav.vue'
import { RplPrimaryNavItems } from './fixtures/sample'
import { bpMin } from '../../lib/breakpoints'

import type { mount } from 'cypress/vue'
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

const props = {
  primaryLogo: {
    href: '#',
    altText: 'Logo',
    src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  items: RplPrimaryNavItems
}

describe('RplPrimaryNav', () => {
  it('mounts', () => {
    cy.mount(RplPrimaryNav, { props })
  })

  context('Mobile', () => {
    it('toggles menu when menu button is clicked', () => {
      cy.viewport(bpMin.s, 1000)
      cy.mount(RplPrimaryNav, { props })

      cy.get(
        '.rpl-primary-nav__nav-bar-mobile-menu-toggle-container .rpl-primary-nav__nav-bar-action--toggle'
      ).as('toggle')

      cy.get('@toggle').click()
      cy.get('.rpl-primary-nav__mega-menu').should('be.visible')

      cy.get('@toggle').click()
      cy.get('.rpl-primary-nav__mega-menu').should('not.exist')
    })
  })

  context('Desktop', () => {
    beforeEach(() => {
      cy.viewport(bpMin.l, 1000)
      cy.mount(RplPrimaryNav, { props })
    })

    it('toggles the menu items submenu', () => {
      cy.get(
        '.rpl-primary-nav__nav-bar-item .rpl-primary-nav__nav-bar-action--toggle'
      )
        .first()
        .as('toggle')

      cy.get('@toggle').click()
      cy.get('.rpl-primary-nav__mega-menu').should('be.visible')

      cy.get('@toggle').click()
      cy.get('.rpl-primary-nav__mega-menu').should('not.exist')
    })

    it('navigates through mega menu sub levels', () => {
      const level = (val) => `.rpl-primary-nav__mega-menu-list--level-${val}`
      const levelToggle = (val) =>
        `${level(val)} .rpl-primary-nav__mega-menu-action--toggle`

      cy.get(
        '.rpl-primary-nav__nav-bar-item .rpl-primary-nav__nav-bar-action--toggle'
      )
        .first()
        .click()

      cy.get(levelToggle(2)).first().click()
      cy.get(level(3)).should('exist')

      cy.get(levelToggle(3)).first().click()
      cy.get(level(4)).should('exist')

      cy.get(levelToggle(3)).first().click()
      cy.get(level(4)).should('not.exist')

      cy.get(levelToggle(2)).first().click()
      cy.get(level(3)).should('not.exist')
    })

    it('toggles the display of the search form', () => {
      cy.contains('.rpl-primary-nav__nav-bar-action--toggle', 'Search').click()

      cy.get('.rpl-primary-nav__search-form').as('form')

      cy.get('form').should('be.visible')
      cy.get('form').find('.rpl-search-bar__input').should('have.focus')

      cy.contains('.rpl-primary-nav__nav-bar-action--toggle', 'Close').click()

      cy.get('.rpl-primary-nav__search-form').should('not.exist')
    })
  })
})
