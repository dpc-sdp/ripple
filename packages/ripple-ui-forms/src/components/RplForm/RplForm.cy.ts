import RplForm from './RplForm.vue'
import { schema } from './fixtures/sample'

describe('<RplForm />', () => {
  it('renders', () => {
    // see: https://test-utils.vuejs.org/guide/
    cy.mount(RplForm, {
      props: {
        id: 'test-form',
        schema
      }
    })

    cy.get('[name="name"]').should('not.be.disabled')
    cy.get('[name="message"]').should('not.be.disabled')
    cy.get('[name="colour"]').should('not.have.attr', 'aria-disabled', 'true')
    cy.get('[name="pet"]').should('not.be.disabled')
    cy.get('[name="terms"]').should('not.be.disabled')
    cy.get('button[type="submit"]').should('not.be.disabled')
    cy.get('button[type="reset"]').should('not.be.disabled')
  })

  it('form is disabled while submitting', () => {
    cy.mount(RplForm, {
      props: {
        id: 'test-form',
        schema,
        submissionState: { status: 'submitting' }
      }
    })

    cy.get('[name="name"]').should('be.disabled')
    cy.get('[name="message"]').should('be.disabled')
    cy.get('[name="colour"]').should('have.attr', 'aria-disabled', 'true')
    cy.get('[name="pet"]').should('be.disabled')
    cy.get('[name="terms"]').should('be.disabled')
    cy.get('button[type="submit"]').should('be.disabled')
    cy.get('button[type="reset"]').should('be.disabled')
  })
})
