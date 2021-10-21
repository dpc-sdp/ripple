export default {
  getFormData: async setFilterOptions => {
    const fieldProfileCategoryValues = await setFilterOptions({
      fieldName: 'field_profile_category_name'
    })
    const fieldYearValues = await setFilterOptions({
      fieldName: 'field_year'
    })
    const fieldProfileExpertiseNameValues = await setFilterOptions({
      fieldName: 'field_profile_expertise_name'
    })
    const fieldLocationNameValues = await setFilterOptions({
      fieldName: 'field_location_name'
    })

    return {
      title: 'Victorian Honour Roll of women inductees',
      subtitle: 'View our outstanding inductees.',
      searchPlaceholder: 'Start typing...',
      theme: 'light',
      textSearch: false,
      expandFilters: true,
      allowBlank: true,
      filterForm: {
        tag: 'rpl-fieldset',
        tideId: 'tide_search_form',
        model: {
          title: '',
          field_profile_category_name: [],
          field_year: [],
          field_profile_expertise_name: [],
          field_location_name: []
        },
        schema: {
          groups: [
            {
              legend: 'View by',
              fields: [
                {
                  type: 'input',
                  inputType: 'text',
                  maxlength: 50,
                  styleClasses: ['form-group--col-two'],
                  label: 'Honouree name',
                  model: 'title',
                  placeholder: 'Start typing first name or surname...',
                  filter: {
                    type: 'term'
                  }
                },
                {
                  type: 'rplselect',
                  label: 'Category',
                  model: 'field_profile_category_name',
                  styleClasses: ['form-group--col-two'],
                  values: fieldProfileCategoryValues,
                  placeholder: 'Select a category',
                  multiselect: true,
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
                  type: 'rplselect',
                  label: 'Induction year',
                  model: 'field_year',
                  styleClasses: ['form-group--col-two'],
                  values: fieldYearValues.filter(year => year.length === 4), // TODO: Temporary fix for invalid response in search index [SDPA-2000]
                  placeholder: 'Select a year',
                  multiselect: true,
                  filter: {
                    type: 'term',
                    operator: ''
                  }
                },
                {
                  type: 'rplselect',
                  label: 'Field of expertise',
                  model: 'field_profile_expertise_name',
                  styleClasses: ['form-group--col-two'],
                  values: fieldProfileExpertiseNameValues,
                  placeholder: 'Select field of expertise',
                  multiselect: true,
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
                  type: 'rplselect',
                  label: 'Location',
                  model: 'field_location_name',
                  styleClasses: ['form-group--col-two'],
                  values: fieldLocationNameValues,
                  placeholder: 'Select a location',
                  multiselect: true,
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
