/**
 * Filter menu items and separate into root (parent) and children (child) for
 * consumption by _findChildren().
 *
 * @param menus {Object}
 * @param roots {Array}
 * @param children {Object}
 *
 * @private
 */
const _filterStructure = function (menus, roots, children) {
  // Find the top level nodes and hash the children based on parent.
  for (let i = 0, len = Object.keys(menus).length; i < len; ++i) {
    const item = menus[i]
    const p = item.parent
    const target = !p ? roots : children[p] || (children[p] = [])
    target.push(item)
  }
}

/**
 * Recursively build the tree.
 *
 * @param parent {Object}
 * @param children {Object}
 *
 * @private
 */
const _structureChildren = function (parent, children) {
  if (children[parent.id]) {
    parent.items = children[parent.id]
    parent.items.sort(_sortByWeight)
    for (let i = 0, len = parent.items.length; i < len; ++i) {
      parent.items[i].text = children[parent.id][i].text
      parent.items[i].url = children[parent.id][i].url
      _structureChildren(parent.items[i], children)
      parent.items.sort(_sortByWeight)
    }
  }
}

/**
 * Sorts the menu hierarchy from a flat structure to hierarchical.
 *
 * @param menus {Object}
 *
 * @return {Array}
 *
 * @private
 */
const _buildHierarchy = function (menus) {
  const roots = []
  const children = {}
  _filterStructure(menus, roots, children)
  for (let i = 0, len = roots.length; i < len; ++i) {
    _structureChildren(roots[i], children)
  }
  roots.sort(_sortByWeight)
  return roots
}

const _setActivePath = function (branch, path) {
  let isActivePath = false
  for (const item of branch) {
    if (item.url === path) {
      item['active'] = true
      isActivePath = true
    } else if (item.items) {
      if (_setActivePath(item.items, path)) {
        item['active'] = true
        isActivePath = true
      }
    }
  }
  return isActivePath
}

/**
 * Returns menus organised into hierarchy based on the parent key of menu items.
 *
 * @param menus {Object}
 * A flat structure of menu objects.
 *
 * @return {Object}
 * Hierarchical menu object
 */
const getHierarchicalMenu = function (menu, activeUrl, enabledCheck = false) {
  const linkValues = [] as any
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
  const hierarchy = _buildHierarchy(linkValues)

  if (activeUrl) {
    _setActivePath(hierarchy, activeUrl)
  }

  return hierarchy
}

/**
 * Helper function to sort menu array by weight property.
 * @param a
 * @param b
 * @return {number}
 * @private
 */
const _sortByWeight = (a, b) => {
  return a.weight - b.weight
}

export default getHierarchicalMenu
