import RplFooter from './RplFooter.vue'
import { RplFooterLinks } from './fixtures/sample'
import { bpMin } from '@dpc-sdp/ripple-ui-shared/contracts'

const props = {
  nav: RplFooterLinks
}

describe('RplFooter', () => {
  it('mounts', () => {
    cy.mount(RplFooter as any, { props })
  })

  it('allows menus to be toggled on small screens', () => {
    cy.viewport(bpMin.s, 1000)
    cy.mount(RplFooter as any, { props })

    cy.get('.rpl-footer-nav-section__header-inner-button').first().as('button')

    cy.get('@button')
      .invoke('attr', 'aria-controls')
      .then((id) => {
        cy.get(`#${id} .rpl-expandable`).as('menu')
      })

    cy.get('@button').click()
    cy.get('@menu').should('be.visible')

    cy.get('@button').click()
    cy.get('@menu').should('be.hidden')
  })
})
