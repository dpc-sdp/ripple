import cuid from 'cuid'
import mime from 'mime-types'

// Generate a unique id
export const generateId = () => {
  return cuid()
}

// Private helpers
export const mergeIncludes = (includes, includesMergedIn) => {
  if (includesMergedIn) {
    for (const type in includesMergedIn) {
      if (includes[type]) {
        includes[type] = includes[type].concat(includesMergedIn[type])
      } else if (includes[type] === undefined) {
        includes[type] = includesMergedIn[type]
      }
    }
  }
  return includes
}

// Extract api resource url from a full url from API response
// e.g 'http://exmaple.com/api/v1/node/page?site=4...' => 'node/page?site=4...'
export const jsonApiLinkToResource = (jsonApiLink, apiPrefix) => {
  if (typeof jsonApiLink !== 'string') {
    jsonApiLink = jsonApiLink.href
  }
  let url = jsonApiLink.match(`${apiPrefix}(.*)`)
  if (Array.isArray(url) && url[1]) {
    return url[1]
  } else {
    throw new Error(`Tide API give a unexpected next url: ${jsonApiLink}`)
  }
}

// Convert Json API metatag_normalized array to a key value object, so we can access the specific metatag value.
export const metatagConverter = (metatagNormalized) => {
  let metatags = {}
  if (Array.isArray(metatagNormalized) === false) {
    return metatags
  }

  metatagNormalized.forEach(element => {
    switch (element.tag) {
      case 'meta':
        if (element.attributes['http-equiv']) {
          if (element.attributes['http-equiv'] === 'content-language') {
            metatags.lang = element.attributes.content
          }
          // TODO: to respect all Drupal metatags, we need other task.
          // The getPageHeadConfig() function need to be refactored to deal with them dynamically.
        }

        if (element.attributes['name']) {
          metatags[element.attributes.name] = element.attributes.content
        }
        break

      case 'link':
        metatags[element.attributes.rel] = element.attributes.href
        break
    }
  })

  return metatags
}

// Convert a path string to class name
export const pathToClass = (string) => {
  return string.replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '').replace(/[-]/g, '_')
}

export const getMimeType = (mimeType) => {
  return mime.extension(mimeType)
}

export const getFormattedSize = (fileSize) => {
  // https://stackoverflow.com/a/18650828
  if (typeof fileSize === 'string') return fileSize
  if (fileSize === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(fileSize) / Math.log(k))
  return parseFloat((fileSize / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const stringToClass = (str) => {
  return str.toLowerCase().replace(/(&\w+?;)/gim, ' ').replace(/[^a-zA-Z0-9\s]/gim, '').replace(/(^\s+)|(\s+$)/gim, '').replace(/\s+/gm, '-')
}

/**
 * Get a page head config, can be used in store tide/setPageHead.
 * @param {Object} pageHead - Page head config.
 * @param {string} pageHead.langcode - Page langcode.
 * @param {string} pageHead.title - Page title.
 * @param {string} pageHead.description - Page description.
 * @param {string} pageHead.url - Page url.
 * @param {string} pageHead.image - Social sharing image.
 * @param {string} pageHead.imageAlt - Social sharing image alt text.
 * @param {string} pageHead.siteSectionName - Page site section name.
 * @param {string} pageHead.pageType - Page content type.
 * @param {string} pageHead.robotsMeta - Robots meta type.
 * @return {Object} pageHead, can be used in store tide/setPageHead.
 */
export const getPageHeadConfig = ({
  langcode = 'en',
  title,
  description,
  url,
  image,
  imageAlt,
  imageTwitter,
  imageTwitterAlt,
  siteSectionName = '',
  pageType,
  robotsMeta
}) => {
  const head = {
    htmlAttrs: {
      lang: langcode
    },
    title: title,
    meta: [
      { name: 'description', hid: 'description', content: description },
      // Open Graph
      { property: 'og:title', hid: 'og:title', content: title },
      { property: 'og:description', hid: 'og:description', content: description },
      { property: 'og:type', hid: 'og:type', content: 'website' },
      { property: 'og:url', hid: 'og:url', content: url },
      { property: 'og:image', hid: 'og:image', content: image },
      { property: 'og:image:alt', hid: 'og:image:alt', content: imageAlt },
      // Twitter Card
      { name: 'twitter:card', hid: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', hid: 'twitter:site', content: url },
      { name: 'twitter:title', hid: 'twitter:title', content: title },
      { name: 'twitter:description', hid: 'twitter:description', content: description },
      { name: 'twitter:image', hid: 'twitter:image', content: imageTwitter },
      { name: 'twitter:image:alt', hid: 'twitter:image:alt', content: imageTwitterAlt },
      // Custom page meta
      { name: 'sitesection', content: siteSectionName },
      { name: 'content-type', content: pageType && pageType.replace('node--', '') }
    ]
  }
  if (robotsMeta) {
    // Robots meta
    let robotsMetaTag = { name: 'robots', content: robotsMeta }
    head.meta.push(robotsMetaTag)
  }
  return head
}
