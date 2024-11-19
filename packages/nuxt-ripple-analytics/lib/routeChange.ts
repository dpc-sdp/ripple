import { IRplAnalyticsEventPayload } from './tracker'
import { getBreadcrumbs } from '#imports'

const trimValue = (value: any) =>
  typeof value === 'string' ? value.trim() : value

const mapTags = (items: { text: string }[]) => {
  return (items || []).map((item) => item?.text)
}

export default function ({ route, site, page }): IRplAnalyticsEventPayload {
  const payload: IRplAnalyticsEventPayload = {
    event: 'routeChange',
    page_title: page?.title,
    page_url: route.fullPath,
    content_type: page?.type,
    content_status: page?.status,
    content_topic: page?.topic?.text,
    content_tags: mapTags(page?.tags),
    publication_name: page?.publication?.text,
    search_term: trimValue(route.query?.q),
    site_section: page?.siteSection?.name,
    status_code: page?.statusCode || 200,
    platform_event: 'page/routeChange'
  }

  const pageBreadcrumbs = page?.breadcrumbs
    ? page?.breadcrumbs
    : getBreadcrumbs(route.path, page?.title, site?.menus?.menuMain)

  if (Array.isArray(pageBreadcrumbs)) {
    payload.breadcrumbs = pageBreadcrumbs
      .filter((crumb) => crumb?.url !== '/')
      .map((crumb) => crumb.text)
  }

  return payload
}
