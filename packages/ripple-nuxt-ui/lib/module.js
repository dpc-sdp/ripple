const path = require('path')
const appDir = require('app-root-path')
const resolve = path.resolve

module.exports = function nuxtRipple (moduleOptions) {
  const options = Object.assign({}, this.options.ripple, moduleOptions)

  // Register `plugin.js` template
  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: 'ripple.js',
    options: options
  })

  if (!this.options.styleResources) {
    this.options.styleResources = {
      scss: [
        // Theme - Injects sass variables into components
        resolve(__dirname, `${appDir}/assets/_theme.scss`)
      ]
    }
  }

  this.addModule('@nuxtjs/style-resources', true)

  this.extendBuild((config, { isServer }) => {
    // Exclude svg from url-loader - it conflicts with 'svg-sprite-loader'.
    const rippleIconPath = path.dirname(require.resolve('@dpc-sdp/ripple-icon/package.json'))

    const urlLoader = config.module.rules.find((rule) => rule.use && rule.use.find(r => r.loader === 'url-loader'))
    if (urlLoader) {
      urlLoader.exclude = [
        resolve(__dirname, rippleIconPath),
        resolve(__dirname, `${appDir}/assets/ripple-icon/`)
      ]
    }
    // Add svg-sprite-loader to create svg sprite
    const svgLoader = config.module.rules.find((rule) => rule.use && rule.use.find(r => r === 'svgo-loader'))
    if (!svgLoader) {
      config.module.rules.push({
        test: /\.svg$/,
        include: [
          resolve(__dirname, rippleIconPath),
          resolve(__dirname, `${appDir}/assets/ripple-icon/`)
        ],
        use: [
          'svg-sprite-loader',
          'svgo-loader'
        ]
      })
    }
  })
}
