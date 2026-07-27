import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  staticDirs: ['./public'],
  framework: '@storybook/vue3-vite'
}
export default config
