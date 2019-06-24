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
    const target = !p ? roots : (children[p] || (children[p] = []))
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
const _structureChildren = function (parent, children, i = 0) {
  if (children[parent.uuid]) {
    parent.children = children[parent.uuid]
    parent.children.sort(_sortByWeight)
    for (let i = 0, len = parent.children.length; i < len; ++i) {
      parent.children[i].text = children[parent.uuid][i].text
      parent.children[i].url = children[parent.uuid][i].url
      _structureChildren(parent.children[i], children, i)
      parent.children.sort(_sortByWeight)
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

/**
 * Returns menus organised into hierarchy based on the parent key of menu items.
 *
 * @param menus {Object}
 * A flat structure of menu objects.
 *
 * @return {Object}
 * Hierarchical menu object
 */
const getHierarchicalMenu = function (menus) {
  let hierarchy = {}
  if (Object.keys(menus).length === 0) {
    throw Error('`Get hierarchical menu failed: site menus are empty.')
  }
  for (let menu in menus) {
    const linkValues = []
    for (let link of menus[menu]) {
      if (link.attributes.enabled) {
        linkValues.push({
          text: link.attributes.title,
          url: link.attributes.link.url || link.attributes.link.uri,
          uuid: link.id,
          parent: !link.attributes.parent ? null : link.attributes.parent.replace(/^(menu_link_content:)/, ''),
          weight: link.attributes.weight
        })
      }
    }
    hierarchy[menu] = _buildHierarchy(linkValues)
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

export default {
  getHierarchicalMenu
}
