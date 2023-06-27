const svgLoader = require('vite-svg-loader')
const viteYamlLoader = require('@modyfi/vite-plugin-yaml').default
const path = require('path')

const vitePlugins = [
  viteYamlLoader(),
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
        },
        {
          name: 'removeStyleElement',
          active: true
        }
      ]
    }
  })
]
module.exports = {
  stories: ['./../../ripple-ui*/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  framework: '@storybook/vue3',
  staticDirs: ['./public'],
  features: {
    buildStoriesJson: true,
    storyStoreV7: false
  },
  core: {
    builder: '@storybook/builder-vite'
  },
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-jest',
    '@storybook/addon-a11y',
    'storybook-addon-designs'
  ],
  previewHead: (head) => (`
    ${head}
    <script src="${process.env.STATIC_BASE_PATH ? process.env.STATIC_BASE_PATH : '/'}js/iframeResizer.contentWindow.min.js"></script>
  `),
  async viteFinal(config, { configType }) {
    if (process.env.STATIC_BASE_PATH) {
      config.base = process.env.STATIC_BASE_PATH;
    }

    // customize the Vite config here
    config.plugins.push(...vitePlugins)
    config.resolve.alias = {
      ...config.resolve.alias,
      '~/storybook': path.resolve(__dirname, './')
    }

    // // Declare components externally
    // config.rollupOptions = {
    //   external: ['@dpc-sdp/ripple-ui-core/vue']
    // }

    // `Uncaught Error: Singleton client API not yet initialized, cannot call addParameters`
    // github.com/storybookjs/storybook/issues/10887#issuecomment-901109891
    config.resolve.dedupe = ['@storybook/client-api']

    return config
  }
}
