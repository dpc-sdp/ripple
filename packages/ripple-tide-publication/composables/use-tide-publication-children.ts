import type { indexNode } from '../types'
import { useTideError, useFetch, useRuntimeConfig, useNuxtData } from '#imports'

export const useTidePublicationChildren = async (
  publicationId: string,
  childIds: string[]
): Promise<indexNode[]> => {
  const { public: config } = useRuntimeConfig()
  const { data: children } = useNuxtData(
    `publication-children-${publicationId}`
  )

  if (!childIds?.length) {
    return []
  }

  if (!children.value) {
    const { data, error } = await useFetch('/api/tide/publication-children', {
      key: `publication-children-${publicationId}`,
      baseURL: config.apiUrl || '',
      params: {
        ids: childIds
      }
    })
    if (error && error.value?.statusCode) {
      useTideError(error.value?.statusCode, error.value)
    }
    return data.value
  }
  return children.value
}

export default useTidePublicationChildren
