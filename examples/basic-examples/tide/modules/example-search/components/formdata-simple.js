export default {
  getFormData: async setFilterOptions => {
    return {
      title: 'Example search simple',
      subtitle: 'A simple search form, no filters, default results style. Search "event".',
      searchPlaceholder: 'Start typing...',
      theme: 'light',
      expandFilters: true,
      allowBlank: true,
      filterForm: {
        tideId: 'tide_search_form',
        tag: 'rpl-fieldset',
        model: {
        },
        schema: {
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
