import RplBreadcrumbs from './RplBreadcrumbs.vue'
import { bpMin } from '../../lib/breakpoints'

const items = [
  { text: 'Home', url: '/' },
  { text: 'About the VIC Government', url: '#' },
  { text: 'The state government', url: '#' },
  { text: 'Victoria is the state', url: '#' },
  { text: 'VIC government data', url: '#' }
]

const props = { items }

describe('RplBreadcrumbs', () => {
  it('mounts', () => {
    cy.mount(RplBreadcrumbs, { props })
  })

  it('displays all breadcrumbs', () => {
    cy.viewport(bpMin.xl, 1000)
    cy.mount(RplBreadcrumbs, { props })

    cy.get(
      '.rpl-breadcrumbs__item:not(.rpl-breadcrumbs__item--collapsed)'
    ).should('have.length', 5)
  })

  it('collapsed breadcrumbs can be toggled', () => {
    cy.viewport(bpMin.xl, 1000)
    cy.mount(RplBreadcrumbs, { props: { ...props, collapse: true } })

    cy.get(
      '.rpl-breadcrumbs__item:not(.rpl-breadcrumbs__item--collapsed)'
    ).should('have.length', 2)

    cy.get('.rpl-breadcrumbs__collapse-link-trigger').click()

    cy.get(
      '.rpl-breadcrumbs__item:not(.rpl-breadcrumbs__item--collapsed)'
    ).should('have.length', 4)
  })

  it(`a custom number can be set to manage collapsed breadcrumbs (won't collapse)`, () => {
    cy.viewport(bpMin.xl, 1000)
    cy.mount(RplBreadcrumbs, {
      props: {
        ...props,
        collapse: true,
        displayBeforeCollapse: 4
      }
    })

    cy.get(
      '.rpl-breadcrumbs__item:not(.rpl-breadcrumbs__item--collapsed)'
    ).should('have.length', 4)

    cy.get('.rpl-breadcrumbs__collapse-link-trigger').should('not.exist')
  })

  it(`a custom number can be set to manage collapsed breadcrumbs (will collapse)`, () => {
    cy.viewport(bpMin.xl, 1000)
    cy.mount(RplBreadcrumbs, {
      props: {
        ...props,
        items: [...props.items, { text: 'Another item', url: '#' }],
        collapse: true,
        displayBeforeCollapse: 4
      }
    })

    cy.get(
      '.rpl-breadcrumbs__item:not(.rpl-breadcrumbs__item--collapsed)'
    ).should('have.length', 2)

    cy.get('.rpl-breadcrumbs__collapse-link-trigger').should('exist')

    cy.get('.rpl-breadcrumbs__collapse-link-trigger').click()

    cy.get(
      '.rpl-breadcrumbs__item:not(.rpl-breadcrumbs__item--collapsed)'
    ).should('have.length', 5)
  })
})
