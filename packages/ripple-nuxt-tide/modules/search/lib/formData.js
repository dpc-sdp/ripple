export default {
  getFormData: async (setFilterOptions) => {
    let searchTopicValues = await setFilterOptions({
      fieldName: 'field_topic_name'
    })

    // Format options as per the rplselect.
    searchTopicValues = searchTopicValues.map(topic => {
      return { 'id': topic, 'name': topic }
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
              type: 'rplselect',
              label: 'Select a topic',
              model: 'field_topic_name',
              values: searchTopicValues,
              placeholder: 'Select a topic',
              multiselect: true,
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
