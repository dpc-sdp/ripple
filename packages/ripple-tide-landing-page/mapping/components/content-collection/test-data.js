export const rawData = {
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/content_collection_enhanced/999f4f42-41cb-4d0d-a92d-50750798bb07?resourceVersion=id%3A1621'
    }
  },
  meta: {
    target_revision_id: 1621,
    drupal_internal__target_id: 1437
  },
  drupal_internal__id: 1437,
  drupal_internal__revision_id: 1621,
  langcode: 'en',
  status: true,
  created: '2023-02-13T00:26:20+00:00',
  parent_id: '267',
  parent_type: 'node',
  parent_field_name: 'field_landing_page_component',
  behavior_settings: [],
  default_langcode: true,
  revision_translation_affected: true,
  field_cc_enhanced_description: {
    value: '<p>All about News &amp; Landing Pages, with topics.</p>\r\n',
    format: 'rich_text',
    processed: '<p>All about News &amp; Landing Pages, with topics.</p>'
  },
  field_cc_enhanced_title: 'News & Landing Pages',
  field_content_collection_config: {
    title: '',
    description: '',
    callToAction: { text: 'View all', url: '#' },
    internal: {
      contentTypes: ['landing_page', 'news'],
      contentFields: {
        field_topic: { values: [8941, 8940], operator: 'AND' }
      },
      sort: [{ field: 'title', direction: 'asc' }],
      itemsToLoad: 6
    },
    interface: {
      display: {
        type: 'grid',
        resultComponent: { type: 'card', style: 'thumbnail' },
        options: {
          resultsCountText: 'Displaying {range} of {count} results.',
          noResultsText: "Sorry! We couldn't find any matches.",
          loadingText: 'Loading',
          errorText: "Search isn't working right now. Try again later.",
          pagination: { type: 'numbers' }
        }
      },
      keyword: {
        type: 'basic',
        label: 'Search by keywords',
        placeholder: 'Enter keyword(s)',
        fields: ['title', 'field_landing_page_summary']
      },
      filters: {
        defaultStyling: true,
        submit: {
          visibility: 'visible',
          label: 'Apply search filters'
        },
        clearForm: {
          visibility: 'visible',
          label: 'Clear search filters'
        }
      }
    }
  },
  id: '999f4f42-41cb-4d0d-a92d-50750798bb07',
  type: 'paragraph--content_collection_enhanced'
}
