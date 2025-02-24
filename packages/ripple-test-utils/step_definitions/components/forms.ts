import { Then, DataTable, When } from '@badeball/cypress-cucumber-preprocessor'

Then('the form with ID {string} should exist', (id: string) => {
  cy.get(`form#${id}`).should('exist')
})

Then(
  'the form {string} should have the following fields:',
  (id: string, dataTable: DataTable) => {
    const table = dataTable.hashes()
    cy.get(`form#${id} .rpl-form__outer`).as('fields')

    table.forEach((row, i: number) => {
      cy.get('@fields')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          if (row.type) {
            cy.get('@item').should('have.data', 'type', row.type)
          }
          if (row.label) {
            cy.get('@item')
              .find('label.rpl-form-label')
              .should('contain', row.label)
          }
          if (row.help) {
            cy.get('@item').find('.rpl-form-help').should('contain', row.help)
          }
          if (row.required) {
            if (row.required === 'true') {
              cy.get('@item')
                .find('.rpl-form-label__required')
                .should('contain', '(Required)')
            }
          }
        })
    })
  }
)

Then(
  'a {string} input with the label {string} should exist',
  (inputType: string, label: string, dataTable: DataTable) => {
    const data = dataTable?.hashes()[0] || {}

    cy.get('label.rpl-form-label')
      .contains(label)
      .closest('.rpl-form__outer')
      .as('field')

    if (data.help) {
      cy.get('@field').should('contain', data.help)
    }

    if (data.required === 'true') {
      cy.get('@field')
        .find('.rpl-form-label__required')
        .should('contain', '(Required)')
    }

    cy.get('@field').should('exist')
    cy.get('@field').find('input').should('have.attr', 'type', inputType)
  }
)

Then('the input with the label {string} should be valid', (label: string) => {
  cy.get('label.rpl-form-label')
    .contains(label)
    .closest('.rpl-form__outer')
    .as('field')

  cy.get('@field').should('exist')
  cy.get('@field').find('input').should('have.attr', 'aria-invalid', 'false')
  cy.get('@field').find('.rpl-form-validation-error').should('not.exist')
})

Then(
  'the input with the label {string} should be invalid with message {string}',
  (label: string, errorMsg: string) => {
    cy.get('label.rpl-form-label')
      .contains(label)
      .closest('.rpl-form__outer')
      .as('field')

    cy.get('@field').should('exist')
    cy.get('@field').find('input').should('have.attr', 'aria-invalid', 'true')
    cy.get('@field')
      .find('.rpl-form-validation-error')
      .should('contain', errorMsg)
  }
)

When(
  'I type {string} into the input with the label {string}',
  (value: string, label: string) => {
    cy.get('label.rpl-form-label')
      .contains(label)
      .closest('.rpl-form__outer')
      .as('field')

    cy.get('@field').should('exist')
    cy.get('@field').find('input').type(value)
  }
)

When(
  'I type {string} into the textarea with the label {string}',
  (value: string, label: string) => {
    cy.get('label.rpl-form-label')
      .contains(label)
      .closest('.rpl-form__outer')
      .as('field')

    cy.get('@field').should('exist')
    cy.get('@field').find('textarea').type(value)
  }
)

When(
  'I select {string} by searching the select field with label {string}',
  (option: string, label: string) => {
    cy.contains('label', label)
      .invoke('attr', 'for')
      .then((dropdownId) => {
        cy.get(`#${dropdownId}`).click()
        cy.focused().type(option)
        cy.get(`#${dropdownId}__menu`)
          .find(`.rpl-form-dropdown-option`)
          .as('availableOptions')
        cy.get('@availableOptions').should('have.length', 1)
        cy.get('@availableOptions').eq(0).click()
      })
  }
)

When(
  'I delete the text for the select field with label {string}',
  (label: string) => {
    cy.contains('label', label)
      .invoke('attr', 'for')
      .then((dropdownId) => {
        cy.get(`#${dropdownId}`).as('dropdown')
        cy.get('@dropdown').click()

        cy.focused().as('searchInput')
        cy.get('@searchInput').invoke('val').should('not.be.empty')
        cy.get('@searchInput').clear()
      })
  }
)

Then(
  `the select field labelled {string} should have the following tags`,
  (label: string, dataTable: DataTable) => {
    const table = dataTable.raw()

    cy.contains('label', label)
      .invoke('attr', 'for')
      .then((dropdownId) => {
        cy.get(`#${dropdownId}`).find('[data-tag-id]').as('selectedTags')
      })

    table.forEach((row, i: number) => {
      cy.get('@selectedTags')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row[0])
        })
    })
  }
)

