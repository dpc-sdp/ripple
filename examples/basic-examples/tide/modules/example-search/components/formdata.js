export default {
  getFormData: async setFilterOptions => {
    const eventCategoryValues = await setFilterOptions({
      fieldName: 'field_event_category_name'
    })
    const eventNameValues = await setFilterOptions({
      fieldName: 'field_event_details_event_requirements_name'
    })
    return {
      title: 'Example search page',
      subtitle: 'A search form with filters, card result style. Search "event".',
      searchPlaceholder: 'Start typing...',
      theme: 'light',
      allowBlank: true,
      filterForm: {
        tideId: 'tide_search_form',
        tag: 'rpl-fieldset',
        model: {
          // Multi-value fields should always be an array.
          field_event_category_name: [],
          field_event_date_end_value: '',
          location: '',
          field_event_details_event_requirements_name: []
        },
        schema: {
          groups: [
            {
              fields: [
                {
                  type: 'rplchecklist',
                  styleClasses: ['form-group--col-two'],
                  label: 'Select an event category',
                  model: 'field_event_category_name',
                  values: eventCategoryValues,
                  placeholder: 'Select a topic',
                  // TODO: Update 'filter' key to 'query' to make purpose clearer.
                  filter: {
                    type: 'term',
                    operator: ''
                  }
                },
                {
                  type: 'input',
                  inputType: 'text',
                  maxlength: 50,
                  styleClasses: ['form-group--col-two'],
                  label: 'Location',
                  model: 'location',
                  placeholder: 'Start typing suburb or postcode...',
                  filter: {
                    type: 'multiMatch',
                    operator: '',
                    fields: [
                      'field_event_details_event_locality',
                      'field_event_details_event_postal_code'
                    ]
                  }
                }
              ]
            },
            {
              fields: [
                {
                  type: 'rpldatepicker',
                  ranged: false,
                  styleClasses: ['form-group--col-two'],
                  label: 'Select an event date',
                  model: 'field_event_date_end_value',
                  placeholder: 'DD/MM/YYYY',
                  filter: {
                    type: 'date',
                    operator: 'gte'
                  }
                },
                {
                  type: 'rplchecklist',
                  label: 'Event requirements',
                  styleClasses: ['form-group--col-two'],
                  model: 'field_event_details_event_requirements_name',
                  // TODO: There are no values for this field how can we programmactically hide a field in this instance.
                  values: eventNameValues,
                  placeholder: 'Please select',
                  filter: {
                    type: 'term',
                    operator: ''
                  }
                }
              ]
            },
            {
              fields: [
                {
                  type: 'rplsubmitloader',
                  buttonText: 'Apply change',
                  loading: false,
                  autoUpdate: true,
                  styleClasses: ['form-group--inline']
                },
                {
                  type: 'rplclearform',
                  buttonText: 'Clear search filters',
                  styleClasses: ['form-group--inline']
                }
              ]
            }
          ]
        },
        formOptions: {
          validateAfterLoad: false,
          validateAfterChanged: false
        },
        formState: {}
      }
    }
  }
}
