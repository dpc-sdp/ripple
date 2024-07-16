import RplAccordion from './RplAccordion.vue'
import defaultItemsFixture from './fixtures/default'

const baseProps = {
  title: 'Title',
  items: defaultItemsFixture,
  id: '1234'
}

describe('RplAccordion', () => {
  it('mounts', () => {
    cy.mount(RplAccordion, { props: { ...baseProps } })

    cy.get('.rpl-accordion__toggle-all').should('contains.text', 'Open all')
  })

  it('allows individual accordion items to be toggled', () => {
    cy.mount(RplAccordion, { props: { ...baseProps } })

    cy.get('.rpl-accordion__item').first().as('item')

    cy.get('@item').find('.rpl-accordion__item-toggle').click()
    cy.get('@item')
      .find('.rpl-accordion__item-toggle')
      .should('have.attr', 'aria-expanded', 'true')

    cy.get('@item')
      .find('.rpl-accordion__item-content-inner')
      .should('be.visible')
  })

  it('toggles all accordions when open/close all button is clicked', () => {
    cy.mount(RplAccordion, { props: { ...baseProps } })

    cy.get('.rpl-accordion__toggle-all').contains('Open all').click()
    cy.get('.rpl-accordion__item-content-inner:visible').should(
      'have.length',
      3
    )

    cy.get('.rpl-accordion__toggle-all').contains('Close all').click()
    cy.get('.rpl-accordion__item-content-inner:visible').should(
      'have.length',
      0
    )
  })

  it('toggles the open/close all text when all items have been individually toggled', () => {
    cy.mount(RplAccordion, { props: { ...baseProps } })

    cy.get('.rpl-accordion__item-toggle').click({ multiple: true })
    cy.get('.rpl-accordion__toggle-all').should('contains.text', 'Close all')

    cy.get('.rpl-accordion__item-toggle').click({ multiple: true })
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
