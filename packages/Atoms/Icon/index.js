import RplIcon from './Icon.vue'
import RplTextIcon from './TextIcon.vue'
import { addIconsToLibrary } from './icon-library'

// In Jest there is no webpack require.context support, also we don't transform files.
// Let's skip this part in tests.
if (process.env.NODE_ENV !== 'test') {
  // Add default icons.
  addIconsToLibrary(require.context('./assets/img/', true, /\.svg$/))
}

export {RplIcon}
export {RplTextIcon}
export default RplIcon
