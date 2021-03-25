const path = require("path");

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  stories: [resolve('../packages/components/**/*.stories.mdx')],
  logLevel: 'error',
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@storybook/addon-docs',
    '@storybook/addon-controls'
  ],
  webpackFinal: async (config, { mode }) => {
    // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.resolve.alias.vue = 'vue/dist/vue.js'

    // remove file-loader as it has conflicting config with url-loader
    config.module.rules = config.module.rules.filter(rule => {
      if (rule.loader && rule.loader.includes('file-loader')) {
        return false
      }
      return rule
    })

    config.module.rules.push(
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: [
          resolve('node_modules'),
          resolve('../packages/components'),
          resolve('storybook-components'),
          resolve('storybook-components/scss'),
        ]
      },
      {
        test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [
          resolve('../packages/components/'),
          resolve('storybook-components'),
          resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      }
    )

    // Return the altered config
    return config
  },
}
