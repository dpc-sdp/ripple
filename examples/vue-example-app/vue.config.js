const path = require('path')

const resolve = path.resolve

// vue.config.js
module.exports = {
  // Put postcss config here for working with our Ripple monorepo(yarn workspace).
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('autoprefixer')()
        ]
      }
    }
  },

  chainWebpack: config => {
    // Add this to load a custom sass variables to override Ripple sass variables.
    // https://github.com/shakacode/sass-resources-loader#vuejs-webpack-templatevue-cli3
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          resources: './src/variables.scss',
        })
        .end()
    })

    // Add this to load Ripple svg icons
    const svgRule = config.module.rule('svg')
    const rippleIconPath = path.dirname(require.resolve('@dpc-sdp/ripple-icon/package.json'))
    svgRule.uses.clear()
    svgRule
      .include
        .add(resolve(__dirname, rippleIconPath))
        .end()
      .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .end()
      .use('svgo-loader')
        .loader('svgo-loader')
        .end()
  }
}
