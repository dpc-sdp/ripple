import RplFormAlert from './RplFormAlert.vue'

describe('<RplFormAlert />', () => {
  it('renders', () => {
    // see: https://test-utils.vuejs.org/guide/
    cy.mount(RplFormAlert, {
      props: { title: 'Test title', status: 'success' }
    })
  })
})
