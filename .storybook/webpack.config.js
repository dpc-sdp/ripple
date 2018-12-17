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
          resolve('packages'),
          resolve('src'),
          resolve('node_modules/ol/')
        ]
      },
      {
        test: /\.(jpe?g|png|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'file-loader',
        exclude: [
          resolve('packages/Atoms/Icon/')
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
        loader: 'file-loader?prefix=font/',
        include: [
          resolve('packages')
        ],
      },
      {
        test: /\.svg$/,
        include: [
          resolve('packages/Atoms/Icon/')
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
          resolve('packages'),
          resolve('src'),
          resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      }
    ]
  }
};
