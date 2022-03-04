const { createSvgIconsPlugin } = require('vite-plugin-svg-icons')
const path = require('path')

module.exports = {
  stories: [
    '../src/components/**/*.stories.mdx',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  core: { builder: 'storybook-builder-vite' },
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    config.plugins.push(    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'icons')],
      // Specify symbolId format
      symbolId: 'icon-[name]',
    }))
    return config
  }
}
