import get from 'lodash.get'
import markupTranspiler from './markup-transpiler/index'

export type mediaImage = {
  src: string
  alt: string
  focalPoint?: {
    x: string
    y: string
  }
}

export type drupalField = Record<string, any>

export type fieldMediaImage = {
  url: string
  meta: {
    alt: string
    focal_point?: {
      x: string
      y: string
    }
  }
}

export const formatDate = (date, format) => {
  // Example output: 26 January 2022 01:30 pm - 26 January 2022 08:45 pm
  //   format = format === undefined ? 'DD MMMM' : format
  //   dayjs.locale('en-au')
  //   return dayjs(date).format(format)
  return date
}

export const getImageFromField = (field: object, path: string): mediaImage => {
  let getPath
  if (Array.isArray(path)) {
    getPath = [...path, 'field_media_image']
  } else if (typeof path === 'string') {
    getPath = `${path}.field_media_image`
  }
  const image = get(field, getPath)
  return getMediaImage(image)
}

export const removeDomainFromPath = (path: string) =>
  typeof path === 'string' && path.length > 0
    ? path.replace(/^.*(?=(\/sites\/default\/files))/, '')
    : path

export const getMediaImage = (fieldMediaImage: fieldMediaImage): mediaImage => {
  const focalPoint = fieldMediaImage.meta.focal_point
  delete fieldMediaImage.meta.focal_point
  // Replace BE domain for images as they will be proxied through FE
  return {
    src: fieldMediaImage.url ? removeDomainFromPath(fieldMediaImage.url) : '',
    ...fieldMediaImage.meta,
    focalPoint
  }
}

export const getLinkFromField = (
  field: drupalField,
  path: string | string[] | unknown
) => {
  let url, text
  if (Array.isArray(path)) {
    text = get(field, [...path, 'title'], false)
    url = get(
      field,
      [...path, 'url'],
      get(field, [...path, 'origin_url'], get(field, [...path, 'uri'])),
      false
    )
  } else if (typeof path === 'string') {
    text = get(field, `${path}.title`, false)
    url = get(
      field,
      `${path}.url`,
      get(field, `${path}.origin_url`, get(field, `${path}.uri`)),
      false
    )
  } else {
    text = get(field, 'title', false)
    url = get(field, 'url', get(field, 'origin_url', get(field, 'uri')))
  }
  return { text: url && text === '' ? url : text, url }
}

export const getAddress = (field: drupalField) => {
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
  const mappedComponents: Record<string, any>[] = []
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

export const humanizeFilesize = (fileSize) => {
  if (fileSize != null) {
    // https://stackoverflow.com/a/18650828
    if (typeof fileSize === 'string') return fileSize
    if (fileSize === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(fileSize) / Math.log(k))
    return parseFloat((fileSize / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  return ''
}

export default {
  getImageFromField,
  getLinkFromField,
  getAddress,
  getLandingPageComponents,
  getBody,
  getBodyFromField,
  humanizeFilesize,
  getField
}
