import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueSvgPlugin from 'vite-plugin-vue-svg'

export default [
  createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/core')],
    symbolId: 'rpl-icon--[name]'
  }),
  vueSvgPlugin({ defaultExport: 'component' })
]
