import path from 'path'
import { join } from 'pathe'
import { defineNuxtModule } from '@nuxt/kit'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueSvgPlugin from 'vite-plugin-vue-svg'

export default defineNuxtModule({
  hooks: {
    'build:before'(builder, buildOptions) {
      const plugins = buildOptions.postcss.postcssOptions.plugins
      buildOptions.postcss.postcssOptions.plugins = {
        ...plugins,
        autoprefixer: {},
        'postcss-nested': {}
      }
    },
    'vite:extendConfig'(viteInlineConfig) {
      // Add SVG spritesheet plugin config
      viteInlineConfig.plugins.push(createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/core')],
        symbolId: 'rpl-icon--[name]'
      }))

      // Add SVG custom icon plugin config
      viteInlineConfig.plugins.push(vueSvgPlugin({ defaultExport: 'component' }))
    },
    'components:dirs'(dirs) {
      // Add ./components dir to the list
      console.log('Added Ripple UI components')
      dirs.push({
        path: join(__dirname, './../src/components'),
        prefix: 'rpl'
      })
    }
  }
})
