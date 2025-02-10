import { get } from 'lodash-es'
import { TideImageField, TideUrlField, TideDocumentField } from '../../types'
import markupTranspiler from './markup-transpiler/index.js'
import { stripMediaBaseUrl } from './stripMediaBaseUrl.js'
import mime from 'mime-types'

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
    drupal_internal__target_id?: number
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

type tidePageSitePartial = {
  field_node_site: [
    {
      drupal_internal__tid: number
    }
  ]
}

export const getMediaPath = (
  field: any,
  path?: string | string[],
  strip: boolean = true
): string => {
  let uri = ''

  if (path) {
    field = get(field, path)
  }

  if (!field?.uri) {
    uri = field?.url
  } else {
    uri = field?.uri?.url || field?.uri
  }

  return strip
    ? stripMediaBaseUrl(uri, process.env.NUXT_PUBLIC_TIDE_BASE_URL as string)
    : uri
}

export const getImageFromField = (
  field: object,
  path: string | string[],
  fallback: any = null
): TideImageField | null => {
  const image = get(field, path)
  return image ? getMediaImage(image) : fallback
}

export const getCardImageFromField = (
  field: object,
  path: string | string[]
): TideImageField | null => {
  const image = get(field, path)
  return image && !Array.isArray(image) ? getCardImage(image) : null
}

export const getMediaImage = (
  fieldMediaImage: RawMediaImage
): TideImageField => {
  const focalPoint = fieldMediaImage.meta?.focal_point
  if (fieldMediaImage.meta?.focal_point) {
    delete fieldMediaImage.meta.focal_point
  }

  // Silence drupal prop
  if (fieldMediaImage.meta?.drupal_internal__target_id) {
    delete fieldMediaImage.meta.drupal_internal__target_id
  }

  return {
    src: getMediaPath(fieldMediaImage),
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
    src: getMediaPath(fieldMediaImage),
    focalPoint,
    alt: data?.alt,
    width: data?.width ? parseInt(data.width) : undefined,
    height: data?.height ? parseInt(data.height) : undefined,
    title: data?.title
  }
}

export const getDocumentFromField = (
  field: drupalField,
  path = 'field_media_file'
): TideDocumentField => {
  const medaFile = get(field, path)

  return {
    id: field.id,
    name: field.name,
    url: medaFile.url,
    extension: mime.extension(medaFile.filemime) || '',
    size: humanizeFilesize(medaFile.filesize)
  }
}

export const getLinkFromField = (
  field: drupalField,
  path?: string | string[]
): TideUrlField | null => {
  const linkField = path ? get(field, path, null) : field

  if (!linkField) {
    return null
  }

  let text = linkField.title || linkField.text || ''
  let url = linkField.url || linkField.origin_url || linkField.uri || ''

  if (url.startsWith('internal:')) {
    url = url.replace(/^internal:/, '')
  }

  return { text, url }
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

export const getBody = (html, customPlugins = []) => {
  const plugins = customPlugins.length > 0 ? customPlugins : undefined
  return markupTranspiler(html, plugins)
}

export const getField = (
  field: {},
  path: string | string[],
  fallback: any = undefined
) => {
  return get(field, path, fallback)
}

export const getBodyFromField = (field, path, fallback = undefined) => {
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
      if (obj.value === 'true') {
        obj.value = true
      }
      if (obj.value === 'false') {
        obj.value = false
      }
      map[obj.key] = obj.value
      return map
    }, {})
  }
}

/**
 * @description returns the site section id from either the passed section ID or the page src sites. Selects the last site as per existing logic.
 */
export const getSiteSectionId = (
  sectionId: string,
  src: tidePageSitePartial
) => {
  if (sectionId) {
    return `${sectionId}`
  }
  if (src.field_node_site && src.field_node_site.length > 0) {
    return `${src.field_node_site.slice(-1)[0].drupal_internal__tid}`
  }
  return null
}

/**
 * @description returns the correct site section from the page sites data
 */
export const getSiteSection = (sectionId: string, src: any) => {
  const siteId = getSiteSectionId(sectionId, src)

  if (!siteId) {
    return null
  }

  // With the correct site/section id, we can now choose the correct site data from 'field_node_site'
  return src.field_node_site?.find((site) => {
    return `${site.drupal_internal__tid}` === siteId
  })
}

/**
 * @description strips line returns i.e. new line from the supplied content, returning a 'single' line
 */
export const getPlainText = (content: string): string => {
  return content?.replace(/(\r\n|\n|\r)/g, '')?.trim()
}

/**
 * @description gets the fields value as plain text
 */
export const getPlainTextFromField = (
  field: {},
  path: string | string[],
  fallback = ''
) => {
  const content = get(field, path, fallback)

  return content ? getPlainText(content) : content
}

/**
 * @description converts supplied string value i.e. 'yes', 'no' into true or false
 */
export const getBoolFromString = (text: string): boolean | null => {
  if (text === 'yes') return true
  if (text === 'no') return false

  return null
}

export default {
  getImageFromField,
  getLinkFromField,
  getAddress,
  getBody,
  getBodyFromField,
  humanizeFilesize,
  getField,
  getMediaPath,
  getDocumentFromField,
  getSiteKeyValues,
  getSiteSection,
  getPlainText,
  getPlainTextFromField,
  getBoolFromString
}
