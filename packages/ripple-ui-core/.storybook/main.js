const svgLoader = require('vite-svg-loader')

const vitePlugins = [
  svgLoader({
    defaultImport: 'raw'
  })
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
    config.plugins.push(
      svgLoader({
        defaultImport: 'raw'
      })
    )
    console.log(config.plugins)
    return config
  }
}
