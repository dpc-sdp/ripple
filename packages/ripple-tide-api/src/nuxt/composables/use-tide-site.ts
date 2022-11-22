// @ts-ignore
import { useFetch, useRuntimeConfig, createError } from '#imports'

export default async (params: object = {}) => {
  const { public: config } = useRuntimeConfig()
  const siteId = config.tide?.contentApi.site

  // @ts-ignore
  const { data, error } = await useFetch('/api/tide/site', {
    baseURL: config.API_URL || '',
    params: {
      id: siteId,
      ...params
    }
  })

  if (error.value) {
    throw createError({
      statusCode: 500,
      statusMessage: 'We have a glitch in our system.',
      message: `<p>We are aware of the issue. We appreciate your patience while we’re looking into it.</p>`
    })
  }

  return data
}
