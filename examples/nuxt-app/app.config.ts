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
    featureFlags: {
      contentCollectionSearchConnector: 'elasticsearch'
    },
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
        // `dynamicValue` is used in a cypress test to ensure fallbackValues function are called
        dynamicValue: () => ['blue']
      },
      filterFunctions: {
        // `dummyFunctionFilter` is used in a cypress test to check that the correct parameters are passed to custom filter functions
        dummyFunctionFilter: (filterConfig, values) => {
          return {
            providedFilterConfig: filterConfig,
            providedValues: values
          }
        }
      },
      mapPinStyleFn: {
        vsbaPinIcons: (feature) => {
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
      mapResultsMappingFn: {
        vsba: (result) => {
          const hasLocation = get(result, props.mapConfig.props.latObjPath)
          if (hasLocation && props.mapConfig && result._source) {
            return {
              ...result._source,
              lat: parseFloat(get(result, props.mapConfig.props.latObjPath)),
              lng: parseFloat(get(result, props.mapConfig.props.lngObjPath)),
              id: result._id
            }
          } else {
            return {
              ...result._source,
              isArea: true,
              id: result._id
            }
          }
        }
      }
    }
  }
})
