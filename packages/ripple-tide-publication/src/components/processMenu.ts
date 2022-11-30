import type { RouteRecord } from 'vue-router'
import type { indexNode } from '../types'

const parseChildren = (node: indexNode, route: RouteRecord): indexNode[] => {
  if (!node.items) {
    return []
  }

  return node.items.map(
    (child: indexNode): indexNode => ({
      text: child.text,
      url: child.url,
      id: child.id,
      active: child.url === route.path,
      items: parseChildren(child, route)
    })
  )
}

const transformNode = (node: indexNode, route: RouteRecord): indexNode[] => {
  const parent: indexNode = {
    text: node.text,
    url: node.url,
    id: node.id,
    active: node.url === route.path,
    items: undefined
  }

  return [parent, ...parseChildren(node, route)]
}

const processMenu = (res: indexNode, route: RouteRecord): indexNode[] => [
  {
    text: res.text,
    url: res.url,
    id: res.id,
    active: res.url === route.path,
    items: undefined
  },
  ...(res.items?.map(
    (child: indexNode): indexNode => ({
      text: child.text,
      url: child.url,
      id: child.id,
      active: route.path.includes(child.url),
      items:
        // Group chapter together (child with its children)
        child.items ? transformNode(child, route) : undefined
    })
  ) as any[])
]

export { type indexNode, processMenu }
