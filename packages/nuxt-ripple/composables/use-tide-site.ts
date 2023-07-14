import type { TideSiteData } from './../types'

export const useTideSite = async (id?: number): Promise<TideSiteData> => {
  const { public: config } = useRuntimeConfig()
  const siteId = id || config.tide?.site
  const { data: siteData } = useNuxtData(`site-${siteId}`)
  if (!siteData.value) {
    const { data, error } = await useFetch('/api/tide/site', {
      key: `site-${siteId}`,
      baseURL: config.apiUrl || '',
      params: {
        id: siteId
      }
    })
    if (error && error.value?.statusCode) {
      console.log(error)
      console.log('API error fetching site data')
      useTideError(500)
    }
    return data.value
  }
  return siteData.value
}

export default useTideSite
