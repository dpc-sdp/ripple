import type { StorybookConfig } from '@storybook/react-vite'
import svgr from 'vite-plugin-svgr'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-mcp'
  ],
  framework: '@storybook/react-vite',
  staticDirs: ['./public'],
  viteFinal: async (config: any) => {
    config.plugins = config.plugins || []
    config.plugins.push(svgr())
    return config
  }
}
export default config
