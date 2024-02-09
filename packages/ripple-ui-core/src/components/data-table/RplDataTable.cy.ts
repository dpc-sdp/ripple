import RplDataTable from './RplDataTable.vue'
import { RplDataTableColumns, RplDataTableItems } from './fixtures/sample'

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
    cy.get('@row').find('.rpl-data-table__toggle').as('toggle')
    cy.get('@row').find('.rpl-data-table__details').as('details')

    cy.get('@details').should('be.hidden')
    cy.get('@toggle').should('contain.text', 'More info')

    cy.get('@toggle').click()

    cy.get('@details').should('be.visible')
    cy.get('@toggle').should('contain.text', 'Less info')
  })
})
