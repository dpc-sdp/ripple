import { computed } from 'vue'
import { getSearchResultValue, truncateText } from '#imports'

interface ResultOptions {
  summaryMaxLength: number | null
}

export default (result, options: ResultOptions = { summaryMaxLength: 150 }) => {
  const { $app_origin } = useNuxtApp()
  const title = computed(() => getSearchResultValue(result, 'title'))
  const url = computed(() => {
    return stripSiteId(getSearchResultValue(result, 'url'), $app_origin || '')
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

  const summary = computed(() => {
    const summary = getSearchResultValue(result, 'field_landing_page_summary')
    const body = getSearchResultValue(result, 'body')
    const fullSummaryText = summary || body

    if (!fullSummaryText) {
      return ''
    }

    return options?.summaryMaxLength
      ? truncateText(fullSummaryText, options.summaryMaxLength)
      : fullSummaryText
  })

  const image = computed(() => {
    const src = getSearchResultValue(result, 'field_media_image_absolute_path')

    if (src) {
      return {
        src,
        alt: ''
      }
    }

    return null
  })

  return {
    title,
    url,
    updated,
    summary,
    image
  }
}
