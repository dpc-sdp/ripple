import { getBaseUrl } from '../lib/utils'
declare const useFetch: any
declare const useNuxtApp: any

export default async function (id: string) {
  const { ssrContext } = useNuxtApp()
  const baseURL = getBaseUrl(ssrContext.req)
  return useFetch(`/site`, {
    params: {
      id
    },
    baseURL
  })
}
