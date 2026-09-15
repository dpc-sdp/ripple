import RplFormCounter from './RplFormCounter.vue'

describe('<RplFormCounter />', () => {
  it('renders', () => {
    cy.mount(RplFormCounter, {
      props: {
        value: '',
        counterMin: 0,
        counterMax: 20
      }
    })
      .get('[data-cy="counter"]')
      .should('have.text', 'You have 20 characters left')
  })

  it('displays the current count when at max', () => {
    cy.mount(RplFormCounter, {
      props: {
        value: 'Lorem',
        counterMax: 5
      }
    })
      .get('[data-cy="counter"]')
      .should('have.text', 'You have 5 characters')
  })

  it('displays the remaining current count when below max', () => {
    cy.mount(RplFormCounter, {
      props: {
        value: 'Lorem',
        counterMin: 0,
        counterMax: 10
      }
    })
      .get('[data-cy="counter"]')
      .should('have.text', 'You have 5 characters left')
  })

  it('displays the current count when under the minimum', () => {
    cy.mount(RplFormCounter, {
      props: {
        value: 'Lorem',
        counterMin: 30
      }
    })
      .get('[data-cy="counter"]')
      .should('have.text', 'You have 5 characters')
  })

  it('displays how many characters over the maximum', () => {
    cy.mount(RplFormCounter, {
      props: {
        value: 'Lorem Ipsum Dol',
        counterMax: 10
      }
    })
      .get('[data-cy="counter"]')
      .should('have.text', 'You have 5 characters too many')
  })

  it('displays the word count when at max', () => {
    cy.mount(RplFormCounter, {
      props: {
        type: 'word',
        value: 'one two three four five',
        counterMax: 5
      }
    })
      .get('[data-cy="counter"]')
      .should('have.text', 'You have 5 words')
  })

  it('displays the remaining current word count when below max', () => {
    cy.mount(RplFormCounter, {
      props: {
        type: 'word',
        value: 'one two',
        counterMax: 5
      }
    })
      .get('[data-cy="counter"]')
      .should('have.text', 'You have 3 words left')
  })

  it('displays the word count error when below the minimum and invalid', () => {
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
