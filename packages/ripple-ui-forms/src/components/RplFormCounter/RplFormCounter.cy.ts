import RplFormCounter from './RplFormCounter.vue'

describe('<RplFormCounter />', () => {
  it('renders', () => {
    cy.mount(RplFormCounter, {
      props: {
        value: 'Loem Ipsum',
        counterMin: 0,
        counterMax: 20
      }
    })
  })

  it('displays the current count', () => {
    cy.mount(RplFormCounter, {
      props: {
        value: 'Lorem',
        counterMin: 0,
        counterMax: 10
      }
    })
      .get('[data-cy="counter"]')
      .should('have.text', 'You have 5 characters')
  })

  it('displays the remaining count to reach the minimum', () => {
    cy.mount(RplFormCounter, {
      props: {
        value: 'Lorem',
        counterMin: 30
      }
    })
      .get('[data-cy="counter"]')
      .should('have.text', 'You have 25 characters remaining')
  })

  it('displays the how many characters over the maximum', () => {
    cy.mount(RplFormCounter, {
      props: {
        value: 'Lorem Ipsum Dol',
        counterMax: 10
      }
    })
      .get('[data-cy="counter"]')
      .should('have.text', 'You have 5 characters too many')
  })

  it('displays the word count when empty', () => {
    cy.mount(RplFormCounter, {
      props: {
        type: 'word',
        value: '',
        counterMax: 5
      }
    })
      .get('[data-cy="counter"]')
      .should('have.text', 'You have 0 words')
  })

  it('displays the word count error when above the minimum and invalid', () => {
    cy.mount(RplFormCounter, {
      props: {
        type: 'word',
        value: 'Lorem Ipsum Dol',
        counterMin: 5,
        invalid: true
      }
    })
      .get('[data-cy="counter"]')
      .should('have.text', 'You have 2 words too little')
  })
})
