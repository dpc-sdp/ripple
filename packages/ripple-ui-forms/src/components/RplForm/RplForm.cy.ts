import RplForm from './RplForm.vue'
import {
  multiStepSchema,
  multiStepSchemaNoNextButton,
  multiStepSchemaNoPrevButton,
  multiStepSchemaSubSteps,
  schema
} from './fixtures/sample'

const mountForm = (
  formSchema: unknown,
  extraProps: Record<string, unknown> = {}
) => {
  cy.mount(RplForm, {
    props: { id: 'test-form', schema: formSchema, ...extraProps }
  })
}

// Helpers
const fill = (label: string, val: string) => {
  cy.contains('label', label)
    .invoke('attr', 'for')
    .then((id) => {
      cy.get(`#${id}`).type(val)
    })
}
const select = (label: string, val: string) => {
  cy.contains('label', label)
    .invoke('attr', 'for')
    .then((id) => {
      cy.get(`#${id}`).click()
      cy.get(`#${id}__menu`).contains(val).click()
    })
}
const check = (label: string) => cy.contains('label', label).click()
const submit = () => cy.get('button[type="submit"]').click()
const step = () => cy.get('.rpl-form__step:not([hidden])')
const next = (label = 'Next') => step().contains('button', label).click()
const back = (label = 'Back') => step().contains('button', label).click()

// Assertions
const assertStep = (heading: string, counter: string) => {
  step().contains(heading).should('be.visible')
  step().contains(counter).should('be.visible')
}
const assertError = (visible: boolean, errors: string[] = []) => {
  cy.get('body').then(($body) => {
    const selector =
      $body.find('.rpl-form--multi-step').length > 0
        ? '.rpl-form__step:not([hidden]) .rpl-form-alert'
        : '.rpl-form-alert'

    if (visible) {
      cy.get(selector).should('be.visible')

      if (errors.length) {
        cy.get(selector).find('li').as('errors')
        cy.get('@errors').should('have.length', errors.length)

        errors.forEach((error, index) =>
          cy.get('@errors').eq(index).should('contain', error)
        )
      }
    } else {
      cy.get(selector).should('not.exist')
    }
  })
}

