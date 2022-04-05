const path = require('path')
const { createSvgIconsPlugin } = require('vite-plugin-svg-icons')
const vueSvgPlugin = require('vite-plugin-vue-svg')

const vitePlugins = [
  createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/core')],
    symbolId: 'rpl-icon--[name]'
  }),
  vueSvgPlugin({ defaultExport: 'component' })
]

module.exports = {
  stories: [
    '../src/components/**/*.stories.mdx',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  core: { builder: 'storybook-builder-vite' },
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    config.plugins.push(vitePlugins)
    return config
  }
}
