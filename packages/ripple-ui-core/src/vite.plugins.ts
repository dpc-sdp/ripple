import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueSvgPlugin from 'vite-plugin-vue-svg'
import copy from 'rollup-plugin-copy'

export default [
  createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/core')],
    symbolId: 'rpl-icon--[name]'
  }),
  vueSvgPlugin({ defaultExport: 'component' }),
  copy({
    targets: [
      {
        src: [path.resolve(process.cwd(), 'src/assets/global.css')],
        dest: './dist'
      }
    ]
  })
]
