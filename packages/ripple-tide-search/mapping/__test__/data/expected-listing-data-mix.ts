export default {
  searchListingConfig: {
    hideSearchForm: false,
    resultsPerPage: 12,
    labels: {
      submit: 'Submit search',
      placeholder: 'Start typing search term...'
    },
    customSort: [{ created: 'desc' }, { 'title.keyword': 'asc' }],
    formTheme: 'default'
  },
  queryConfig: {
    multi_match: {
      query: '{{query}}',
      fields: [
        'field_landing_page_summary^2',
        'field_paragraph_body',
        'summary_processed',
        'title',
        'body'
      ]
    }
  },
  globalFilters: [
    { terms: { status: [true] } },
    { terms: { field_node_site: [8888] } },
    { terms: { type: ['news'] } },
    { terms: { field_topic_name: ['Demo Topic'] } }
  ],
  userFilters: [
    {
      id: 'department',
      component: 'TideSearchFilterDropdown',
      filter: { type: 'terms', value: 'field_department_name' },
      aggregations: { field: 'department', source: 'taxonomy' },
      props: {
        id: 'department',
        label: 'Departments',
        placeholder: 'Select a department',
        type: 'RplFormDropdown',
        multiple: true,
        options: [
          {
            id: 1,
            label: 'Option 1',
            value: 'Option 1',
            parent: null
          }
        ]
      }
    },
    {
      id: 'topic',
      component: 'TideSearchFilterDropdown',
      aggregations: { field: 'topic', source: 'taxonomy' },
      filter: { type: 'terms', value: 'field_topic_name' },
      props: {
        id: 'topic',
        label: 'Topic',
        placeholder: 'Select a topic',
        type: 'RplFormDropdown',
        multiple: true,
        options: [
          {
            id: 1,
            label: 'Option 1',
            value: 'Option 1',
            parent: null
          }
        ]
      }
    },
    {
      id: 'tags',
      component: 'TideSearchFilterCheckbox',
      filter: { type: 'terms', value: 'field_tags_name', multiple: false },
      props: {
        id: 'tags',
        label: 'Tags',
        checkboxLabel: 'Only show demo tag',
        onValue: 'Demo Tag'
      }
    }
  ],
  results: {
    layout: { component: 'TideSearchResultsList', props: { customProp: true } },
    item: { '*': { component: 'TideSearchResult' } }
  },
  layoutConfig: { belowFilter: { component: 'TideCustomBelowFilterComponent' } }
}
