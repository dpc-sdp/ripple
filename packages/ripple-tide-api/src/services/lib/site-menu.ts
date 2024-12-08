type ApiMenu = {
  attributes: {
    enabled?: boolean
    link?: {
      uri?: string
      url?: string
    }
    parent: string
    title: string
    url?: string
    weight: number
  }
  id: string
}

type ProcessedMenu = {
  active?: boolean
  enabled?: boolean
  text: string
  url?: string
  id: string
  items?: ProcessedMenu[]
  parent: string | null
  weight: number
}

const filterStructure = (
  menus: ProcessedMenu[],
  roots: ProcessedMenu[],
  children: ProcessedMenu
) => {
  // Find the top level nodes and hash the children based on parent.
  for (let i = 0, len = Object.keys(menus).length; i < len; ++i) {
    const item = menus[i]
    if (item.parent) {
      if (!children[item.parent]) {
        children[item.parent] = []
      }
      children[item.parent].push(item)
    } else {
      roots.push(item)
    }
  }
}

const structureChildren = (parent: ProcessedMenu, children: ProcessedMenu) => {
  if (children[parent.id]) {
    parent.items = children[parent.id]
    if (parent.items) {
      parent.items.sort(sortByWeight)
      for (let i = 0, len = parent.items.length; i < len; ++i) {
        parent.items[i].text = children[parent.id][i].text
        parent.items[i].url = children[parent.id][i].url
        structureChildren(parent.items[i], children)
        parent.items.sort(sortByWeight)
      }
    }
  }
}

const buildHierarchy = (menus: ProcessedMenu[]) => {
  const roots = []
  const children: ProcessedMenu = {} as ProcessedMenu
  filterStructure(menus, roots, children)
  for (let i = 0, len = roots.length; i < len; ++i) {
    structureChildren(roots[i], children)
  }
  roots.sort(sortByWeight)
  return roots
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

const getHierarchicalMenu = (
  menu: ApiMenu[],
  activeUrl?: string,
  enabledCheck = false
) => {
  const linkValues: ProcessedMenu[] = []
  for (const link of menu) {
    if (!enabledCheck || (enabledCheck && link.attributes.enabled)) {
      linkValues.push({
        text: link.attributes.title,
        url:
          link.attributes?.url ||
          link.attributes.link?.url ||
          link.attributes.link?.uri,
        id: link.id.replace(/^(menu_link_content:)/, ''),
        parent: link.attributes.parent
          ? link.attributes.parent.replace(/^(menu_link_content:)/, '')
          : null,
        weight: link.attributes.weight
      })
    }
  }
  const hierarchy = buildHierarchy(linkValues)

  if (activeUrl) {
    setActivePath(hierarchy, activeUrl)
  }

  return hierarchy
}

const sortByWeight = (a: { weight: number }, b: { weight: number }) =>
  a.weight - b.weight

export default getHierarchicalMenu
