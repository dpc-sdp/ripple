import pkg from './package.json'
import { getDpcPkgs } from '@dpc-sdp/ripple-tide-api/utils'

export default defineAppConfig({
  project: {
    name: pkg.name,
    version: pkg.version,
    sdpVersion: pkg.sdp_version
  },
  ripple: {
    packages: getDpcPkgs({ ...pkg.dependencies, ...pkg.devDependencies }),
    featureFlags: {},
    theme: {
      'rpl-clr-primary': '#6B19A3',
      'rpl-clr-footer-alt': '#6B19A3',
      'rpl-clr-link': '#6B19A3',
      'rpl-clr-type-primary-accessible': '#6B19A3',
      'rpl-clr-primary-alt': '#3F006B',
      'rpl-clr-type-primary-alt-accessible': '#3F006B',
      'rpl-clr-footer': '#3F006B',
      'rpl-clr-type-footer-accessible': '#3F006B',
      'rpl-clr-primary-alpha': 'rgba(107, 25, 163, 0.5)',
      'rpl-clr-accent': '#6DDD97',
      'rpl-clr-accent-alt': '#EAFAF0',
      'rpl-clr-focus': '#9DEF65',
      'rpl-clr-gradient-horizontal':
        'linear-gradient(90deg, #382484 0%, #5A0099 20%, #7623B0 35%, #2E7478 50%, #2FA26F 70%, #2FCE6A 80%)',
      'rpl-clr-gradient-vertical':
        'linear-gradient(180deg, #382484 0%, #5A0099 20%, #7623B0 35%, #2E7478 50%, #2FA26F 70%, #2FCE6A 80%)'
    },
    search: {
      fallbackValues: {
        // `exampleDynamicValue` is used in a cypress test to ensure fallbackValues function are called
        exampleDynamicValue: () => ['blue']
      },
      suggestionsFunctions: {
        exampleSuggestionsFn: async (query, args) => {
          return [
            {
              id: '1',
              name: `Test location - ${args.testArg} - 1`,
              center: [144.9631, -37.8136]
            },
            {
              id: '2',
              name: `Test location - ${args.testArg} - 2`,
              center: [-33.8688, 151.2093]
            },
            {
              id: '3',
              name: `With magic key`,
              arcGISMagicKey: 'fake1234'
            }
          ]
        }
      },
      filterFunctions: {
        // `exampleFunctionFilter` is used in a cypress test to check that the correct parameters are passed to custom filter functions
        exampleFunctionFilter: (filterConfig, values) => {
          return {
            providedFilterConfig: filterConfig,
            providedValues: values
          }
        }
      },
      transformResultFns: {
        exampleResultTransformFn: (result) => {
          return {
            ...result._source,
            distance: result.sort[0]
          }
        }
      },
      sortFunctions: {
        exampleDistanceSort: (location) => {
          if (!location?.center) {
            return {
              'title.keyword': 'asc'
            }
          }

          return {
            _geo_distance: {
              field_geolocation_latlon: {
                lat: location.center[1],
                lon: location.center[0]
              },
              order: 'asc',
              unit: 'km',
              mode: 'min',
              distance_type: 'arc',
              ignore_unmapped: true
            }
          }
        }
      },
      queryConfigFunctions: {
        exampleQueryFunction: ({ searchTerm, queryFilters }) => {
          if (!searchTerm?.q) {
            return {
              bool: {
                must: [{ match_all: {} }],
                filter: queryFilters
              }
            }
          }

          const fieldMap = {
            title: ['title'],
            content: ['field_paragraph_body'],
            title_content: ['title', 'field_paragraph_body']
          }

          const filterType: keyof typeof fieldMap | undefined =
            searchTerm?.queryType

          const filter = filterType ?? 'title_content'

          return {
            bool: {
              should: {
                multi_match: {
                  query: searchTerm?.q,
                  fields: fieldMap[filter]
                }
              },
              filter: queryFilters
            }
          }
        }
      },
      locationDSLTransformFunctions: {
        // DSL transform example for VSBA map tests
        exampleDSLTransformFunction: async (location) => {
          return {
            map: {
              filter: null,
              sort: null
            },
            listing: {
              filter: location?.name
                ? {
                    terms: {
                      [`field_suburb.keyword`]: [location.name]
                    }
                  }
                : null,
              sort: null
            }
          }
        }
      },
      mapPinStyleFn: {
        exampleMapPinStyle: (feature: any) => {
          return feature.test_pin_color ? feature.test_pin_color : 'black'
        },
        examplePinIcons: (feature: any) => {
          const projectType =
            feature && feature['field_mappintype_name']
              ? feature['field_mappintype_name'][0]
              : ''
          switch (projectType) {
            case 'New school':
              return '#8A2A2B'
            case 'School upgrade':
              return '#df4809'
            case 'Planning project':
              return '#FF9E1B'
            case 'Early childhood':
              return '#87189D'
            case 'Tech school':
              return '#00B2A9'
            case 'Non-government grant':
              return '#71C5E8'
            default:
              return '#333333'
          }
        }
      },
      mapResultHooks: {
        exampleMapResultsHook: (map, results) => {
          if (!map || !results) return

          centerMap(
            map,
            [15809362.126037747, -4543542.166789566],
            8,
            {},
            'popover'
          )
        }
      }
    },
    form: {
      utils: {
        exampleCurrentTimestamp: () =>
          import.meta.client ? new Date().getTime() : ''
      }
    }
  }
})
