import type { RplTideModuleConfig, RplTideMapping } from './../../types'
import { resolvePath } from '@nuxt/kit'

export interface RplTideModuleMapping {
  site: RplTideMapping
  content: {
    [key: string]: RplTideMapping
  }
}

export const defineRplTideModule = async (
  config: RplTideModuleConfig
): Promise<RplTideModuleMapping> => {
  const content = {} as {
    [key: string]: RplTideMapping
  }
  for (const key in config.mapping?.content) {
    const contentTypePath = config.mapping?.content[`${key}`]
    if (typeof contentTypePath !== 'string') {
      throw new Error(`unable to load ${key} mapping`)
    }
    content[key] = await loadRplTideModule(contentTypePath)
  }

  if (typeof config.mapping?.site !== 'string') {
    throw new Error('unable to load site mapping')
  }
  return {
    site: await loadRplTideModule(config.mapping?.site),
    content
  }
}

export const loadRplTideModule = async (
  path: string
): Promise<RplTideMapping> => {
  const resolvedPath = await resolvePath(path)
  return import(resolvedPath)
}

export default defineRplTideModule
