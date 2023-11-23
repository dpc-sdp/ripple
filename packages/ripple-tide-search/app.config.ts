export default defineAppConfig({
  ripple: {
    search: {
      contentTypes: [
        'landing_page',
        'event',
        'grant',
        'news',
        'publication',
        'publication_page'
      ],
      locationDSLTransformFunctions: {
        schoolBuildings: async (location) => {
          return {
            map: {
              filter: null,
              sort: null
            },
            listing: {
              filter: location.postcode
                ? {
                    terms: {
                      field_postcode: [location.postcode]
                    }
                  }
                : null,
              sort: null
            }
          }
        }
      },
      csl: async (location) => {
        console.log('testingfn', location)

        const serviceUrl = `https://services6.arcgis.com/GB33F62SbDxJjwEL/arcgis/rest/services/Vicmap_Admin/FeatureServer`
        const layer = '9'
        const format = 'pgeojson'
        const query = encodeURIComponent(`LGA_NAME='${location.lga_key}'`)
        const url = `${serviceUrl}/${layer}/query/?where=${query}&f=${format}&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometryType=esriGeometryEnvelope`

        const response = await $fetch(url)

        const listingFilter = response?.features[0]?.geometry
          ? {
              geo_shape: {
                location: {
                  shape: response?.features[0]?.geometry,
                  relation: 'within'
                }
              }
            }
          : null

        console.log('listingFilter', listingFilter)

        console.log('response', response)
        // query.bool.filter[0].geo_shape.location.shape.features[0].geometry
        return {
          map: {
            filter: null,
            sort: null
          },
          listing: {
            filter: listingFilter,
            sort: null
          }
        }
      }
    }
  }
})
