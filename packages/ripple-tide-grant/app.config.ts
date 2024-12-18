export default defineAppConfig({
  ripple: {
    search: {
      filterFunctions: {
        grantStatus: (filterConfig: string, statuses: unknown) => {
          const mapStatusToFilterDSL = (status) => {
            switch (status) {
              case 'open':
                return {
                  bool: {
                    must: [
                      {
                        range: {
                          field_node_dates_start_value: {
                            lte: 'now'
                          }
                        }
                      },
                      {
                        range: {
                          field_node_dates_end_value: {
                            gte: 'now'
                          }
                        }
                      }
                    ],
                    must_not: [
                      {
                        term: {
                          field_node_on_going: 'true'
                        }
                      }
                    ]
                  }
                }
              case 'closed':
                return {
                  range: {
                    field_node_dates_end_value: {
                      lte: 'now'
                    }
                  }
                }

              case 'ongoing':
                return {
                  term: {
                    field_node_on_going: 'true'
                  }
                }

              case 'opening_soon':
                return {
                  range: {
                    field_node_dates_start_value: {
                      gte: 'now'
                    }
                  }
                }
              default:
                return null
            }
          }

          const filters = statuses
            .map(mapStatusToFilterDSL)
            .filter((query) => !!query) // filter null values

          return {
            bool: {
              should: filters
            }
          }
        }
      },
      queryConfigFunctions: {
        grantsQueryFn: ({ queryFilters, searchTerm }) => {
          const searchQuery = searchTerm?.q
            ? {
                multi_match: {
                  query: searchTerm?.q,
                  fields: [
                    'title^3',
                    'field_landing_page_summary^2',
                    'body',
                    'field_paragraph_body',
                    'summary_processed'
                  ]
                }
              }
            : [{ match_all: {} }]

          const rangeQuery = [
            {
              range: {
                field_node_dates_start_value: {
                  lte: 'now'
                }
              }
            },
            {
              range: {
                field_node_dates_end_value: {
                  gte: 'now'
                }
              }
            }
          ]

          return {
            function_score: {
              query: {
                bool: {
                  must: searchQuery,
                  filter: queryFilters
                }
              },
              functions: [
                {
                  filter: {
                    bool: {
                      must: [
                        ...rangeQuery,
                        { term: { field_node_on_going: false } }
                      ]
                    }
                  },
                  weight: 4
                },
                {
                  filter: {
                    bool: {
                      must: [...rangeQuery],
                      must_not: [{ exists: { field: 'field_node_on_going' } }]
                    }
                  },
                  weight: 4
                },
                {
                  filter: [
                    {
                      term: { field_node_on_going: true }
                    }
                  ],
                  weight: 3
                },
                {
                  filter: [
                    {
                      range: {
                        field_node_dates_start_value: {
                          gte: 'now'
                        }
                      }
                    }
                  ],
                  weight: 2
                }
              ],
              score_mode: 'sum',
              boost_mode: 'multiply'
            }
          }
        }
      }
    }
  }
})
