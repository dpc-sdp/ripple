import type { StorybookConfig } from '@storybook/html-vite'
import { fileURLToPath } from 'url'
import path from 'path'
import twigPlugin from './vite-plugin-twig.ts'

const storybookDir = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: [
    './../../ripple-ui-core/src/components/**/html/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: ['@storybook/addon-a11y', '@whitespace/storybook-addon-html'],
  framework: {
    name: '@storybook/html-vite',
    options: {}
  },
  staticDirs: ['./public'],
  async viteFinal(config) {
    if (process.env.STATIC_BASE_PATH) {
      config.base = process.env.STATIC_BASE_PATH
    }

    // Add Twig plugin
    if (config.plugins) {
      config.plugins.push(twigPlugin())
    }

    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '~/storybook': path.resolve(storybookDir, './')
      }
    }

    return config
  }
}
export default config
