export default {
  getFormData: async setFilterOptions => {
    const audienceValues = await setFilterOptions({
      fieldName: 'field_audience_name'
    })
    const complaintTopicValues = await setFilterOptions({
      fieldName: 'field_topic_name'
    })
    return {
      title: 'complaints',
      searchPlaceholder: 'Search all complaints and programs',
      theme: 'light',
      allowBlank: true,
      filterForm: {
        tideId: 'tide_search_form',
        tag: 'rpl-fieldset',
        model: {
          // Multi-value fields should always be an array.
          field_audience_name: [],
          field_status: [],
          field_topic_name: []
        },
        schema: {
          groups: [
            {
              fields: [
                {
                  type: 'rplchecklist',
                  label: 'View those relevant to',
                  model: 'field_audience_name',
                  styleClasses: ['form-group--col-two'],
                  values: audienceValues,
                  placeholder: 'Individuals and organisation types',
                  filter: {
                    type: 'term',
                    operator: ''
                  }
                },
                {
                  type: 'rplchecklist',
                  label: 'complaint topic',
                  model: 'field_topic_name',
                  styleClasses: ['form-group--col-two'],
                  values: complaintTopicValues,
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
                  type: 'rplchecklist',
                  label: 'Status',
                  model: 'field_status',
                  styleClasses: ['form-group--col-two'],
                  values: ['Open', 'Closed', 'Ongoing', 'Opening soon'],
                  placeholder: 'Select for opened, closed or upcoming complaints',
                  filter: {
                    type: 'date',
                    operator: '',
                    computedFilter: true
                  }
                }
              ]
            },
            {
              fields: [
                {
                  type: 'rplsubmitloader',
                  buttonText: 'Apply search filters',
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
