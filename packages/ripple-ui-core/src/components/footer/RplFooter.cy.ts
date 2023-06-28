import RplFooter from './RplFooter.vue'
import { RplFooterLinks } from './fixtures/sample'
import { bpMin } from '../../lib/breakpoints'

const props = {
  nav: RplFooterLinks
}

describe('RplFooter', () => {
  it('mounts', () => {
    cy.mount(RplFooter, { props })
  })

  it('allows menus to be opened on small screens', () => {
    cy.viewport(bpMin.s, 1000).mount(RplFooter, { props })

    cy.get('.rpl-footer-nav-section__header-inner-button').first().as('button')

    cy.get('@button').click()

    cy.get('@button')
      .invoke('attr', 'aria-controls')
      .then((id) => {
        cy.get(`#${id}`).should('be.visible')
      })
  })
})
