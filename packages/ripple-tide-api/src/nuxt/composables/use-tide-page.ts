// @ts-ignore
import { useFetch, useRuntimeConfig, useRoute, createError } from '#imports'

export default async (params: object = {}) => {
  const route = useRoute()
  const { public: config } = useRuntimeConfig()
  const siteId = config.tide?.contentApi.site

  // @ts-ignore
  const { data, error } = await useFetch('/api/tide/page', {
    baseURL: config.API_URL || '',
    params: {
      id: siteId,
      path: route.path,
      ...params
    }
  })

  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Sorry, we couldn't find the page you were looking for.",
      message: `
        <p>Have a look at the web address to make sure it was typed correctly. We may also have deleted this page.</p>
        <p>If none of our suggestions help you find the information you were looking for, please contact us.</p>
      `
    })
  }

  return data
}
