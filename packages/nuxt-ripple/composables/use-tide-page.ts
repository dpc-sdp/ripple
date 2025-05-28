import type { TidePageBase } from './../types'
import {
  useCookie,
  isPreviewPath,
  AuthCookieNames,
  useSectionId
} from '#imports'

const isCacheTimeExpired = (date: number, expiryInMinutes = 5) => {
  // 5 minute default expiry in step with varnish cache
  const expiry = expiryInMinutes * 1000 * 60
  const timePlusExpiry = Date.now() - expiry
  return date < timePlusExpiry
}

const checkForRedirect = async (page: TidePageBase, nuxt) => {
  // Redirect on the 6 codes that Drupal supplies
  if (page?.type === 'redirect') {
    switch (page.status_code) {
      case '301':
      case '302':
      case '303':
      case '304':
      case '305':
      case '307':
        await nuxt.runWithContext(() =>
          navigateTo(page.redirect_url, {
            replace: true,
            redirectCode: page.status_code,
            external: page.redirect_type === 'external'
          })
        )
        break
      default:
    }
  }
}

export const useTidePage = async (slug?: string): Promise<TidePageBase> => {
  const route = useRoute()

  const path = slug || route.path
  const { public: config } = useRuntimeConfig()

  const sectionRequestId = useSectionId()

  // check we dont add too many keys to cache
  const nuxt = useNuxtApp()
  const maxCacheItems = 50
  if (nuxt.payload.data) {
    if (Object.keys(nuxt.payload.data).length > maxCacheItems + 1) {
      clearNuxtData()
    }
  }

  const { data: pageData } = useNuxtData(`page-${path}`)

  // Refresh data so it doesnt go stale whilst client side nav
  if (pageData.value && pageData.value._fetched) {
    if (isCacheTimeExpired(pageData.value._fetched)) {
      await clearNuxtData(`page-${path}`)
    }
  }

  const headers: {
    cookie?: string
    'x-section-request-id'?: string
  } = {}

  // Need to manually pass the cookies needed for auth as they aren't automatically added when server rendered
  if (isPreviewPath(path)) {
    const accessTokenCookie = useCookie(AuthCookieNames.ACCESS_TOKEN)
    const accessTokenExpiryCookie = useCookie(
      AuthCookieNames.ACCESS_TOKEN_EXPIRY
    )
    headers.cookie = `${AuthCookieNames.ACCESS_TOKEN}=${accessTokenCookie.value};${AuthCookieNames.ACCESS_TOKEN_EXPIRY}=${accessTokenExpiryCookie.value}`
  }

  if (process.server) {
    headers['x-section-request-id'] = sectionRequestId
  }

  let sectionCacheTags: string | null = null

  if (!pageData.value) {
    const { data, error } = await useFetch('/api/tide/page', {
      key: `page-${path}`,
      baseURL: config.apiUrl || '',
      params: { path },
      headers,
      async onResponse({ response }) {
        sectionCacheTags = response.headers.get('section-cache-tags')

        if (!process.server && response.ok && response._data) {
          response._data['_fetched'] = Date.now()
        }
      }
    })

    // Section.io cache tags must be set on the response header to invalidate the cache after a change in drupal
    if (sectionCacheTags) {
      nuxt.runWithContext(() => useMergeSectionTags(sectionCacheTags))
    }

    if (error && error.value?.statusCode) {
      useTideError(error.value?.statusCode, error.value)
    }

    await checkForRedirect(data.value, nuxt)

    return data.value
  }

  await checkForRedirect(pageData.value, nuxt)

  return pageData.value
}

export default useTidePage
