import { expect, describe, it } from 'vitest'
import { TideDynamicPageComponent } from '../types'
import groupDynamicComponents from './groupDynamicComponents.js'

describe('groupDynamicComponents', () => {
  it('should group a list of components based on their layout value', () => {
    const components: TideDynamicPageComponent<any>[] = [
      {
        id: 'ID_1',
        component: 'COMP_1',
        props: {}
      },
      {
        id: 'ID_2',
        component: 'COMP_2',
        layout: 'LAYOUT_A',
        props: {}
      },
      {
        id: 'ID_3',
        component: 'COMP_3',
        layout: 'LAYOUT_A',
        props: {}
      },
      {
        id: 'ID_4',
        component: 'COMP_4',
        props: {}
      },
      {
        id: 'ID_5',
        component: 'COMP_5',
        layout: 'LAYOUT_A',
        props: {}
      },
      {
        id: 'ID_6',
        component: 'COMP_6',
        props: {}
      },
      {
        id: 'ID_7',
        component: 'COMP_7',
        layout: 'LAYOUT_B',
        props: {}
      },
      {
        id: 'ID_8',
        component: 'COMP_8',
        layout: 'LAYOUT_B',
        props: {}
      },
      {
        id: 'ID_9',
        component: 'COMP_9',
        layout: 'LAYOUT_A',
        props: {}
      }
    ]

    const expected = [
      {
        id: 'ID_1',
        component: 'COMP_1',
        props: {}
      },
      {
        id: '__group1',
        grouping: 'LAYOUT_A',
        components: [
          {
            id: 'ID_2',
            component: 'COMP_2',
            layout: 'LAYOUT_A',
            props: {}
          },
          {
            id: 'ID_3',
            component: 'COMP_3',
            layout: 'LAYOUT_A',
            props: {}
          }
        ]
      },
      {
        id: 'ID_4',
        component: 'COMP_4',
        props: {}
      },
      {
        id: '__group2',
        grouping: 'LAYOUT_A',
        components: [
          {
            id: 'ID_5',
            component: 'COMP_5',
            layout: 'LAYOUT_A',
            props: {}
          }
        ]
      },
      {
        id: 'ID_6',
        component: 'COMP_6',
        props: {}
      },
      {
        id: '__group3',
        grouping: 'LAYOUT_B',
        components: [
          {
            id: 'ID_7',
            component: 'COMP_7',
            layout: 'LAYOUT_B',
            props: {}
          },
          {
            id: 'ID_8',
            component: 'COMP_8',
            layout: 'LAYOUT_B',
            props: {}
          }
        ]
      },
      {
        id: '__group4',
        grouping: 'LAYOUT_A',
        components: [
          {
            id: 'ID_9',
            component: 'COMP_9',
            layout: 'LAYOUT_A',
            props: {}
          }
        ]
      }
    ]

    expect(groupDynamicComponents(components)).toEqual(expected)
  })
})
