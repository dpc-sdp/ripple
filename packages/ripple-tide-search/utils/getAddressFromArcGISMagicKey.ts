import { addressResultType } from '../types'
import { capitalCase } from 'change-case'

export default async (arcGISMagicKey: string): addressResultType => {
  const geocodeServerUrl =
    'https://corp-geo.mapshare.vic.gov.au/arcgis/rest/services/Geocoder/VMAddressEZIAdd/GeocodeServer'
  const res = await $fetch(`${geocodeServerUrl}/findAddressCandidates`, {
    params: {
      magicKey: arcGISMagicKey,
      f: 'json'
    }
  })
  const arcGISCandidate = res.candidates[0]

  return {
    id: arcGISMagicKey.slice(-12),
    name: capitalCase(arcGISCandidate.address),
    center: [arcGISCandidate.location.x, arcGISCandidate.location.y]
  }
}
