import RplIcon from './Icon.vue'
import RplTextIcon from './TextIcon.vue'
import { addIconsToLibrary } from './icon-library'

// Add default icons.
addIconsToLibrary(require.context('./assets/img/', true, /\.svg$/))

export {RplIcon}
export {RplTextIcon}
export default RplIcon
