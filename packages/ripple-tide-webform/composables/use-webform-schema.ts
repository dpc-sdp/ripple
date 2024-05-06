import { useRuntimeConfig, useNuxtData, useFetch, useTideError } from '#imports'
import type { FormKitSchemaNode } from '@formkit/core'

interface MappedWebform {
  schema: FormKitSchemaNode[]
}

export const useWebformSchema = async (
  webformId: string
): Promise<MappedWebform> => {
  const { public: config } = useRuntimeConfig()
  const { data: schema } = useNuxtData(`webform-schema-${webformId}`)

  if (!schema.value) {
    const { data, error } = await useFetch('/api/tide/webform', {
      key: `webform-schema-${webformId}`,
      baseURL: config.apiUrl || '',
      params: {
        id: webformId
      }
    })
    if (error && error.value?.statusCode) {
      useTideError(error.value?.statusCode)
    }
    return data.value
  }
  return schema.value
}

export default useWebformSchema
