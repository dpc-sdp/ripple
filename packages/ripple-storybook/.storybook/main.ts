import { StorybookConfig } from '@storybook/vue3-vite'
import svgLoader from 'vite-svg-loader'
import viteYamlLoader from '@modyfi/vite-plugin-yaml'
import nodeResolve from '@rollup/plugin-node-resolve'
import path from 'path'

const vitePlugins = [
  viteYamlLoader(),
  nodeResolve(),
  svgLoader({
    defaultImport: 'raw',
    svgoConfig: {
      multipass: true,
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {}
          }
        },
        {
          name: 'removeAttrs',
          params: {
            attrs: '(fill|stroke)'
          }
        },
        {
          name: 'removeAttributesBySelector',
          params: {
            selector: '[style*=fill:#]',
            attributes: 'style'
          }
        }
      ]
    }
  })
]

const config: StorybookConfig = {
  stories: ['./../../ripple-ui*/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  features: {
    legacyMdx1: true
  },
  staticDirs: ['./public'],
  previewHead: (head) => `
    ${head}
    <script src="${
      process.env.STATIC_BASE_PATH ? process.env.STATIC_BASE_PATH : '/'
    }js/iframeResizer.contentWindow.min.js"></script>
  `,
  async viteFinal(config) {
    if (process.env.STATIC_BASE_PATH) {
      config.base = process.env.STATIC_BASE_PATH
    }

    // customize the Vite config here
    if (config.plugins) {
      config.plugins.push(...vitePlugins)
    }

    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '~/storybook': path.resolve(__dirname, './')
      }
    }

    return config
  }
}
export default config