When(
  'I delete the following tags for the select field with label {string}',
  (label: string, dataTable: DataTable) => {
    const table = dataTable.raw()

    cy.contains('label', label)
      .invoke('attr', 'for')
      .then((dropdownId) => {
        cy.get(`#${dropdownId}`).find('[data-tag-id]').as('selectedTags')
      })

    table.forEach((row) => {
      cy.get('@selectedTags').contains(row[0]).click()
    })
  }
)

When(
  'I select the following options by searching for {string} the select field with label {string}',
  (search: string, label: string, dataTable: DataTable) => {
    const table = dataTable.raw()

    cy.contains('label', label)
      .invoke('attr', 'for')
      .then((dropdownId) => {
        cy.get(`#${dropdownId}`).click()
        cy.focused().type(search)

        cy.get(`#${dropdownId}__menu`)
          .find(`.rpl-form-dropdown-option`)
          .as('availableOptions')

        cy.get('@availableOptions').should('have.length', 2)

        table.forEach((row, i: number) => {
          cy.get('@availableOptions')
            .eq(i)
            .then((item) => {
              cy.wrap(item).as('item')
              cy.get('@item').contains(row[0]).click()
            })
        })
      })
  }
)

Then(
  'a select field with the label {string} should exist',
  (label: string, dataTable: DataTable) => {
    const data = dataTable?.hashes()[0] || {}
    cy.get('label.rpl-form-label')
      .contains(label)
      .closest('.rpl-form__outer')
      .as('field')

    if (data.help) {
      cy.get('@field').should('contain', data.help)
    }

    if (data.required === 'true') {
      cy.get('@field')
        .find('.rpl-form-label__required')
        .should('contain', '(Required)')
    }

    cy.get('@field').should('exist')
    cy.get('@field').find('[role="combobox"]').should('exist')
  }
)

Then('the select with the label {string} should be valid', (label: string) => {
  cy.get('label.rpl-form-label')
    .contains(label)
    .closest('.rpl-form__outer')
    .as('field')

  cy.get('@field').should('exist')
  cy.get('@field')
    .find('.rpl-form-dropdown-input')
    .should('have.attr', 'aria-invalid', 'false')
  cy.get('@field').find('.rpl-form-validation-error').should('not.exist')
})

Then(
  'the select with the label {string} should be invalid with message {string}',
  (label: string, errorMsg: string) => {
    cy.get('label.rpl-form-label')
      .contains(label)
      .closest('.rpl-form__outer')
      .as('field')

    cy.get('@field').should('exist')
    cy.get('@field')
      .find('.rpl-form-dropdown-input')
      .should('have.attr', 'aria-invalid', 'true')
    cy.get('@field')
      .find('.rpl-form-validation-error')
      .should('contain', errorMsg)
  }
)

Then(
  'a radio group field with the label {string} should exist with the following options',
  (label: string, dataTable: DataTable) => {
    const table = dataTable?.hashes()
    cy.get('legend.rpl-form-label')
      .contains(label)
      .closest('.rpl-form__outer')
      .as('field')

    cy.get('@field').find('.rpl-form-option ').as('options')

    table.forEach((row, i: number) => {
      cy.get('@options')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').find('input').should('have.attr', 'type', 'radio')
          cy.get('@item').find('label').should('contain', row.label)
        })
    })
  }
)

Then(
  'a checkbox group field with the label {string} should exist with the following options',
  (label: string, dataTable: DataTable) => {
    const table = dataTable?.hashes()
    cy.get('legend.rpl-form-label')
      .contains(label)
      .closest('.rpl-form__outer')
      .as('field')

    cy.get('@field').find('.rpl-form-option ').as('options')

    table.forEach((row, i: number) => {
      cy.get('@options')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').find('input').should('have.attr', 'type', 'checkbox')
          cy.get('@item').find('label').should('contain', row.label)
        })
    })
  }
)

Then(
  'a textarea field with the label {string} should exist',
  (label: string, dataTable: DataTable) => {
    const data = dataTable?.hashes()[0] || {}
    cy.get('label.rpl-form-label')
      .contains(label)
      .closest('.rpl-form__outer')
      .as('field')

    if (data.help) {
      cy.get('@field').should('contain', data.help)
    }

    if (data.required === 'true') {
      cy.get('@field')
        .find('.rpl-form-label__required')
        .should('contain', '(Required)')
    }

    cy.get('@field').find('textarea').should('exist')
  }
)

