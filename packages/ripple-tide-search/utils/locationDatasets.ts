export const lgaDataIndex = 'sdp_data_pipelines_sdp_lga_data'
export const localityDataIndex = 'sdp_data_pipelines_sdp_localities_data'

export const standardiseLocationIndexName = (name: string) => {
  // Incase the JSON blob still points to an old app search engine, map it to the correct index.
  switch (name) {
    case 'vic-postcode-localities':
    case 'vicpol-postcode-localities':
      return localityDataIndex
    case 'budget-map-data':
    case 'budget-areas-data':
      return lgaDataIndex
    default:
      return name
  }
}
