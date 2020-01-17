// Expose the cache tags that Tide API responds with so that we can create a holistic caching strategy per application.
// Section allows us to create CIDs based on the cache tags header; Drupal will trigger cache clears when content is updated. 
// Expose the same cache tags from Ripple a cache ban from Drupal will also invalidate the Ripple page allowing us to increase the TTL in Section and benefit from long living caches.
import { logger } from '@dpc-sdp/ripple-nuxt-tide/lib/core'
import { RPL_HEADER } from '@dpc-sdp/ripple-nuxt-tide/lib/config/constants'

// Default api content request patterns
const defaultCachePurgePatterns = [
  // Content page
  '/api/v.*/node.*',
  // Video page
  '/api/v.*/media/embedded_video.*',
  // Tops and tags page
  '/api/v.*/taxonomy_term/topic.*',
  '/api/v.*/taxonomy_term/tag.*',
  // Other combined tags
  '/api/v.*/menu_link_content/menu_link_content.*',
  '/api/v.*/taxonomy_term/sites?.*alert.*'
]

// Merge two section cache tags string and deduplicate tag
// Return a string of merged tags
const mergeTags = (existingTags, newTags) => {
  const tags1 = existingTags.split(' ')
  const tags2 = newTags.split(' ')
  const tags = [...new Set([...tags1, ...tags2])]
  return tags.join(' ')
}

export default function ({ $axios, app, res }) {
  const options = <%= serialize(options) %>

  // Merge custom cache purge configs
  const cachePurgePatterns = [...defaultCachePurgePatterns, ...options.cachePurgePattern]
  const reqRegexStr = '^(?:' + cachePurgePatterns.join('|') + ')$'
  const contentReqRegex = new RegExp(reqRegexStr)

  $axios.onResponse(response => {
    const reqPath = response.request.path

    try {
      // We pass the content section cache tag to Nuxt SSR response.
      if (res && reqPath !== undefined && reqPath.match(contentReqRegex)) {

        if (response.headers[RPL_HEADER.CACHE_TAGS] !== undefined) {
          const newTags = response.headers[RPL_HEADER.CACHE_TAGS]
          const existingHeaders = res.getHeaders()
          const tags = existingHeaders[RPL_HEADER.CACHE_TAGS] ? mergeTags(existingHeaders[RPL_HEADER.CACHE_TAGS], newTags) : newTags
          res.setHeader(RPL_HEADER.CACHE_TAGS, tags)
        }

      }
    } catch (error) {
      logger.warn('Failed to add cache tags %O', error, { label: 'Cache Purge' })
    }
  })
}