Then(
  'a hidden field named {string} should exist with the value {string}',
  (name: string, value: string) => {
    cy.get(`input[name=${name}]`).as('hiddenInput')

    cy.get('@hiddenInput').should('have.attr', 'type', 'hidden')
    cy.get('@hiddenInput').should('have.value', value)
  }
)

When(
  'I click {string} from the select field with label {string}',
  (value: string, label: string) => {
    cy.get('label.rpl-form-label')
      .contains(label)
      .closest('.rpl-form__outer')
      .as('field')

    cy.get('@field').should('exist')
    cy.get('@field').find('[role="combobox"]').click()
    cy.get('@field').find('.rpl-form-dropdown-option').contains(value).click()
    cy.get('body').click({ force: true })
  }
)

Then(
  'a checkbox field with the label {string} should exist',
  (label: string, dataTable: DataTable) => {
    const data = dataTable?.hashes()[0] || {}

    cy.get('legend.rpl-form-label,.rpl-form-option__label')
      .contains(label)
      .closest('.rpl-form__outer')
      .as('field')

    if (data.help) {
      cy.get('@field').should('contain', data.help)
    }

    if (data.required === 'true') {
      cy.get('@field')
        .find('.rpl-form-label__required')
        .should('contain', '(Required)')
    }

    cy.get('@field').should('exist')
    cy.get('@field').find('input[type="checkbox"]').should('exist')

    if (data.checkboxLabel) {
      cy.get('@field').find('label').should('contain', data.checkboxLabel)
    }
  }
)

Then('I toggle the checkbox with label {string}', (label: string) => {
  cy.get('legend.rpl-form-label,.rpl-form-option__label')
    .contains(label)
    .closest('.rpl-form__outer')
    .as('field')

  cy.get('@field')
    .find('input[type="checkbox"]')
    .then(($checkbox) => {
      if ($checkbox.is(':checked')) {
        cy.get('@field').find('input[type="checkbox"]').uncheck({ force: true })
      } else {
        cy.get('@field').find('input[type="checkbox"]').check({ force: true })
      }
    })
})

Then(
  'I click {string} from the checkbox group with label {string}',
  (option: string, label: string) => {
    cy.get('legend.rpl-form-label')
      .contains(label)
      .closest('.rpl-form__outer')
      .as('field')

    cy.get('@field').find(`label`).contains(option).click()
  }
)

Then(
  'I click {string} from the radio group with label {string}',
  (option: string, label: string) => {
    cy.get('legend.rpl-form-label')
      .contains(label)
      .closest('.rpl-form__outer')
      .as('field')

    cy.get('@field').find(`label`).contains(option).click()
  }
)

Then('a field with the label {string} should not exist', (label: string) => {
  cy.contains('.rpl-form-label', label).should('not.exist')
})

Then('a field with the label {string} should exist', (label: string) => {
  cy.contains('.rpl-form-label', label).should('exist')
})

When('I submit the form with ID {string}', (formId: string) => {
  cy.get(`form#${formId}`).submit()
})

Then('the error summary should not display', () => {
  cy.get('[data-component-type="form-error-summary"]').should('not.exist')
})

Then(
  'the error summary should display with the following errors',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get('[data-component-type="form-error-summary"]').as('summary')
    cy.get('@summary').should('exist')
    cy.get('@summary').should('contain', 'Form not submitted')
    cy.get('@summary').should('have.focus')

    table.forEach((row, i: number) => {
      cy.get('@summary')
        .find('.rpl-form-alert__field-link')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.text)
          cy.get('@item').should('have.attr', 'href', row.url)
        })
    })
  }
)

Then(
  'clicking on an error summary link with text {string} should focus on the input with ID {string}',
  (linkText: string, fieldId: string) => {
    cy.get('[data-component-type="form-error-summary"]').as('summary')
    cy.get('@summary')
      .find('.rpl-form-alert__field-link')
      .contains(linkText)
      .click()

    cy.get(`#${fieldId}`).should('have.focus')
  }
)