describe('<RplForm />', () => {
  beforeEach(() => {
    cy.viewport(960, 680)
  })

  it('renders with all fields enabled', () => {
    mountForm(schema)

    cy.get('[name="name"]').should('not.be.disabled')
    cy.get('[name="message"]').should('not.be.disabled')
    cy.get('[name="colour"]').should('not.be.disabled')
    cy.get('[name="pet"]').should('not.be.disabled')
    cy.get('[name="terms"]').should('not.be.disabled')
    cy.get('button[type="submit"]').should('not.be.disabled')
    cy.get('button[type="reset"]').should('not.be.disabled')
  })

  it('disables all fields while submitting', () => {
    mountForm(schema, {
      submissionState: { status: 'submitting' }
    })

    cy.get('[name="name"]').should('be.disabled')
    cy.get('[name="message"]').should('be.disabled')
    cy.get('[name="colour"]').should('have.attr', 'aria-disabled', 'true')
    cy.get('[name="pet"]').should('be.disabled')
    cy.get('[name="terms"]').should('be.disabled')
    cy.get('button[type="submit"]').should('be.disabled')
    cy.get('button[type="reset"]').should('be.disabled')
  })

  it('display an error message with invalid fields', () => {
    mountForm(schema)

    submit()

    assertError(true, [
      'Name is required',
      'Message is required',
      'Colour is required',
      'Pet is required',
      'Terms is required'
    ])

    fill('Name', 'Taylor')
    fill('Message', 'Hello')
    select('Colour', 'Green')

    submit()

    assertError(true, ['Pet is required', 'Terms is required'])

    check('Dog')
    check('I accept the terms')

    submit()

    assertError(false)
  })

  describe('<RplFormSteps />', () => {
    it('validates and navigates between form steps', () => {
      mountForm(multiStepSchema)

      assertStep('Step one', 'Step 1 of 3')

      // Attempt to advance to step two
      next()
      assertError(true, ['First name is required'])
      assertStep('Step one', 'Step 1 of 3')

      // Fill in the required field and advance
      fill('First name', 'Taylor')
      next()
      assertError(false)
      assertStep('Step two', 'Step 2 of 3')

      // Attempt to advance to the review step
      next('Review')
      assertError(true, ['Email is required'])
      assertStep('Step two', 'Step 2 of 3')

      // Attempt to advance after filling the required field
      fill('Email', 'taylor@example.com')
      next('Review')
      assertError(false)
      assertStep('Review', 'Step 3 of 3')

      // Attempt to submit the form
      submit()
      assertError(true, ['Terms is required'])
      assertStep('Review', 'Step 3 of 3')

      // And go back to the start
      back()
      assertStep('Step two', 'Step 2 of 3')

      back()
      assertStep('Step one', 'Step 1 of 3')
    })

    it('renders review step content', () => {
      mountForm(multiStepSchema)

      fill('First name', 'Taylor')
      next()

      fill('Email', 'taylor@example.com')
      next('Review')

      assertStep('Review', 'Step 3 of 3')

      // Step one review
      step()
        .contains('.rpl-summary-list__title', 'Step one')
        .parent()
        .as('stepOne')

      cy.get('@stepOne').contains('.rpl-summary-list__label', 'First name')
      cy.get('@stepOne').contains('.rpl-summary-list__value', 'Taylor')
      cy.get('@stepOne')
        .contains('.rpl-summary-list__action a', 'Change')
        .should('have.attr', 'href', '#first_name')

      // Step two review
      step()
        .contains('.rpl-summary-list__title', 'Step two')
        .parent()
        .as('stepTwo')

      cy.get('@stepTwo').contains('.rpl-summary-list__label', 'Email')
      cy.get('@stepTwo').contains(
        '.rpl-summary-list__value',
        'taylor@example.com'
      )
      cy.get('@stepTwo')
        .contains('.rpl-summary-list__action a', 'Change')
        .should('have.attr', 'href', '#email')

      // Action link navigates back to step field
      cy.get('@stepOne').find('a[href="#first_name"]').click()
      cy.focused().should('have.attr', 'name', 'first_name')
    })

    it('steps can excluded from review content', () => {
      mountForm(multiStepSchemaSubSteps)

      fill('First name', 'Taylor')
      next()
      fill('Last name', 'Smith')
      next()
      fill('Email', 'taylor@example.com')
      next()
      check('I accept the terms')
      next()

      assertStep('Review', 'Step 3 of 3')

      step()
        .contains('.rpl-summary-list__title', 'Step one point one')
        .should('not.exist')

      step()
        .contains('.rpl-summary-list__title', 'Step one point two')
        .should('not.exist')
    })

    it('hides previous step button when prevButton is disabled', () => {
      mountForm(multiStepSchemaNoPrevButton)

      next()
      assertStep('Step two', 'Step 2 of 3')

      step().get('.rpl-form__step-prev').should('not.be.visible')
      step().contains('button', 'Continue').should('be.visible')
    })

    it('hides next step button when nextButton is disabled', () => {
      mountForm(multiStepSchemaNoNextButton)

      next()
      assertStep('Step two', 'Step 2 of 3')

      step().get('.rpl-form__step-next').should('not.be.visible')
      step().contains('button', 'Back').should('be.visible')
    })

    it('allows navigating between steps with sub-steps', () => {
      mountForm(multiStepSchemaSubSteps)

      assertStep('Step one', 'Step 1 of 3')

      next()
      assertError(true)

      fill('First name', 'Taylor')

      // Go to sub-step 1.1
      next()
      assertStep('Step one point one', 'Step 1 of 3')
      assertError(false)

      next()
      assertError(true)

      fill('Last name', 'Smith')

      // Go to sub-step 1.2
      next()
      assertStep('Step one point two', 'Step 1 of 3')
      assertError(false)

      next()
      assertError(true)

      fill('Email', 'tsmith@mail.com')

      // Go to step 2
      next()
      assertStep('Step two', 'Step 2 of 3')
      assertError(false)

      next()
      assertError(true)
      assertStep('Step two', 'Step 2 of 3')

      check('I accept the terms')

      // Go to step 3
      next()
      assertStep('Review', 'Step 3 of 3')
      assertError(false)

      // Navigate back through steps
      back()
      assertStep('Step two', 'Step 2 of 3')

      // Skips back to step 1 with custom beforeStepChange
      back()
      assertStep('Step one', 'Step 1 of 3')
      step().find('[name="first_name"]').should('be.visible')
    })

    it('progress indicator does not display sub-steps', () => {
      mountForm(multiStepSchemaSubSteps)

      cy.get('.rpl-progress__title').contains('Progress')
      cy.get('.rpl-progress__subtitle').contains('Step 1 of 3')
      cy.get('.rpl-progress-step').as('steps')

      cy.get('@steps').should('have.length', 3)
      cy.get('@steps').eq(0).contains('Step one')
      cy.get('@steps').eq(1).contains('Step two')
      cy.get('@steps').eq(2).contains('Review')

      cy.get('@steps').eq(0).should('have.class', 'rpl-progress-step--active')
      cy.get('@steps')
        .eq(1)
        .should('not.have.class', 'rpl-progress-step--active')
      cy.get('@steps')
        .eq(2)
        .should('not.have.class', 'rpl-progress-step--active')

      fill('First name', 'Taylor')

      // Go to sub-step 1.1
      next()
      cy.get('@steps').should('have.length', 3)
      cy.get('@steps').contains('.rpl-progress-step--active', 'Step one')

      fill('Last name', 'Smith')

      // Go to sub-step 1.2
      next()
      cy.get('@steps').should('have.length', 3)
      cy.get('@steps').contains('.rpl-progress-step--active', 'Step one')

      fill('Email', 'taylor@mail.com')

      // Go to step 2
      next()
      cy.get('@steps').should('have.length', 3)
      cy.get('@steps').contains('.rpl-progress-step--complete', 'Step one')
      cy.get('@steps').contains('.rpl-progress-step--active', 'Step two')

      check('I accept the terms')

      // Go to step 3
      next()

      cy.get('@steps').should('have.length', 3)
      cy.get('@steps').contains('.rpl-progress-step--complete', 'Step two')
      cy.get('@steps').contains('.rpl-progress-step--active', 'Review')
    })
  })
})
