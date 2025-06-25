export default {
  searchListingConfig: {
    filterByCurrentSite: false,
    hideSearchForm: false,
    resultsPerPage: 15,
    labels: { submit: 'Submit', placeholder: 'Search me....' },
    customSort: [{ 'title.keyword': 'asc' }]
  },
  queryConfig: {
    multi_match: { query: '{{query}}', fields: ['title', 'body'] }
  },
  globalFilters: [
    { terms: { field_node_site: [8888] } },
    { terms: { type: ['news'] } },
    { terms: { field_topic_name: ['Demo Topic'] } }
  ],
  userFilters: [
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
            id: '1',
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
      filter: {
        type: 'terms',
        value: 'field_tags_name',
        multiple: false
      },
      props: {
        id: 'tags',
        label: 'Tags',
        checkboxLabel: 'Only show demo tag',
        onValue: 'Demo Tag'
      }
    }
  ],
  results: {
    layout: { component: 'TideSearchResultsList' },
    item: { '*': { component: 'TideSearchResult' } }
  }
}
