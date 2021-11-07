module.exports = {
  include: {
    landingPage: [
      'field_landing_page_component.field_paragraph_custom_component'
    ]
  },

  mapping: {
    landingPageComponents: {
      'paragraph--custom_component': {
        expression: (item) => {
          return item.field_paragraph_custom_component.field_machine_name
        },
        components: [
          {
            case: 'my-custom-component',
            component: 'my-vue-component',
            props: {
              'exampleParam1': {
                filters: ['customFilter']
              }
            }
          }
        ]
      }
    }
  }
}
