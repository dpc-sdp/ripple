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
  return getBody(getField(field, path, fallback))
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
  getLandingPageComponents,
  getBody,
  getBodyFromField,
  humanizeFilesize,
  getField
}
