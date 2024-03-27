export default {
  searchListingConfig: {
    resultsPerPage: 20,
    formTheme: 'default',
    hideSearchForm: false,
    labels: {
      submit: 'Submit search',
      placeholder: 'Start typing search term...'
    },
    customSort: [{ 'title.keyword': 'asc' }]
  },
  queryConfig: {
    multi_match: {
      query: '{{query}}',
      fields: [
        'title^3',
        'field_landing_page_summary^2',
        'body',
        'field_paragraph_body',
        'summary_processed'
      ]
    }
  },
  globalFilters: [
    { terms: { type: ['news'] } },
    { terms: { field_node_site: [8888] } }
  ],
  userFilters: [
    {
      id: 'topic',
      component: 'TideSearchFilterDropdown',
      filter: { type: 'terms', value: 'field_topic_name' },
      aggregations: { field: 'topic', source: 'taxonomy' },
      props: {
        id: 'topic',
        label: 'Topics',
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
    layout: {
      component: 'TideSearchResultsTable',
      props: {
        showExtraContent: true,
        columns: [
          { label: 'Title', objectKey: 'title', cols: 4 },
          { label: 'Tags', objectKey: 'field_tags_name' }
        ],
        extraContent: {
          items: [
            { label: 'Topics', objectKey: 'field_topic_name' },
            { label: 'Date', objectKey: 'field_news_date' }
          ]
        }
      }
    }
  }
}
