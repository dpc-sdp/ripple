import { get } from 'lodash-es'
import { TideImageField, TideUrlField } from '../../types'
import markupTranspiler from './markup-transpiler/index.js'
import normaliseImageUrl from './normaliseImageUrl.js'

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

type tidePageSitePartial = {
  field_node_site: [
    {
      drupal_internal__tid: number
    }
  ]
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
  return image && !Array.isArray(image) ? getCardImage(image) : null
}

export const getMediaImage = (
  fieldMediaImage: RawMediaImage
): TideImageField => {
  const focalPoint = fieldMediaImage.meta?.focal_point
  if (fieldMediaImage.meta?.focal_point) {
    delete fieldMediaImage.meta.focal_point
  }
  return {
    src: normaliseImageUrl(
      process.env.NUXT_PUBLIC_TIDE_BASE_URL as string,
      fieldMediaImage.url
    ),
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
    src: normaliseImageUrl(
      process.env.NUXT_PUBLIC_TIDE_BASE_URL as string,
      fieldMediaImage.url
    ),
    focalPoint,
    alt: data?.alt,
    width: data?.width ? parseInt(data.width) : undefined,
    height: data?.height ? parseInt(data.height) : undefined,
    title: data?.title
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

  return {
    text: linkField.title || linkField.text || '',
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

export const getBody = (html, customPlugins = []) => {
  const plugins = customPlugins.length > 0 ? customPlugins : undefined
  return markupTranspiler(html, plugins)
}

export const getField = (field, path, fallback = undefined) => {
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

export default {
  getImageFromField,
  getLinkFromField,
  getAddress,
  getBody,
  getBodyFromField,
  humanizeFilesize,
  getField,
  getSiteKeyValues,
  getSiteSection
}
