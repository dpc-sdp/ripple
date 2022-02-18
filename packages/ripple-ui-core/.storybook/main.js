module.exports = {
  stories: [
    '../src/components/**/*.stories.mdx',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  core: { builder: 'storybook-builder-vite' },
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    return config
  }
}
