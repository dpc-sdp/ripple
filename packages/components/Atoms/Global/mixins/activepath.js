/**
 * A Vue mixin to provide a method for finding and flagging the active path
 * in a menu.
 *
 * Given a menu array and a link, `setActivePaths` will modify the given menu
 * object to include an `active` flag on the found link item, and every parent
 * in the path of the active link.
 * It will return `true` if an active link is found in the menu.
 *
 * Example input (where active link is `/sub-1`):
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
 * Example output (where active link is `/sub-1`):
 *
 *   [{
 *     text: 'Root Menu Item',
 *     url: '/root-1',
 *     active: true,
 *     children: [{
 *       text: 'Child Menu Item',
 *       url: '/child-1',
 *       active: true,
 *       children: [{
 *         text: 'Sub child I',
 *         url: '/sub-1',
 *         active: true
 *       }]
 *     }]
 *   }]
 *
 * Use within a component:
 *
 *   import activepath from '@dpc-sdp/ripple-global/mixins/activepath'
 *
 *   export default {
 *     name: 'my-component',
 *     mixins: [activepath],
 *     ...
 *
 * Then inside a method:
 *
 *   addActivePath: function (menu, activeLink) {
 *     this.setActivePaths(menu, activeLink)
 *   }
 *
 */
const activepath = {
  methods: {
    setActivePaths (branch, path) {
      let isActivePath = false
      for (let i = 0; i < branch.length; i++) {
        let item = branch[i]
        if (item.url === path) {
          item['active'] = true
          isActivePath = true
        } else if (item.children) {
          if (this.setActivePaths(item.children, path)) {
            item['active'] = true
            isActivePath = true
          }
        }
      }
      return isActivePath
    }
  }
}

export default activepath
