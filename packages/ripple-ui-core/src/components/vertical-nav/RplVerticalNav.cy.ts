import RplVerticalNav from './RplVerticalNav.vue'
import {
  verticalNavExample1,
  verticalNavExample2,
  verticalNavExample3
} from './fixtures/sample'

const props = {
  title: 'Vertical Nav',
  items: verticalNavExample1
}

describe('RplVerticalNav', () => {
  it('mounts', () => {
    cy.mount(RplVerticalNav as any, { props })
  })

  it('top level items are highlighted when active and child items are displayed', () => {
    cy.mount(RplVerticalNav as any, { props })

    cy.get('.rpl-vertical-nav__list-item').first().as('item')
    cy.get('@item').find('.rpl-vertical-nav__toggle').as('toggle')
    cy.get('@item').find('.rpl-vertical-nav__item').as('link')

    cy.get('@link').should('have.class', 'rpl-vertical-nav__item--active')
    cy.get('@toggle').should('have.attr', 'aria-expanded', 'true')

    cy.get('@item')
      .find(
        '.rpl-vertical-nav__list--level-2, .rpl-vertical-nav__list--level-3, .rpl-vertical-nav__list--level-4, .rpl-vertical-nav__list--level-5'
      )
      .should('be.visible')
  })

  it('deeply nested item is highlighted when active, and the parent items are expanded (toggleLevels: 3)', () => {
    cy.mount(RplVerticalNav as any, {
      props: { ...props, items: verticalNavExample3, toggleLevels: 3 }
    })

    cy.get('.rpl-vertical-nav__list-item')
      .contains('NESTED_ACTIVE_TEST')
      .parent()
      .as('item')
    cy.get('@item').should('be.visible')
    cy.get('@item').find('.rpl-vertical-nav__toggle').as('toggle')
    cy.get('@item').find('.rpl-vertical-nav__item').as('link')

    cy.get('@link').should('have.class', 'rpl-vertical-nav__item--active')
    cy.get('@toggle').should('have.attr', 'aria-expanded', 'true')

    cy.get('.rpl-vertical-nav__list--level-5').should('be.visible')
  })

  it('deeply nested item is highlighted when active, and the parent items are expanded (toggleLevels: 2)', () => {
    cy.mount(RplVerticalNav as any, {
      props: { ...props, items: verticalNavExample3, toggleLevels: 2 }
    })

    cy.get('.rpl-vertical-nav__list-item')
      .contains('NESTED_ACTIVE_TEST')
      .parent()
      .as('item')
    cy.get('@item').should('be.visible')
    cy.get('@item').find('.rpl-vertical-nav__toggle').should('not.exist')
    cy.get('@item').find('.rpl-vertical-nav__item').as('link')

    cy.get('@link').should('have.class', 'rpl-vertical-nav__item--active')

    cy.get('.rpl-vertical-nav__list--level-5').should('be.visible')
  })

  it('a deeply nested item is highlighted when active, and the parent items are expanded (toggleLevels: 1)', () => {
    cy.mount(RplVerticalNav as any, {
      props: { ...props, items: verticalNavExample3, toggleLevels: 1 }
    })

    cy.get('.rpl-vertical-nav__list-item')
      .contains('NESTED_ACTIVE_TEST')
      .parent()
      .as('item')
    cy.get('@item').should('be.visible')
    cy.get('@item').find('.rpl-vertical-nav__toggle').should('not.exist')
    cy.get('@item').find('.rpl-vertical-nav__item').as('link')

    cy.get('@link').should('have.class', 'rpl-vertical-nav__item--active')

    cy.get('.rpl-vertical-nav__list--level-5').should('be.visible')
  })

  it('a deeply nested item is highlighted when active, and the parent items are expanded (toggleLevels: 0)', () => {
    cy.mount(RplVerticalNav as any, {
      props: { ...props, items: verticalNavExample3, toggleLevels: 0 }
    })

    cy.get('.rpl-vertical-nav__list-item')
      .contains('NESTED_ACTIVE_TEST')
      .parent()
      .as('item')
    cy.get('@item').find('.rpl-vertical-nav__toggle').should('not.exist')
    cy.get('@item').find('.rpl-vertical-nav__item').as('link')

    cy.get('@link').should('have.class', 'rpl-vertical-nav__item--active')
  })

  it('toggles the display of top level nav items', () => {
    cy.mount(RplVerticalNav as any, {
      props: { ...props, items: verticalNavExample2 }
    })

    cy.get('.rpl-vertical-nav__list-item').first().as('item')

    cy.get('@item').find('.rpl-expandable').should('be.hidden')

    cy.get('@item').find('.rpl-vertical-nav__toggle').click()
    cy.get('@item').find('.rpl-expandable').should('be.visible')

    cy.get('@item')
      .find('.rpl-vertical-nav__list--level-5')
      .should('be.visible')
  })

  it('toggles the display of nav items to 3 levels', () => {
    cy.mount(RplVerticalNav as any, {
      props: { ...props, items: verticalNavExample2, toggleLevels: 3 }
    })

    cy.get('.rpl-vertical-nav__list-item').first().as('item')

    cy.get('@item').within(() => {
      cy.get('[aria-label="Toggle Second level menu"]').should('be.hidden')
      cy.get('[aria-label="Toggle First level menu"]').click()
      cy.get('[aria-label="Toggle Second level menu"]').should('be.visible')
      cy.get(
        '[aria-label="Toggle Third level link with some text that will need to wrap menu"]'
      ).should('be.hidden')
      cy.get('[aria-label="Toggle Second level menu"]').click()
      cy.get(
        '[aria-label="Toggle Third level link with some text that will need to wrap menu"]'
      ).should('be.visible')
      cy.get(
        '[aria-label="Toggle Third level link with some text that will need to wrap menu"]'
      ).click()
      cy.get(
        '.rpl-vertical-nav__list--level-4, .rpl-vertical-nav__list--level-5'
      ).should('be.visible')

      cy.get('[aria-label="Toggle First level menu"]').click()
      cy.get('@item')
        .find('.rpl-vertical-nav__list--level-2')
        .should('be.hidden')
    })
  })
})
