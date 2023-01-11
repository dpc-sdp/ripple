import type { RplTideModuleConfig, RplTideMapping } from './../../types'
import { H3Event } from 'h3'
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

export const registerTideContentType = (
  event: H3Event,
  contentType: string,
  contentTypeModule: RplTideMapping
) => {
  if (event.node.req?.url?.includes('/api/tide/page')) {
    if (
      !event.context.tide?.pageApi?.contentTypes.hasOwnProperty(contentType)
    ) {
      event.context.tide?.pageApi.setContentType(contentType, contentTypeModule)
    }
  }
}

export const loadRplTideModule = async (
  path: string
): Promise<RplTideMapping> => {
  return import(path).then((mdl) => mdl.default)
}

export default defineRplTideModule