Then(
  'a server message should be displayed above the form',
  (dataTable: DataTable) => {
    const data = dataTable?.hashes()[0]
    cy.get('[data-component-type="form-server-message"]').as('summary')
    cy.get('@summary').should('contain', data.title)
    cy.get('@summary').should('contain', data.description)

    cy.get(`@summary`).should('have.focus')
  }
)

Then(
  '{int} {string} in the field {string} on {string} should display a counter of {string}',
  (
    length: number,
    type: string,
    field: string,
    id: string,
    counter: string
  ) => {
    cy.get(`form#${id}`).as('component')

    cy.get('@component').within(() => {
      if (length) {
        const value = type === 'words' ? 'xx ' : 'x'
        cy.get(`#${field}`).clear().type(value.repeat(length))
      }
      cy.get(`#${field}`)
        .parents('.rpl-form__inner')
        .find('[data-cy="counter"]')
        .should('have.text', counter)
    })
  }
)

Then('the following field attributes should exist', (dataTable: DataTable) => {
  const table = dataTable.hashes()

  table.forEach((row) => {
    cy.get('label.rpl-form-label')
      .contains(row.field)
      .closest('.rpl-form__outer')
      .as('field')

    cy.get('@field').find('input').should('have.attr', row.attribute, row.value)
  })
})

// Extended
Then(
  'a field labelled {string} should exist with the CSS class {string}',
  (label: string, css: string) => {
    cy.get(css)
      .closest('.rpl-form__outer')
      .find('label.rpl-form-label')
      .should('contain', label)
  }
)

// Unsupported
Then('an input of type {string} is not yet supported', (inputType: string) => {
  cy.get('.rpl-form__outer.rpl-form__input--unsupported')
    .contains(inputType)
    .should('exist')
})

// Open forms
Then('there is an openforms embed with the url {string}', (url: string) => {
  cy.get(`iframe[src^="${url}"]`).should('exist')
})

Then('the openforms iframe height is at least {int}', (height: number) => {
  cy.get(`.tide-open-form iframe`).invoke('height').as('iframeHeight')
  cy.wait(4000)
  cy.get('@iframeHeight').should('be.at.least', height)
})

// Multistep form
Then(
  'the form step {int} of {int} named {string} should be visible',
  (current: number, total: number, name: string) => {
    cy.get('.rpl-form__step:not([hidden])').as('step')
    cy.get('@step').should('have.length', 1)
    cy.get('@step')
      .find(`.rpl-form__step-count`)
      .contains(`Step ${current} of ${total}`)
    cy.get('@step').find(`.rpl-form__step-title`).contains(name)
  }
)

Then(
  'the form progress bar should display the steps',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get('.rpl-form__progress .rpl-progress-step').as('steps')

    table.forEach((row, i: number) => {
      cy.get('@steps')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').contains(row.label)

          if (row.status === 'pending') {
            cy.get('@item').should(
              'not.have.class',
              'rpl-progress-step--active'
            )
            cy.get('@item').should(
              'not.have.class',
              'rpl-progress-step--complete'
            )
          }
          if (row.status === 'active') {
            cy.get('@item').should('have.class', 'rpl-progress-step--active')
          }
          if (row.status === 'complete') {
            cy.get('@item').should('have.class', 'rpl-progress-step--complete')
          }
        })
    })
  }
)

Then('the form progress bar should be hidden', () => {
  cy.get('.rpl-form__progress').should('not.exist')
})

Then(
  'I navigate to the next form step by clicking {string}',
  (label: string) => {
    cy.get(`.rpl-form__step-next`).contains(label).click()
  }
)

Then(
  'I navigate to the previous form step by clicking {string}',
  (label: string) => {
    cy.get(`.rpl-form__step-prev`).contains(label).click()
  }
)

Then('the main form steps container should have focus', () => {
  cy.get(`.rpl-form__steps`).should('have.focus')
})

Then(
  'I should be scrolled to the top of the form step with an offset of {int}',
  (offset: number) => {
    cy.window()
      .its('scrollY')
      .should('be.closeTo', cy.$$('.rpl-form__steps').offset().top - offset, 1)
  }
)

Then(
  'the steps error summary should display with the following errors',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get('[data-component-type="form-error-summary"]').as('summary')
    cy.get('@summary').should('exist')
    cy.get('@summary').should('have.focus')

    table.forEach((row, i: number) => {
      cy.get('@summary')
        .find('.rpl-form-alert__field-link')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.text)
          cy.get('@item').should('have.attr', 'href', row.url)
        })
    })
  }
)
