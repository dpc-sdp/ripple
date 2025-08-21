import RplDataTable from './RplDataTable.vue'
import {
  RplDataTableColumns,
  RplDataTableColumnsCustom,
  RplDataTableItems,
  RplDataTableItemsCustom,
  RplDataTableItemsSimple,
  RplDataTableMixedColumns,
  RplDataTableMixedItems
} from './fixtures/sample'
import { bpMin } from '@dpc-sdp/ripple-ui-core'

const props = {
  showExtraContent: true,
  columns: RplDataTableColumns,
  items: RplDataTableItems
}

const title = ['Time frame', 'Budget', 'Risk']
const headings = [
  'Design ideas',
  'Co-design solutions',
  'Single solution',
  'Development'
]
const values = [
  ['2-4 weeks', '8-10 weeks', '12 weeks', '16 weeks'],
  ['$50k', '$60k', '$100k', '$125k'],
  ['High', 'Medium', 'Low', 'High']
]

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

  it('handles column orientation on mobile for horizontal headings', () => {
    cy.viewport(bpMin.s, 600)
    cy.mount(RplDataTable, {
      props: {
        columns: RplDataTableColumnsCustom,
        items: RplDataTableItemsCustom,
        headingType: {
          vertical: false,
          horizontal: true
        },
        orientation: 'column'
      }
    })

    const expected = [
      {
        heading: 'Fruit',
        content: ['Apple', 'Orange', 'Banana', 'Pear', 'Mango']
      },
      {
        heading: 'Vegetable',
        content: ['Potato', 'Broccoli', 'Pumpkin', 'Carrot', 'Mushrooms']
      },
      {
        heading: 'Elements',
        content: ['Zinc', 'Copper', 'Iron', 'Bronze', 'Slate']
      }
    ]

    expected.forEach((item, index) => {
      cy.get(`tbody:nth-of-type(${index + 1})`).each(($tbody) => {
        cy.wrap($tbody).as('tbody')
        cy.get('@tbody')
          .find('th')
          .should('have.attr', 'scope', 'row')
          .should('contain.text', expected[index].heading)

        item.content.forEach((content, i) => {
          cy.get('@tbody')
            .find(`td:nth-of-type(${i + 1})`)
            .should('contain.text', content)
        })
      })
    })
  })

  it('handles column orientation on mobile for vertical headings', () => {
    cy.viewport(bpMin.s, 600)
    cy.mount(RplDataTable, {
      props: {
        columns: RplDataTableMixedColumns,
        items: RplDataTableMixedItems,
        headingType: {
          vertical: true,
          horizontal: false
        },
        orientation: 'column'
      }
    })

    values.forEach((item, index) => {
      cy.get(`tbody:nth-of-type(${index + 1})`).each(($tbody) => {
        cy.wrap($tbody).as('tbody')
        cy.get('@tbody').find('th').should('not.exist')

        item.forEach((content, i) => {
          cy.get('@tbody')
            .find(`td:nth-child(${i + 1})`)
            .as('cell')
          cy.get('@cell').should('contain.text', headings[i])
          cy.get('@cell').should('contain.text', content)
        })
      })
    })
  })

  it('handles column orientation on mobile for dual headings', () => {
    cy.viewport(bpMin.s, 600)
    cy.mount(RplDataTable, {
      props: {
        columns: RplDataTableMixedColumns,
        items: RplDataTableMixedItems,
        headingType: {
          vertical: true,
          horizontal: true
        },
        orientation: 'column'
      }
    })

    values.forEach((item, index) => {
      cy.get(`tbody:nth-of-type(${index + 1})`).each(($tbody) => {
        cy.wrap($tbody).as('tbody')
        cy.get('@tbody')
          .find('th')
          .should('have.attr', 'scope', 'row')
          .should('contain.text', title[index])

        item.forEach((content, i) => {
          cy.get('@tbody')
            .find(`td:nth-of-type(${i + 1})`)
            .as('cell')
          cy.get('@cell').should('contain.text', headings[i])
          cy.get('@cell').should('contain.text', content)
        })
      })
    })
  })
})
