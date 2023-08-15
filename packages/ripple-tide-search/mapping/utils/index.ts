export const getSearchListingConfig = (src) =>
  src.hasOwnProperty('field_search_configuration') &&
  JSON.parse(src.field_search_configuration)

export function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()]
}

export const parseJSONField = (rawValue) => {
  return JSON.parse(rawValue)
}
