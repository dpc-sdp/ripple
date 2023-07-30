import { computed } from 'vue'
import { getSearchResultValue } from '#imports'

export default (result) => {
  const title = computed(() => getSearchResultValue(result, 'title'))
  const url = computed(() => {
    const externalURL = getSearchResultValue(result, 'field_node_link')

    if (externalURL) {
      return externalURL
    }

    return getSearchResultValue(result, 'url').replace(/\/site-(\d+)/, '')
  })
  const updated = computed(() => {
    const rawDate = getSearchResultValue(result, 'changed')

    if (!rawDate) {
      return ''
    }

    const date = new Date(rawDate)
    return Intl.DateTimeFormat('en-AU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Australia/Melbourne'
    }).format(date)
  })

  return {
    title,
    url,
    updated
  }
}
