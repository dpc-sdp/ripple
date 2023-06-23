import RplPagination from './RplPagination.vue'

const baseProps = {
  totalPages: 3,
  currentPage: 1,
  contentType: 'page'
}

const current = '[aria-current="true"]'
const next = `[aria-label="Go to next ${baseProps.contentType}"]`
const prev = `[aria-label="Go to previous ${baseProps.contentType}"]`

describe('RplPagination', () => {
  it('mounts', () => {
    cy.mount(RplPagination, { props: baseProps })
  })

  it('navigate to the next page', () => {
    cy.mount(RplPagination, { props: baseProps })

    cy.get(current).should('contain', 1)
    cy.get(next).click()
    cy.get(current).should('contain', 2)
  })

  it('navigate to the previous page', () => {
    cy.mount(RplPagination, { props: { ...baseProps, currentPage: 3 } })

    cy.get(current).should('contain', 3)
    cy.get(prev).click()
    cy.get(current).should('contain', 2)
  })

  it('hide and show next/prev buttons', () => {
    cy.mount(RplPagination, { props: { ...baseProps, totalPages: 2 } })

    cy.get(next).should('exist')
    cy.get(prev).should('not.exist')

    cy.get(next).click()

    cy.get(prev).should('exist')
    cy.get(next).should('not.exist')
  })
})
