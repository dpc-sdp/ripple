const path = require('path')
const appDir = require('app-root-path')
const resolve = path.resolve
const fs = require('fs')

module.exports = function nuxtRipple (moduleOptions) {
  const options = Object.assign({}, this.options.ripple, moduleOptions)

  // If deployed on Lagoon, get the branch env
  const lagoonEnv = process.env.LAGOON_GIT_BRANCH || ''
  // If Nuxt running in dev mode, or Lagoon env is PR or develop, add a body class to tell it's dev mode.
  if (this.options.dev || lagoonEnv.startsWith('pr-') || lagoonEnv === 'develop') {
    const rplDevModeClass = 'ripple-dev-mode'
    // Set Ripple to dev mode
    options.isDev = true
    // Add a class to Nuxt HTML body element
    this.options.head.bodyAttrs = this.options.head.bodyAttrs || {}
    if (this.options.head.bodyAttrs.class) {
      this.options.head.bodyAttrs.class += ` ${rplDevModeClass}`
    } else {
      this.options.head.bodyAttrs.class = rplDevModeClass
    }
  }

  // Register `plugin.js` template
  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: 'ripple.js',
    options: options
  })

  const themePath = resolve(__dirname, `${appDir}/assets/_theme.scss`)

  if (fs.existsSync(themePath) && !this.options.styleResources) {
    this.options.styleResources = {
      scss: [
        // Theme - Injects sass variables into components
        themePath
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
