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
      }
    }
  }
})
