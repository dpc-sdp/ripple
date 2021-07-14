import tideSearch from '../../modules/search/lib/search/module.js'

describe('search filters', () => {
  test('should set filters from various input types', async () => {
    // Based on this query...
    const mockRouter = {
      currentRoute: {
        query: {
          q: 'test',
          filters: {
            field_filter_string_to_string: 'Set Filter A',
            field_filter_string_to_array: 'Set Filter A',
            field_filter_array_to_array: ['Set Filter A', 'Set Filter B'],
            field_filter_object_string_to_string: { values: 'Set Filter A' },
            field_filter_object_string_to_array: { values: 'Set Filter A' },
            field_filter_object_array_to_array: { values: ['Set Filter A', 'Set Filter B'] }
          }
        }
      }
    }
    // ...this form model...
    const mockFormData = {
      filterForm: {
        model: {
          field_filter_string_to_string: '',
          field_filter_string_to_array: [],
          field_filter_array_to_array: [],
          field_filter_object_string_to_string: '',
          field_filter_object_string_to_array: [],
          field_filter_object_array_to_array: []
        }
      }
    }
    // ...will set these filters.
    const expectedFormChanges = {
      filterForm: {
        model: {
          field_filter_string_to_string: 'Set Filter A',
          field_filter_string_to_array: ['Set Filter A'],
          field_filter_array_to_array: ['Set Filter A', 'Set Filter B'],
          field_filter_object_string_to_string: 'Set Filter A',
          field_filter_object_string_to_array: ['Set Filter A'],
          field_filter_object_array_to_array: ['Set Filter A', 'Set Filter B']
        }
      },
      prefillSearchTerm: 'test'
    }
    // Set form model data based on query.
    const search = tideSearch({}, mockRouter, {})
    search.setFiltersOnCreate(mockFormData)
    // Test filter changes.
    expect(mockFormData).toEqual(expectedFormChanges)
  })
})
