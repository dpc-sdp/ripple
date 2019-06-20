export default {
  getFormData: async (setFilterOptions) => {
    const searchTopicValues = await setFilterOptions({
      fieldName: 'field_topic_name'
    })
    return {
      title: 'Search results',
      searchPlaceholder: 'Start typing...',
      theme: 'light',
      filterForm: {
        tideId: 'tide_search_form',
        model: {
          // Multi-value fields should always be an array.
          field_topic_name: []
        },
        schema: {
          fields: [
            {
              type: 'rplchecklist',
              label: 'Select a topic',
              model: 'field_topic_name',
              values: searchTopicValues,
              placeholder: 'Select a topic',
              filter: {
                type: 'term',
                operator: ''
              }
            },
            {
              type: 'rplsubmitloader',
              buttonText: 'Apply change',
              loading: false
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
