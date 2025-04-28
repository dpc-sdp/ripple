import RplDataTable from './RplDataTable.vue'
import {
  RplDataTableColumns,
  RplDataTableItems,
  RplDataTableItemsSimple
} from './fixtures/sample'
import { bpMin } from '@dpc-sdp/ripple-ui-core'

const props = {
  showExtraContent: true,
  columns: RplDataTableColumns,
  items: RplDataTableItems
}

describe('RplDataTable', () => {
  it('mounts', () => {
    cy.mount(RplDataTable, { props })
  })

  it('toggles the display of more information', () => {
    cy.mount(RplDataTable, { props })

    cy.get('.rpl-data-table__row').first().as('row')
    cy.get('@row').find('.rpl-data-table-toggle').as('toggle')
    cy.get('@row').find('.rpl-data-table__details').as('details')

    cy.get('@details').should('be.hidden')
    cy.get('@toggle').should('contain.text', 'More info')

    cy.get('@toggle').click()

    cy.get('@details').should('be.visible')
    cy.get('@toggle').should('contain.text', 'Less info')
  })

  it('sets the scope correctly for horizontal headings', () => {
    cy.viewport(bpMin.l, 600)
    cy.mount(RplDataTable, {
      props: { items: RplDataTableItemsSimple, columns: RplDataTableColumns }
    })

    cy.get('thead th').should('have.attr', 'scope', 'col')
    cy.get('tbody td').should('not.have.attr', 'scope')
    cy.get('tbody th').should('not.exist')
  })

  it('sets the scope correctly for vertical headings', () => {
    cy.viewport(bpMin.l, 600)
    cy.mount(RplDataTable, {
      props: {
        items: RplDataTableItemsSimple,
        columns: RplDataTableColumns,
        headingType: { vertical: true, horizontal: false }
      }
    })

    cy.get('thead').should('not.exist')
    cy.get('tbody th').should('have.attr', 'scope', 'row')
    cy.get('tbody td').should('not.have.attr', 'scope')
  })

  it('sets the scope correctly for vertical and horizontal headings', () => {
    cy.viewport(bpMin.l, 600)
    cy.mount(RplDataTable, {
      props: {
        items: RplDataTableItemsSimple,
        columns: RplDataTableColumns,
        headingType: { vertical: true, horizontal: true }
      }
    })

    cy.get('thead th').should('have.attr', 'scope', 'col')
    cy.get('tbody th').should('have.attr', 'scope', 'row')
    cy.get('tbody td').should('not.have.attr', 'scope')
  })
})
