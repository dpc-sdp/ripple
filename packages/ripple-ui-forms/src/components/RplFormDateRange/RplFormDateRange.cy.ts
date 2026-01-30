import RplFormDateRange from './RplFormDateRange.vue'

const props = {
  id: 'date-range',
  name: 'date-range',
  label: 'Date range',
  fromLabel: 'From date',
  toLabel: 'To date',
  onChange: () => {}
}

const from = () => cy.get('input[type="date"]').first()
const to = () => cy.get('input[type="date"]').last()

describe('RplFormDateRange', () => {
  it('mounts', () => {
    cy.mount(RplFormDateRange, { props })
    cy.get('label').contains('From date').should('be.visible')
    cy.get('label').contains('To date').should('be.visible')
  })

  it('allows filling out from and to fields independently', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')
    cy.mount(RplFormDateRange, { props: { ...props, onChange: onChangeSpy } })

    from().type('2025-01-22')
    cy.get('@onChangeSpy').should('have.been.calledWith', {
      from: '2025-01-22',
      to: ''
    })

    to().type('2025-01-28')
    cy.get('@onChangeSpy').should('have.been.calledWith', {
      from: '2025-01-22',
      to: '2025-01-28'
    })

    from().clear()
    cy.get('@onChangeSpy').should('have.been.calledWith', {
      from: '',
      to: '2025-01-28'
    })
  })

  it('updates min and max attributes accordingly', () => {
    cy.mount(RplFormDateRange, {
      props: {
        ...props,
        min: '2025-01-22',
        max: '2026-12-31'
      }
    })

    // Initial state
    from().should('have.attr', 'min', '2025-01-22')
    from().should('have.attr', 'max', '2026-12-31')
    to().should('have.attr', 'min', '2025-01-22')
    to().should('have.attr', 'max', '2026-12-31')

    // Setting 'from' date should update 'to' min value
    from().type('2025-06-01')
    to().should('have.attr', 'min', '2025-06-01')

    // Setting 'to' date should update 'from' max value
    to().type('2026-07-13')
    from().should('have.attr', 'max', '2026-07-13')
  })

  it('handles custom date formats', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')
    cy.mount(RplFormDateRange, {
      props: {
        ...props,
        onChange: onChangeSpy,
        dateFormat: 'dd/MM/yyyy',
        value: {
          from: '22/01/2025',
          to: '13/02/2025'
        }
      }
    })

    from().should('have.value', '2025-01-22')
    to().should('have.value', '2025-02-13')

    from().type('2024-03-18')
    cy.get('@onChangeSpy').should('have.been.calledWith', {
      from: '18/03/2024',
      to: '13/02/2025'
    })

    to().type('2026-04-20')
    cy.get('@onChangeSpy').should('have.been.calledWith', {
      from: '18/03/2024',
      to: '20/04/2026'
    })
  })

  it('uses the supplied from value to set the from date', () => {
    cy.mount(RplFormDateRange, {
      props: {
        ...props,
        value: {
          from: '2025-01-22'
        }
      }
    })

    from().should('have.value', '2025-01-22')
    to().should('have.value', '')
  })

  it('uses the supplied to value to set the to date', () => {
    cy.mount(RplFormDateRange, {
      props: {
        ...props,
        value: {
          from: '',
          to: '2025-12-31'
        }
      }
    })

    from().should('have.value', '')
    to().should('have.value', '2025-12-31')
  })

  it('uses the supplied values to set the date fields', () => {
    cy.mount(RplFormDateRange, {
      props: {
        ...props,
        value: {
          from: '2025-01-22',
          to: '2025-12-31'
        }
      }
    })

    from().should('have.value', '2025-01-22')
    to().should('have.value', '2025-12-31')
  })
})
