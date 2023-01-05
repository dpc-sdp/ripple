import { get } from 'lodash-es'
import { TideImageField, TideUrlField } from '../../types'
import markupTranspiler from './markup-transpiler/index.js'

export type drupalField = Record<string, any>

interface RawMediaImage {
  url: string
  meta: {
    alt: string
    title: string
    width: number
    height: number
    focal_point?: {
      x: string
      y: string
    }
  }
}

interface RawCardImageData {
  alt: string
  title: string
  width: string
  height: string
}

interface RawCardImage {
  url: string
  meta: {
    focal_point?: {
      x: string
      y: string
    }
  }
  data: RawCardImageData[]
}

export const formatDate = (value, options = {}) => {
  const date = new Date(value)
  const defaultOptions = { dateStyle: 'full' }

  options = {
    ...defaultOptions,
    ...options
  }

  return new Intl.DateTimeFormat('en-AU', options).format(date)
}

/**
 * @deprecated Need to make a decision on whether we proxy images or use direct url
 */
export const removeDomainFromPath = (path: string) =>
  typeof path === 'string' && path.length > 0
    ? path.replace(/^.*(?=(\/sites\/default\/files))/, '')
    : path

export const getImageFromField = (
  field: object,
  path: string | string[]
): TideImageField | null => {
  const image = get(field, path)
  return image ? getMediaImage(image) : null
}

export const getCardImageFromField = (
  field: object,
  path: string | string[]
): TideImageField | null => {
  const image = get(field, path)
  return image ? getCardImage(image) : null
}

export const getMediaImage = (
  fieldMediaImage: RawMediaImage
): TideImageField => {
  const focalPoint = fieldMediaImage.meta?.focal_point
  if (fieldMediaImage.meta?.focal_point) {
    delete fieldMediaImage.meta.focal_point
  }
  return {
    src: fieldMediaImage.url,
    ...fieldMediaImage.meta,
    focalPoint
  }
}

export const getCardImage = (fieldMediaImage: RawCardImage): TideImageField => {
  const focalPoint = fieldMediaImage.meta?.focal_point
  if (fieldMediaImage.meta?.focal_point) {
    delete fieldMediaImage.meta.focal_point
  }

  const data: RawCardImageData | null = fieldMediaImage.data?.length
    ? fieldMediaImage.data[0]
    : null

  return {
    src: fieldMediaImage.url,
    focalPoint,
    alt: data?.alt,
    width: data?.width ? parseInt(data.width) : undefined,
    height: data?.height ? parseInt(data.height) : undefined,
    title: data?.title
  }
}

// export const getLinkFromField = (
//   field: drupalField,
//   path: string | string[] | unknown
// ) => {
//   let url, text
//   if (Array.isArray(path)) {
//     text = get(field, [...path, 'title'], false)
//     url = get(
//       field,
//       [...path, 'url'],
//       get(field, [...path, 'origin_url'], get(field, [...path, 'uri'])),
//       false
//     )
//   } else if (typeof path === 'string') {
//     text = get(field, `${path}.title`, false)
//     url = get(
//       field,
//       `${path}.url`,
//       get(field, `${path}.origin_url`, get(field, `${path}.uri`)),
//       false
//     )
//   } else {
//     text = get(field, 'title', false)
//     url = get(field, 'url', get(field, 'origin_url', get(field, 'uri')))
//   }
//   return { text: url && text === '' ? url : text, url }
// }

export const getLinkFromField = (
  field: drupalField,
  path?: string | string[]
): TideUrlField | null => {
  const linkField = path ? get(field, path, null) : field

  if (!linkField) {
    return null
  }

  return {
    text: linkField.title || '',
    url: linkField.url || linkField.origin_url || linkField.uri || ''
  }
}

export const getAddress = (field: drupalField) => {
  // Example output: Flagstaff Gardens, Melbourne, VIC 3000
  // Deliberate choice to not use template literals here to increase readability
  const line1 = field.address_line1 ? field.address_line1 + ', ' : ''
  const line2 = field.address_line2 ? field.address_line2 + ', ' : ''
  const suburb = field.locality + (line2 || field.locality ? ', ' : '')
  const stateAndPostcode = field.administrative_area + ' ' + field.postal_code
  const address = line1 + line2 + suburb + stateAndPostcode

  return address.length > 3 ? address : ''
}

export const getDynamicPageComponents = async (
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
            pageData,
            tideApi
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

export const getField = (field, path, fallback = '') => {
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

export const getSiteKeyValues = (key: string, src: any) => {
  if (src[key]) {
    return src[key].reduce((map, obj) => {
      map[obj.key] = obj.value
      return map
    }, {})
  }
}

export default {
  getImageFromField,
  getLinkFromField,
  getAddress,
  getDynamicPageComponents,
  getBody,
  getBodyFromField,
  humanizeFilesize,
  getField,
  formatDate,
  getSiteKeyValues
}
