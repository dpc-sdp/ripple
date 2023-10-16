import type { TideSiteData } from './../types'

export const useTideSite = async (id?: number): Promise<TideSiteData> => {
  const { public: config } = useRuntimeConfig()
  const siteId = id || config.tide?.site
  const { data: siteData } = useNuxtData(`site-${siteId}`)

  let sectionCacheTags

  if (!siteData.value) {
    const { data, error } = await useFetch('/api/tide/site', {
      key: `site-${siteId}`,
      baseURL: config.apiUrl || '',
      params: {
        id: siteId
      },
      async onResponse({ response }) {
        sectionCacheTags = response.headers.get('section-cache-tags')
      }
    })
    if (error && error.value?.statusCode) {
      console.log(error)
      console.log('API error fetching site data')
      useTideError(500)
    }

    // Section.io cache tags must be set on the response header to invalidate the cache after a change in drupal
    if (sectionCacheTags) {
      useMergeSectionTags(sectionCacheTags)
    }

    return data.value
  }

  // Intercept social links, replace icon-twitter with icon-x
  return Object.fromEntries(
    Object.entries(siteData.value).map(([k, v]) => [
      k,
      k !== 'socialLinks'
        ? v
        : siteData.value[k].map((link: any) =>
            link.icon === 'icon-twitter' ? { ...link, icon: 'icon-x' } : link
          )
    ])
  ) as any
}

export default useTideSite
