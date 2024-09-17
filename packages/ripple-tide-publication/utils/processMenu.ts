import type { RouteRecord } from 'vue-router'
import type { indexNode, flatIndexNode } from '../types'

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

const processMenu = (res: indexNode, route: RouteRecord): indexNode[] => {
  return [
    {
      text: res.text,
      url: res.url,
      id: res.id,
      active: res.url === route.path,
      items: undefined
    },
    ...((res.items || []).map(
      (child: indexNode): indexNode => ({
        text: child.text,
        url: child.url,
        id: child.id,
        active: route.path.includes(child.url),
        items:
          // Group chapter together (child with its children)
          child.items ? parseChildren(child, route) : undefined
      })
    ) as any[])
  ]
}

const flattenMenu = (items?: indexNode[]): flatIndexNode[] => {
  return (items || []).reduce((acc: flatIndexNode[], item): flatIndexNode[] => {
    const { items = [], ...values } = item
    return [...acc, values, ...flattenMenu(items)]
  }, [])
}

export { type indexNode, processMenu, flattenMenu }
