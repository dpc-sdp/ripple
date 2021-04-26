// vue.config.js
module.exports = {
  // To use Ripple Markup or relevant components like Ripple Accordion
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  },

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
  }
}
