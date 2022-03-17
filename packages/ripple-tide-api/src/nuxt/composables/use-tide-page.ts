import { getBaseUrl } from '../lib/utils'
declare const useFetch: any
declare const useNuxtApp: any

export default async function (path: string) {
  const { ssrContext } = useNuxtApp()
  const baseURL = getBaseUrl(ssrContext.req)
  console.log(baseURL)
  return useFetch(`/page`, {
    params: {
      path
    },
    baseURL
  })
}
