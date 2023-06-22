import type { RplTideModuleConfig, IRplTideModuleMapping } from './../../types'

export interface RplTideModuleMapping {
  site: IRplTideModuleMapping
  content: {
    [key: string]: IRplTideModuleMapping
  }
}

export const defineRplTideModule = async (
  config: RplTideModuleConfig
): Promise<RplTideModuleMapping> => {
  const content = {} as {
    [key: string]: IRplTideModuleMapping
  }
  for (const key in config.mapping) {
    const contentTypePath = config.mapping[`${key}`]
    if (typeof contentTypePath !== 'string') {
      throw new Error(`unable to load ${key} mapping`)
    }
    content[key] = await loadRplTideModule(contentTypePath)
  }

  if (typeof config.mapping?.site !== 'string') {
    throw new Error('unable to load site mapping')
  }
  const site = await loadRplTideModule(config.mapping?.site)
  delete content.site
  return {
    site,
    content
  }
}

export const loadRplTideModule = async (
  path: string
): Promise<IRplTideModuleMapping> => {
  return import(path).then((mdl) => mdl.default)
}

export default defineRplTideModule
