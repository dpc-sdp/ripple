const path = require("path");

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: [
          resolve('node_modules'),
          resolve('../packages/components'),
          resolve('../storybook-components/scss')
        ]
      },
      {
        test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader',
        exclude: [
          resolve('../packages/components/Atoms/Icon/'),
          resolve('../static/custom_icons/')
        ],
      },
      {
        test: /\.svg$/,
        include: [
          resolve('../packages/components/Atoms/Icon/'),
          resolve('../static/custom_icons/')
        ],
        use: [
          'svg-sprite-loader',
          'svgo-loader'
        ]
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [
          resolve('../packages/components/'),
          resolve('../test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      }
    ]
  }
};
