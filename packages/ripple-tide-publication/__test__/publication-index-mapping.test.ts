import { expect, describe, it, beforeAll } from 'vitest'
import * as jsonapiParse from 'jsonapi-parse'
import type { indexNode, apiNode } from '../types'
import RAW from './publication-index-mapping.api.js'
import MAPPED from './publication-index-mapping.mapped.js'

// Copied from handler - ideally this should be imported, but jest can't interpret nuxt #imports
const processChildren = (node: apiNode) => {
  const returnNode: indexNode = {
    text: node.title,
    url: node.url,
    id: node.id,
    items: node.children ? [] : undefined,
    active: undefined
  }
  if (node.children) {
    node.children.map((child: apiNode) => {
      returnNode.items?.push(processChildren(child))
    })
  }
  return returnNode
}

const result = jsonapiParse.parse(MAPPED)

describe('PublicationIndex mapping', () => {
  let parsedData: apiNode

  beforeAll(() => {
    parsedData = jsonapiParse.parse(RAW)
  })

  it('maps a raw json api response children key to nested PublicationIndex structure', () => {
    expect(processChildren(parsedData)).toEqual(result)
  })
})
