import { expect, describe, it } from 'vitest'

import getHierarchicalMenu from './../site-menu'
import menu_items from './fixtures/menu_items'
import menuItemsProcessed from './fixtures/menu_items-processed'

import getHierarchicalMenuFromLinkset from './../site-menu-linkset'
import linkset from './fixtures/linkset'
import linksetProcessed from './fixtures/linkset-processed'

const activePath = '/recruitment-online'

describe('ripple-tide-api/services/site-menu', () => {
  it('should translate raw API response to hierarchical menu object', () => {
    expect(getHierarchicalMenu(menu_items, activePath)).toEqual(
      menuItemsProcessed
    )
  })

  it('should translate linkset API response to hierarchical menu object', () => {
    expect(getHierarchicalMenuFromLinkset(linkset, activePath)).toEqual(
      linksetProcessed
    )
  })
})
