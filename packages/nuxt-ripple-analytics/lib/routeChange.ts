import { IRplAnalyticsEventPayload, trackEvent } from './tracker'
import { getBreadcrumbs } from '#imports'

const trimValue = (value: any) =>
  typeof value === 'string' ? value.trim() : value

const padTime = (value: number) => value.toString().padStart(2, '0')

export default function ({ route, site, page }) {
  const payload: IRplAnalyticsEventPayload = {
    event: 'page_view',
    name: page?.title,
    page_url: route.fullPath,
    content_type: page?.type,
    search_term: trimValue(route.query?.q),
    site_section: page?.siteSection?.name,
    image_count: document.querySelectorAll('#rpl-main img').length,
    content_section_count: document.querySelectorAll(
      '#rpl-main .rpl-page-component'
    ).length,
    platform_event: 'routeView'
  }

  const pageBreadcrumbs = page?.breadcrumbs
    ? page?.breadcrumbs
    : getBreadcrumbs(route.fullPath, page?.title, site?.menus?.menuMain)

  if (Array.isArray(pageBreadcrumbs)) {
    payload.breadcrumbs = pageBreadcrumbs
      .filter((crumb) => crumb?.url !== '/')
      .map((crumb) => crumb.text)
  }

  payload.word_count =
    document.querySelector('#rpl-main')?.textContent?.match(/\w+/g).length || 0

  // Reading time is based on 300 words per minute
  const readTime = new Date((payload.word_count / 300) * 60 * 1000)
  payload.avg_read_time = `${padTime(readTime.getUTCHours())}:${padTime(
    readTime.getUTCMinutes()
  )}:${padTime(readTime.getUTCSeconds())}`

  trackEvent(payload)
}
