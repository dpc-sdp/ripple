import RplForm from './RplForm.vue'

describe('<RplFormAlert />', () => {
  it('renders', () => {
    // see: https://test-utils.vuejs.org/guide/
    cy.mount(RplForm, {
      props: {
        id: 'test-form',
        schema: [
          {
            $formkit: 'RplFormText',
            name: 'last_name',
            label: 'Last name',
            help: 'Your surname',
            id: 'last_name',
            validation: '',
            validationMessages: {}
          }
        ]
      }
    })
  })
})
