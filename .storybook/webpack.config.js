const path = require("path");

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      'ol/style/style': 'ol/style/Style.js',
      'ol/style/fill': 'ol/style/Fill.js',
      'ol/style/stroke': 'ol/style/Stroke.js',
      'ol/style/icon': 'ol/style/Icon.js',
      'ol/style/text': 'ol/style/Text.js',
      'ol/style/circle': 'ol/style/Circle.js',
      'ol/style/point': 'ol/style/Point.js',
      'ol/geom/point': 'ol/geom/Point.js'
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
