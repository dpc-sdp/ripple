const path = require('path')

const resolve = path.resolve

// TODO: this need to be updated after published to npm.
const nuxtNodeModulesPath = '../../../node_modules/'

module.exports = function nuxtRipple (moduleOptions) {
  const options = Object.assign({}, this.options.ripple, moduleOptions)

  // Register `plugin.js` template
  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: 'ripple.js',
    options: options
  })

  this.extendBuild((config, { isServer }) => {
    // Exclude svg from url-loader - it conflicts with 'svg-sprite-loader'.
    const urlLoader = config.module.rules.find((rule) => rule.use && rule.use.find(r => r.loader === 'url-loader'))
    if (urlLoader) {
      urlLoader.exclude = [
        resolve(__dirname, nuxtNodeModulesPath + '@dpc-sdp/ripple-icon/'),
        resolve(__dirname, '../../../assets/ripple-icon/')
      ]
    }
    // Add svg-sprite-loader to create svg sprite
    config.module.rules.push({
      test: /\.svg$/,
      include: [
        resolve(__dirname, nuxtNodeModulesPath + '@dpc-sdp/ripple-icon/'),
        resolve(__dirname, '../../../assets/ripple-icon/')
      ],
      use: [
        'svg-sprite-loader',
        'svgo-loader'
      ]
    })
  })
}
