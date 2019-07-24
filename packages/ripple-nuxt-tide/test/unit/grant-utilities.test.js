import utils from '../../modules/grant/lib/utils.js'

describe('Grant utilities', () => {
  test('should return formatted audience text', async () => {
    const unformattedAudiences = [
      { name: 'Individual' },
      'Business',
      'Not-for-profit groups'
    ]
    // Supports empty parameters
    expect(utils.formatAudiences()).toEqual('')
    expect(utils.formatAudiences([])).toEqual('')
    expect(utils.formatAudiences([{ name: null }])).toEqual('')
    // Formats a correct parameter
    expect(utils.formatAudiences(unformattedAudiences)).toEqual('Individuals, businesses, not-for-profit groups')
  })

  test('should return formatted size', async () => {
    // Supports empty parameters
    expect(utils.formattedSize()).toEqual('')
    // Formats a correct parameter
    expect(utils.formattedSize('Custom text')).toEqual('Custom text')
    expect(utils.formattedSize(0)).toEqual('0 Bytes')
    expect(utils.formattedSize(1)).toEqual('1 Bytes')
    expect(utils.formattedSize(Math.pow(1024, 1))).toEqual('1 KB')
    expect(utils.formattedSize(Math.pow(1024, 2))).toEqual('1 MB')
    expect(utils.formattedSize(Math.pow(1024, 3))).toEqual('1 GB')
    expect(utils.formattedSize(Math.pow(1024, 4))).toEqual('1 TB')
    expect(utils.formattedSize(Math.pow(1024, 5))).toEqual('1 PB')
    expect(utils.formattedSize(Math.pow(1024, 6))).toEqual('1 EB')
    expect(utils.formattedSize(Math.pow(1024, 7))).toEqual('1 ZB')
    expect(utils.formattedSize(Math.pow(1024, 8))).toEqual('1 YB')
  })

  test('should return grants filters with search parameters', async () => {
    const noStateInput = { field_topic_name: { type: 'term', operator: '', values: ['Business'] } }

    const stateOpenInput = { field_status: { type: 'date', operator: '', values: ['Open'] } }
    const stateOpenOutput = {
      field_status: { type: 'date', operator: 'lte', values: ['Open'] },
      field_node_dates_start_value: { type: 'date', operator: 'lte', values: 'now' },
      field_node_dates_end_value: { type: 'date', operator: 'gte', values: 'now' }
    }

    const stateClosedInput = { field_status: { type: 'date', operator: '', values: ['Closed'] } }
    const stateClosedOutput = {
      field_status: { type: 'date', operator: 'lte', values: ['Closed'] },
      field_node_dates_end_value: { type: 'date', operator: 'lte', values: 'now' }
    }

    const stateOngoingInput = { field_status: { type: 'date', operator: '', values: ['Ongoing'] } }
    const stateOngoingOutput = {
      field_status: { type: 'date', operator: '', values: ['Ongoing'] },
      field_node_on_going: { type: 'term', values: 'true' }
    }

    const stateOpeningSoonInput = { field_status: { type: 'date', operator: '', values: ['Opening soon'] } }
    const stateOpeningSoonOutput = {
      field_status: { type: 'date', operator: 'gte', values: ['Opening soon'] },
      field_node_dates_start_value: { type: 'date', operator: 'gte', values: 'now' }
    }

    // Supports empty parameters
    expect(utils.getGrantsFilters()).toEqual(null)
    expect(utils.getGrantsFilters(noStateInput)).toEqual(noStateInput)
    // Get filters for a correct parameter
    expect(utils.getGrantsFilters(stateOpenInput)).toEqual(stateOpenOutput)
    expect(utils.getGrantsFilters(stateClosedInput)).toEqual(stateClosedOutput)
    expect(utils.getGrantsFilters(stateOngoingInput)).toEqual(stateOngoingOutput)
    expect(utils.getGrantsFilters(stateOpeningSoonInput)).toEqual(stateOpeningSoonOutput)
  })
})
