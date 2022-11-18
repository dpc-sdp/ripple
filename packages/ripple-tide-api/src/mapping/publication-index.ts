interface indexNode {
  text: string
  url: string
  id: string
  children: indexNode[] | undefined
}

export const processChildren = (node) => {
  const returnNode: indexNode = {
    text: node.title,
    url: node.url,
    id: node.id,
    children: node.children ? [] : undefined
  }
  if (node.children) {
    node.children.map((child) => {
      returnNode.children?.push(processChildren(child))
    })
  }
  return returnNode
}

export default {
  mapping: {
    _src: (src) => (process.env.NODE_ENV === 'development' ? src : undefined),
    publication: (src) => processChildren(src)
  },
  includes: []
}
