export default {
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/tide_search_listing/9e58c8f5-4ab7-428f-a60a-675c2cf94779?resourceVersion=id%3A386'
    }
  },
  meta: {},
  drupal_internal__nid: 289,
  drupal_internal__vid: 386,
  langcode: 'en',
  revision_timestamp: '2024-03-17T01:52:21+00:00',
  revision_log: null,
  status: true,
  title: 'TEST: SLC',
  created: '2024-03-17T01:15:25+00:00',
  changed: '2024-03-17T01:52:21+00:00',
  promote: true,
  sticky: false,
  default_langcode: true,
  revision_translation_affected: true,
  moderation_state: 'published',
  metatag: [
    {
      tag: 'meta',
      attributes: {
        name: 'title',
        content: 'TEST: SLC | Single Digital Presence Content Management System'
      }
    },
    {
      tag: 'link',
      attributes: {
        rel: 'canonical',
        href: 'https://develop.content.reference.sdp.vic.gov.au/test-slc'
      }
    },
    {
      tag: 'meta',
      attributes: { property: 'og:locale', content: 'en-AU' }
    }
  ],
  path: { alias: '/site-8888/test-slc', pid: 1998, langcode: 'en' },
  field_above_results_content: null,
  field_below_results_content: null,
  field_custom_sort_configuration: null,
  field_landing_page_intro_text: null,
  field_landing_page_summary: null,
  field_listing_query_config: null,
  field_listing_results_config: null,
  field_listing_results_per_page: null,
  field_metatags: null,
  field_search_configuration:
    '{\r\n  "searchListingConfig": {\r\n    "resultsPerPage": 20,\r\n    "formTheme": "default",\r\n    "labels": {\r\n      "submit": "Submit search",\r\n      "placeholder": "Start typing search term..."\r\n    },\r\n    "customSort": [\r\n      {\r\n        "title.keyword": "asc"\r\n      }\r\n    ]\r\n  },\r\n  "queryConfig": {\r\n    "multi_match": {\r\n      "query": "{{query}}",\r\n      "fields": [\r\n        "title^3",\r\n        "field_landing_page_summary^2",\r\n        "body",\r\n        "field_paragraph_body",\r\n        "summary_processed"\r\n      ]\r\n    }\r\n  },\r\n  "globalFilters": [\r\n    {\r\n      "terms": {\r\n        "type": [\r\n          "news"\r\n        ]\r\n      }\r\n    },\r\n    {\r\n      "terms": {\r\n        "field_node_site": [\r\n          8888\r\n        ]\r\n      }\r\n    }\r\n  ],\r\n  "userFilters": [\r\n    {\r\n      "id": "topic",\r\n      "component": "TideSearchFilterDropdown",\r\n      "filter": {\r\n        "type": "terms",\r\n        "value": "field_topic_name"\r\n      },\r\n      "aggregations": {\r\n        "field": "topic",\r\n        "source": "taxonomy"\r\n      },\r\n      "props": {\r\n        "id": "topic",\r\n        "label": "Topics",\r\n        "placeholder": "Select a topic",\r\n        "type": "RplFormDropdown",\r\n        "multiple": true\r\n      }\r\n    },\r\n    {\r\n      "id": "tags",\r\n      "component": "TideSearchFilterCheckbox",\r\n      "filter": {\r\n        "type": "terms",\r\n        "value": "field_tags_name",\r\n        "multiple": false\r\n      },\r\n      "props": {\r\n        "id": "tags",\r\n        "label": "Tags",\r\n        "checkboxLabel": "Only show demo tag",\r\n        "onValue": "Demo Tag"\r\n      }\r\n    }\r\n  ],\r\n  "results": {\r\n    "layout": {\r\n      "component": "TideSearchResultsTable",\r\n      "props": {\r\n        "showExtraContent": true,\r\n        "columns": [\r\n          {\r\n            "label": "Title",\r\n            "objectKey": "title",\r\n            "cols": 4\r\n          },\r\n          {\r\n            "label": "Tags",\r\n            "objectKey": "field_tags_name"\r\n          }\r\n        ],\r\n        "extraContent": {\r\n          "items": [\r\n            {\r\n              "label": "Topics",\r\n              "objectKey": "field_topic_name"\r\n            },\r\n            {\r\n              "label": "Date",\r\n              "objectKey": "field_news_date"\r\n            }\r\n          ]\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n',
  field_search_input_placeholder: null,
  field_search_submit_label: null,
  field_show_content_rating: true,
  node_type: {
    type: 'node_type--node_type',
    id: '717687af-b1eb-49cb-8a2e-2b23a19551b6',
    meta: { drupal_internal__target_id: 'tide_search_listing' }
  },
  field_header_components: [],
  field_listing_global_filters: [],
  field_listing_user_filters: [],
  field_node_primary_site: {
    type: 'taxonomy_term--sites',
    id: '11dede11-10c0-111e1-1100-000000000040',
    meta: { drupal_internal__target_id: 8888 }
  },
  field_node_site: [
    {
      type: 'taxonomy_term--sites',
      id: '11dede11-10c0-111e1-1100-000000000040',
      meta: { drupal_internal__target_id: 8888 }
    }
  ],
  field_tags: [],
  id: '9e58c8f5-4ab7-428f-a60a-675c2cf94779',
  type: 'node--tide_search_listing',
  _sectionId: '8888'
}
