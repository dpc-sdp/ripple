import { setResponseHeader, getResponseHeaders } from 'h3'

// Merge two section cache tags string and deduplicate tag
// Return a string of merged tags
const mergeTags = (existingTags: string, newTags: string): string => {
  const tags1 = existingTags.split(' ')
  const tags2 = newTags.split(' ')
  const tags = [...new Set([...tags1, ...tags2])]
  return tags.join(' ')
}

export const useMergeSectionTags = (sectionCacheTags: string | null): void => {
  // event will be undefined if the request is on the client side
  const event = useRequestEvent()

  // Section.io cache tags must be set on the response header to invalidate the cache after a change in drupal
  if (event && sectionCacheTags) {
    const currentResponseHeaders = getResponseHeaders(event)

    const currentSectionTags: string =
      currentResponseHeaders && currentResponseHeaders['section-cache-tags']
        ? (currentResponseHeaders['section-cache-tags'] as string)
        : ('' as string)

    setResponseHeader(
      event,
      'section-cache-tags',
      mergeTags(currentSectionTags, sectionCacheTags)
    )
  }
}

export default useMergeSectionTags
