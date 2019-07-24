const utils = {

  /**
   * Format an audience array into a human readable format.
   * @param  {Array} audiences array of strings or { name: '' }
   * @return {String} formatted audience.
   */
  formatAudiences: (audiences) => {
    const formatAudience = (input) => {
      const term = typeof input === 'string' ? input : input.name
      if (term) {
        switch (term) {
          case 'Individual':
            return 'individuals'
          case 'Business':
            return 'businesses'
          default:
            return term.toLowerCase()
        }
      }
    }
    if (audiences && audiences.length > 0) {
      const audienceStr = [...new Set(audiences)].map(a => formatAudience(a)).join(', ')
      return `${audienceStr.charAt(0).toUpperCase() + audienceStr.slice(1)}`
    }
    return ''
  },

  /**
   * Format a file size (in bytes) to human readable format.
   * @param  {Number} fileSize number in bytes
   * @return {String} formatted file size.
   */
  formattedSize: (fileSize) => {
    if (fileSize != null) {
      // https://stackoverflow.com/a/18650828
      if (typeof fileSize === 'string') return fileSize
      if (fileSize === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(fileSize) / Math.log(k))
      return parseFloat((fileSize / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }
    return ''
  },

  /**
   * Includes additional seach filter values based on field_status.
   * @param  {Object} filters search filters object
   * @return {Object} filters object
   */
  getGrantsFilters: (filters) => {
    const getOperator = (status) => {
      switch (status) {
        case 'Open':
          // field_node_date_end_value > now && field_node_date_start_value < now
          return 'lte'
        case 'Closed':
          // field_node_date_end_value < now
          return 'lte'
        case 'Ongoing':
          // field_node_on_going === true
          return ''
        case 'Opening soon':
          // field_node_date_start_value > now
          return 'gte'
      }
    }

    if (filters) {
      for (let filter in filters) {
        if (filter === 'field_status') {
          filters[filter].operator = getOperator(filters[filter].values[0])

          switch (filters[filter].values[0]) {
            case 'Open':
              // field_node_date_end_value > now && field_node_date_start_value < now
              filters.field_node_dates_start_value = JSON.parse(JSON.stringify(filters[filter]))
              filters.field_node_dates_start_value.values = 'now'
              filters.field_node_dates_start_value.operator = 'lte'
              // Add an additional filter for end date.
              filters.field_node_dates_end_value = JSON.parse(JSON.stringify(filters[filter]))
              filters.field_node_dates_end_value.values = 'now'
              filters.field_node_dates_end_value.operator = 'gte'
              break
            case 'Closed':
              // field_node_date_end_value < now
              filters.field_node_dates_end_value = JSON.parse(JSON.stringify(filters[filter]))
              filters.field_node_dates_end_value.values = 'now'
              break
            case 'Ongoing':
              // field_node_on_going === true
              filters.field_node_on_going = {
                type: 'term',
                values: 'true'
              }
              break
            case 'Opening soon':
              // field_node_date_start_value > now
              filters.field_node_dates_start_value = JSON.parse(JSON.stringify(filters[filter]))
              filters.field_node_dates_start_value.values = 'now'
              break
          }
        }
      }
      return filters
    }
    return null
  }
}

export default utils
