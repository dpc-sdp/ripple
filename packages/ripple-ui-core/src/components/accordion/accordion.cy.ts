import RplAccordion from './accordion.vue'
import defaultItemsFixture from './fixtures/default'

const baseProps = {
  title: 'Title',
  items: defaultItemsFixture,
  id: '1234'
}

describe('RplAccordion', () => {
  it('mounts', () => {
    cy.mount(RplAccordion, {
      props: {
        ...baseProps
      }
    })
    cy.get('.rpl-accordion__toggle-all').should('contains.text', 'Open all')
  })

  it('opens all accordions when open all clicked', () => {
    cy.mount(RplAccordion, {
      props: {
        ...baseProps
      }
    })
    cy.get('.rpl-accordion__toggle-all').click()
    cy.get('.rpl-accordion__toggle-all').should('contains.text', 'Close all')
  })
  it('shows open all when it has been closed again', () => {
    cy.mount(RplAccordion, {
      props: {
        ...baseProps
      }
    })
    cy.get('.rpl-accordion__toggle-all').click()
    cy.get('.rpl-accordion__toggle-all').should('contains.text', 'Close all')
    cy.get('.rpl-accordion__toggle-all').click()
    cy.get('.rpl-accordion__toggle-all').should('contains.text', 'Open all')
  })
  it('shows numbered accordions', () => {
    cy.mount(RplAccordion, {
      props: {
        ...baseProps,
        numbered: true
      }
    })
    cy.get('.rpl-accordion__item-number').eq(0).contains('1')
    cy.get('.rpl-accordion__item-number').eq(1).contains('2')
    cy.get('.rpl-accordion__item-number').eq(2).contains('3')
  })
})
