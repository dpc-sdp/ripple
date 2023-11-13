import { expect, describe, it } from '@jest/globals'
import response from './fixtures/large-menu'
import processed from './fixtures/processed'
import getHierarchicalMenu from './../site-menu'

const activePath = '/preparing-child-care'

describe('ripple-tide-api/services/site-menu', () => {
  it('should translate raw API response to hierarchical menu object', () => {
    console.log(getHierarchicalMenu(response, activePath))
    expect(getHierarchicalMenu(response, activePath)).toEqual(processed)
  })
})
