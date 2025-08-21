/// <reference types="cypress" />
// @ts-expect-error vue sfc import
import { h } from 'vue'
import RplPrimaryNav from './RplPrimaryNav.vue'
import { RplPrimaryNavItems } from './fixtures/sample'
import { bpMin } from '../../lib/breakpoints'
import 'cypress-real-events'

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
    altText: 'Logo'
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

      cy.get('[aria-label="Open Menu"]').as('openMenu')
      cy.get('@openMenu').should('have.attr', 'aria-expanded', 'false')
      cy.get('@openMenu').click()

      cy.get('[aria-label="Close Menu"]').as('closeMenu')

      cy.get('@closeMenu')
        .invoke('attr', 'aria-controls')
        .then((id) => {
          cy.get(`#${id}`).as('menu')
        })

      cy.get('@menu').should('be.visible')
      cy.get('@closeMenu').should('have.attr', 'aria-expanded', 'true')

      cy.get('@closeMenu').click()
      cy.get('@menu').should('not.exist')
    })

    it('tabs to an action when user actions are present', () => {
      cy.mount(RplPrimaryNav, {
        props,
        slots: {
          userAction: h('a', { href: '/login' }, 'Login')
        }
      })

      cy.get('[aria-label="Open Menu"]').focus()

      cy.focused().realPress('Enter')
      cy.realPress('Tab')
      cy.realPress('Tab')

      cy.focused().should('match', 'a').should('contain.text', 'Login')
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.focused()
        .should('match', 'button')
        .should('contain.text', 'First level A')

      cy.focused().realPress(['Shift', 'Tab']).realPress(['Shift', 'Tab'])
      cy.focused().contains('Menu')
    })
  })

  context('Desktop', () => {
    beforeEach(() => {
      cy.viewport(bpMin.l, 1000)
    })

    it('toggles the menu items submenu', () => {
      cy.mount(RplPrimaryNav, { props })

      cy.get(
        '.rpl-primary-nav__nav-bar-item .rpl-primary-nav__nav-bar-action--toggle'
      )
        .first()
        .as('toggle')

      cy.get('@toggle').should('have.attr', 'aria-expanded', 'false')

      cy.get('@toggle').click()
      cy.get('.rpl-primary-nav__mega-menu').should('be.visible')
      cy.get('@toggle').should('have.attr', 'aria-expanded', 'true')

      cy.get('@toggle').click()
      cy.get('.rpl-primary-nav__mega-menu').should('not.exist')
      cy.get('@toggle').should('have.attr', 'aria-expanded', 'false')
    })

    it('navigates through mega menu sub levels', () => {
      cy.mount(RplPrimaryNav, { props })

      const level = (val: number) =>
        `.rpl-primary-nav__mega-menu-list--level-${val}`
      const levelToggle = (val: number) =>
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
      cy.mount(RplPrimaryNav, { props })

      cy.get('[aria-label="Open Search"]').as('openSearch')
      cy.get('@openSearch').should('contain', 'Search')
      cy.get('@openSearch').should('have.attr', 'aria-expanded', 'false')
      cy.get('@openSearch').click()

      cy.get('[aria-label="Close Search"]').as('closeSearch')
      cy.get('@closeSearch').should('contain', 'Close')

      cy.get('@closeSearch')
        .invoke('attr', 'aria-controls')
        .then((id) => {
          cy.get(`#${id}`).as('search')
        })

      cy.get('@search').should('be.visible')
      cy.get('@closeSearch').should('have.attr', 'aria-expanded', 'true')
      cy.get('@search').find('input').should('have.focus')

      cy.get('@closeSearch').click()
      cy.get('@search').should('not.exist')
    })

    it('megamenu can be navigated with the keyboard', () => {
      cy.mount(RplPrimaryNav, { props })

      cy.contains('button', 'First level A').focus()
      cy.focused().should('have.attr', 'aria-expanded', 'false')

      cy.focused().focus().realPress('Enter')
      cy.focused().should('have.attr', 'aria-expanded', 'true')

      // Get into megamenu
      cy.focused().realPress('Tab')
      cy.focused().contains('Quick exit')
      cy.focused().realPress('Tab')
      cy.focused().should('match', 'a').should('contain.text', 'First level A')

      // Navigate to 'sub' menu
      cy.focused().realPress('Tab').realPress('Enter').realPress('Tab')
      cy.focused().should('match', 'a').should('have.text', 'Second level A')

      // Navigate to 'sub sub' menu
      cy.focused().realPress('Tab').realPress('Enter').realPress('Tab')
      cy.focused().should('match', 'a').should('contain.text', 'Third level A')

      // Navigate back up through the levels
      cy.focused().realPress(['Shift', 'Tab'])
      cy.focused()
        .should('match', 'button')
        .should('contain.text', 'Third level A')
      cy.focused().realPress(['Shift', 'Tab']).realPress(['Shift', 'Tab'])
      cy.focused()
        .should('match', 'button')
        .should('have.text', 'Second level A')

      // Navigate out of the megamenu
      cy.focused().realPress(['Shift', 'Tab']).realPress(['Shift', 'Tab'])
      cy.focused()
        .should('match', 'button')
        .should('contain.text', 'First level A')
        .should('have.attr', 'aria-expanded', 'false')

      // And into the next top level item
      cy.contains('button', 'First level B').as('nextItem')
      cy.focused().realPress('Tab')
      cy.focused()
        .should('have.attr', 'aria-expanded', 'false')
        .should('match', 'button')
        .should('contain.text', 'First level B')

      cy.focused().realPress('Enter')
      cy.focused().should('have.attr', 'aria-expanded', 'true')

      cy.focused().realPress('Tab')
      cy.focused().contains('Quick exit')

      cy.get('@nextItem').realClick().focus()

      cy.focused()
        .realPress('Enter')
        .realPress('Tab')
        .realPress('Tab')
        .realPress('Tab')

      cy.focused().should('match', 'button').should('have.text', 'Second level')

      // Switching open mega menus with clicks and tabs
      cy.contains('button', 'First level D').as('lastItem')
      cy.get('@lastItem').click()
      cy.focused().realPress('Tab')
      cy.focused().realPress('Tab')
      cy.focused().realPress('Tab')
      cy.focused()
        .should('match', 'button')
        .should('contain.text', 'Second level D')
    })

    it('tabs to menu when user actions are present', () => {
      props.items.pop()
      cy.mount(RplPrimaryNav, {
        props: {
          ...props,
          items: props.items
        },
        slots: {
          userAction: h('a', { href: '/login' }, 'Login')
        }
      })

      cy.contains('button', 'First level A').focus()

      cy.focused().realPress('Enter')
      cy.realPress('Tab')
      cy.realPress('Tab')

      cy.focused().should('match', 'a').should('contain.text', 'First level A')

      cy.focused().realPress(['Shift', 'Tab'])
      cy.focused()
        .should('match', 'button')
        .should('contain.text', 'First level A')
    })
  })
})
