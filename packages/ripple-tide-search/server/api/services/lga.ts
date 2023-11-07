import { defineEventHandler, H3Event } from 'h3'
// @ts-ignore
import { createHandler } from '@dpc-sdp/ripple-tide-api'

interface addressQuery {
  q?: string
}

export function getLGAGeometry(query) {
  const baseUrl = `https://services6.arcgis.com/GB33F62SbDxJjwEL/arcgis/rest/services/Vicmap_Admin/FeatureServer/9/query`
  const params = {
    where: `LGA_NAME='${query}'`,
    geometryType: 'esriGeometryPolygon',
    inSR: '4326',
    spatialRel: 'esriSpatialRelWithin',
    resultType: 'none',
    distance: '0.0',
    units: 'esriSRUnit_Meter',
    outFields: 'lga_name',
    returnGeodetic: 'false',
    returnGeometry: 'true',
    returnCentroid: 'true',
    featureEncoding: 'esriDefault',
    multipatchOption: 'xyFootprint',
    returnExceededLimitFeatures: 'true',
    sqlFormat: 'none',
    f: 'json'
  }
  return $fetch(baseUrl, { params })
}

export const createLGAHandler = (event: H3Event) => {
  return createHandler(event, 'LGAGeometryHandler', async () => {
    const queryObj: addressQuery = await getQuery(event)
    const query = queryObj.q
    const LGAdata = await getLGAGeometry(query)
    return LGAdata
  })
}

export default defineEventHandler((event: H3Event) => {
  return createLGAHandler(event)
})
