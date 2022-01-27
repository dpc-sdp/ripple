import get from 'lodash.get'
import markupTranspiler from './markup-transpiler/index'

export const getImageFromField = (field, path) => {
  let getPath
  if (Array.isArray(path)) {
    getPath = [...path, 'field_media_image']
  } else if (typeof path === 'string') {
    getPath = `${path}.field_media_image`
  }
  const image = get(field, getPath)
  if (image) {
    return getMediaImage(image)
  }
}

export const removeDomainFromPath = path =>
  typeof path === 'string' && path.length > 0
    ? path.replace(/^.*(?=(\/sites\/default\/files))/, '')
    : path

export const getMediaImage = fieldMediaImage => {
  if (fieldMediaImage) {
    const focalPoint = fieldMediaImage.meta.focal_point
    delete fieldMediaImage.meta.focal_point
    // Replace BE domain for images as they will be proxied through FE
    return {
      src: fieldMediaImage.url ? removeDomainFromPath(fieldMediaImage.url) : '',
      ...fieldMediaImage.meta,
      focalPoint
    }
  }
}

export const getLinkFromField = (field, path) => {
  let url, text
  if (Array.isArray(path)) {
    text = get(field, [...path, 'title'], false)
    url = get(field, [...path, 'url'], get(field, [...path, 'uri']), false)
  } else if (typeof path === 'string') {
    text = get(field, `${path}.title`, false)
    url = get(field, `${path}.url`, get(field, `${path}.uri`), false)
  } else {
    text = get(field, 'title', false)
    url = get(field, 'url', get(field, 'uri'))
  }
  return { text: url && text === '' ? url : text, url }
}

export const getAddress = (field) => {
  // Example output: Flagstaff Gardens, Melbourne, VIC 3000
  // Deliberate choice to not use template literals here to increase readability
  const line1 = field.address_line1 ? field.address_line1 + ', ' : ''
  const line2 = field.address_line2
  const suburb = field.locality + (line2 || field.locality ? ', ' : '')
  const stateAndPostcode = field.administrative_area + ' ' + field.postal_code
  const address = line1 + line2 + suburb + stateAndPostcode

  return address.length > 3 ? address : ''
}

export const getLandingPageComponents = async (
  pageData,
  componentFieldPath,
  componentMapping,
  tideApi
) => {
  const componentFields = pageData[componentFieldPath]
  const mappedComponents = []
  if (componentFields && Array.isArray(componentFields)) {
    for (let i = 0; i < componentFields.length; i++) {
      const cmpData = componentFields[i]
      if (componentMapping.hasOwnProperty(cmpData.type)) {
        const componentMappingFunction = componentMapping[cmpData.type]
        if (componentMappingFunction.constructor.name === 'AsyncFunction') {
          const data = await componentMappingFunction.apply(tideApi, [
            cmpData,
            pageData
          ])
          mappedComponents.push({
            uuid: cmpData.uuid || cmpData.id,
            ...data
          })
        } else if (typeof componentMappingFunction === 'function') {
          const data = componentMappingFunction.apply(tideApi, [
            cmpData,
            pageData
          ])
          mappedComponents.push({
            uuid: cmpData.uuid || cmpData.id,
            ...data
          })
        }
      }
    }
    return mappedComponents
  }
}

export const getBody = (html, customPlugins = []) => {
  const plugins = customPlugins.length > 0 ? customPlugins : undefined
  return markupTranspiler(html, plugins)
}

export const getField = (field, path, fallback) => {
  return get(field, path, fallback)
}

export const getBodyFromField = (field, path, fallback) => {
  return getBody(getField(field, [path, 'processed'], fallback))
}

export default {
  getImageFromField,
  getLinkFromField,
  getAddress,
  getLandingPageComponents,
  getBody,
  getBodyFromField,
  getField
}
