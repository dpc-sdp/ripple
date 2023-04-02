import type { TidePageBase } from './../types'

const isCacheTimeExpired = (date: number, expiryInMinutes = 5) => {
  // 5 minute default expiry in step with varnish cache
  const expiry = expiryInMinutes * 1000 * 60
  const timePlusExpiry = Date.now() - expiry
  return date < timePlusExpiry
}

export const useTidePage = async (
  slug?: string,
  site?: number
): Promise<TidePageBase> => {
  const route = useRoute()
  const path = slug || route.path
  const { public: config } = useRuntimeConfig()
  const siteId = site || config.tide?.site

  // check we dont add too many keys to cache
  const nuxt = useNuxtApp()
  const maxCacheItems = 50
  if (nuxt.payload.data) {
    if (Object.keys(nuxt.payload.data).length > maxCacheItems + 1) {
      if (process.dev) {
        console.log('clear nuxt cache')
      }
      clearNuxtData()
    }
  }

  const { data: pageData } = useNuxtData(`page-${path}`)

  // Refresh data so it doesnt go stale whilst client side nav
  if (pageData.value && pageData.value._fetched) {
    if (isCacheTimeExpired(pageData.value._fetched)) {
      if (process.dev) {
        console.log('Cache reset for page', `page-${path}`)
      }
      await clearNuxtData(`page-${path}`)
    }
  }

  if (!pageData.value) {
    const { data, error } = await useFetch('/api/tide/page', {
      key: `page-${path}`,
      baseURL: config.API_URL || '',
      params: {
        path,
        site: siteId
      },
      async onResponse({ response }) {
        if (response.ok && response._data) {
          response._data['_fetched'] = Date.now()
        }
      }
    })
    if (error && error.value?.statusCode) {
      useTideError(error.value?.statusCode)
    }
    return data.value
  }

  return pageData.value
}

export default useTidePage
