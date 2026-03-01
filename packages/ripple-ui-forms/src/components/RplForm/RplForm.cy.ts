import RplForm from './RplForm.vue'
import { schema } from './fixtures/sample'

const multiStepSchema: any[] = [
  {
    $step: true,
    id: 'step-one',
    key: 'step-one',
    name: 'step-one',
    title: 'Step one',
    nextButton: 'Next',
    schema: [
      {
        $formkit: 'RplFormText',
        id: 'first_name',
        name: 'first_name',
        label: 'First name',
        validation: [['required']],
        value: ''
      }
    ]
  },
  {
    $step: true,
    id: 'step-two',
    key: 'step-two',
    name: 'step-two',
    title: 'Step two',
    nextButton: 'Review',
    prevButton: 'Back',
    schema: [
      {
        $formkit: 'RplFormText',
        id: 'email',
        name: 'email',
        label: 'Email',
        value: ''
      }
    ]
  },
  {
    $step: true,
    id: 'review',
    key: 'review',
    name: 'review',
    title: 'Review',
    nextButton: 'Submit',
    prevButton: 'Back',
    schema: [
      {
        $formkit: 'RplFormReview',
        key: 'review_component'
      }
    ]
  }
]

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

  it('validates and navigates between multi-step form steps', () => {
    cy.mount(RplForm, {
      props: {
        id: 'test-multi-step-form',
        schema: multiStepSchema
      }
    })

    cy.contains('Step 1 of 3').should('be.visible')
    cy.contains('h3', 'Step one').should('be.visible')

    cy.contains('button', 'Next').click()
    cy.contains('There is a problem').should('be.visible')
    cy.contains('Step 1 of 3').should('be.visible')

    cy.get('[name="first_name"]').type('Taylor')
    cy.contains('button', 'Next').click()

    cy.contains('Step 2 of 3').should('be.visible')
    cy.contains('h3', 'Step two').should('be.visible')

    cy.contains('button', 'Back').click()
    cy.contains('Step 1 of 3').should('be.visible')
    cy.contains('h3', 'Step one').should('be.visible')
  })

  it('renders review step content in multi-step form', () => {
    cy.viewport('macbook-13')
    cy.mount(RplForm, {
      props: {
        id: 'test-multi-step-review-form',
        schema: multiStepSchema
      }
    })

    cy.get('[name="first_name"]').type('Taylor')
    cy.contains('button', 'Next').click()
    cy.get('[name="email"]').type('taylor@example.com')
    cy.contains('button', 'Review').click()

    cy.contains('Step 3 of 3').should('be.visible')
    cy.contains('h3', 'Review').should('be.visible')
    cy.contains('Step one').should('be.visible')
    cy.contains('Step two').should('be.visible')
    cy.contains('Change').should('be.visible')
  })
})
