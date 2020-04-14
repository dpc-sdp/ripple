/**
 * A Vue mixin to provide a method for adding parent links into a menu tree.
 *
 * Provides a method `generateParentLinks (branch)` which, when given a menu
 * array, will return a new array where every parent will have it's children
 * array populated with a new link with the parent's text / url.
 *
 * This is useful for menu widgets that use expand / collapse buttons on parents
 * instead of a link for a parent item.
 *
 * Example input:
 *
 *   [{
 *     text: 'Root Menu Item',
 *     url: '/root-1',
 *     children: [{
 *       text: 'Child Menu Item',
 *       url: '/child-1',
 *       children: [{
 *         text: 'Sub child I',
 *         url: '/sub-1'
 *       }]
 *     }]
 *   }]
 *
 * Example output:
 *
 *   [{
 *     text: 'Root Menu Item',
 *     url: '/root-1',
 *     children: [{
 *       text: 'Root Menu Item',
 *       url: '/root-1'
 *     }, {
 *       text: 'Child Menu Item',
 *       url: '/child-1',
 *       children: [{
 *         text: 'Child Menu Item',
 *         url: '/child-1'
 *       }, {
 *         text: 'Sub child I',
 *         url: '/sub-1'
 *       }]
 *     }]
 *   }]
 *
 * Use within a component:
 *
 *   import parentlinks from '@dpc-sdp/ripple-global/mixins/parentlinks'
 *
 *   export default {
 *     name: 'my-component',
 *     mixins: [parentlinks],
 *     ...
 *
 * Then inside a method:
 *
 *   getProcessedMenuWithParentLink: function () {
 *     return this.generateParentLinks(this.menu)
 *  }
 */
const parentlinks = {
  methods: {
    generateParentLinks (branch) {
      if (branch !== undefined) {
        return branch.map(item => {
          let newitem = {
            text: item.text,
            url: item.url,
            target: item.target
          }
          if (item.children) {
            newitem.children = this.generateParentLinks(item.children)
            newitem.children.unshift({
              text: item.text,
              url: item.url,
              target: item.target
            })
          }
          return newitem
        })
      } else {
        return null
      }
    }
  }
}

export default parentlinks
