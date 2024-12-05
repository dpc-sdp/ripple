import { stripSiteId } from '../../utils/stripSiteId.js'

type LinksetMenu = {
  href: string
  title: string
  hierarchy: string[]
  'machine-name': string[]
}

type ProcessedMenu = {
  active?: boolean
  enabled?: boolean
  text: string
  url?: string
  id: string
  items?: ProcessedMenu[]
  parent: string | null
}

const setActivePath = (branch: ProcessedMenu[], path: string) => {
  let isActivePath = false
  for (const item of branch) {
    if (item.url === path) {
      item.active = true
      isActivePath = true
    } else if (item.items) {
      if (setActivePath(item.items, path)) {
        item.active = true
        isActivePath = true
      }
    }
  }
  return isActivePath
}

const processNode = (linkset: LinksetMenu[], parentKey: string, level = 1) => {
  const processedValues: ProcessedMenu[] = []
  for (const link of linkset.filter(
    (item) => item.hierarchy.length === level
  )) {
    const nodeKey = link.hierarchy.join('-')

    if (level === 1 || nodeKey.startsWith(parentKey)) {
      const values: ProcessedMenu = {
        text: link.title,
        url: stripSiteId(link.href),
        id: nodeKey,
        parent: level === 1 ? null : parentKey
      }

      const items = processNode(linkset, nodeKey, level + 1)
      if (items.length > 0) {
        values.items = items
      }
      processedValues.push(values)
    }
  }
  return processedValues
}

const getHierarchicalMenuFromLinkset = (
  apiResponse: LinksetMenu[],
  activeUrl: string | undefined
) => {
  const hierarchy = processNode(apiResponse, '0')

  if (activeUrl) {
    setActivePath(hierarchy, activeUrl)
  }

  return hierarchy
}

export default getHierarchicalMenuFromLinkset
