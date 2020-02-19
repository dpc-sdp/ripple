const common = require('./../../common')
const jscodeshift = require('jscodeshift')
const templateDir = './../../../template'

module.exports = {
  ...common,
  templateDir,
  actions () {
    const actions = [
      {
        type: 'modify',
        files: 'package.json',
        handler (data, filepath) {
          data.version = '21.0.0'
          data.dependencies['@dpc-sdp/ripple-nuxt-tide'] = `1.6.0`
          data.devDependencies['@dpc-sdp/ripple-test-tools'] = `1.6.0`
          data.devDependencies['babel-plugin-lodash'] = `^3.3.2` // Add lodash build optimization
          data.devDependencies['lodash-webpack-plugin'] = `^0.11.5` // Add lodash build optimization
          return data
        }
      },
      {
        type: 'modify',
        files: 'nuxt.config.js',
        handler (data, filepath) {
          /*
          // https://astexplorer.net/
          // example of using jscodeshift for changing the site value and not modifying anything else
          const j = jscodeshift
          const defaultNode = j(data).find(j.ExportDefaultDeclaration)
          const nuxtConfig = defaultNode.nodes()[0].declaration.properties
          const tide = nuxtConfig.filter(e => e.key.name === 'tide')
          const site = tide[0].value.properties.filter(p => p.key.name === 'site')[0]
          site.value.value = 123
          const out = defaultNode.toSource({ quote: 'single' })
          return out
          */
          const j = jscodeshift
          const rootData = j(data)

          const defaultNode = rootData.find(j.ExportDefaultDeclaration)
          const build = defaultNode.find(j.Property, { key: { name: 'build' } })
          if (build.length) {
            console.warn('We found existing build configs. You need to manually merge new build configs in nuxt.config.js.')
          }
          const buildConfigs = `build: {
  // Currently 'lodash' is mainly brought by Elastic search JS lib.
  // Below lodash optimization can be reviewed after we migrate to new ES JS client.
  babel: {
    plugins: [
      'lodash'
    ]
  },
  extend (config, { isServer, loaders: { vue } }) {
    const webpack = require('webpack')
    const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
    config.plugins.push(new LodashModuleReplacementPlugin({
      'caching': true,
      'collections': true,
      'paths': true,
      'shorthands': true
    }))
    // Load moment 'en-au' locale only for performance.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You need to change it if your site is not in Australia.
    config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\\\]locale$/, /en-au/))
  }
}`
          defaultNode.find(j.Property, { key: { name: 'css' } })
            .insertAfter(buildConfigs)
          const out = rootData.toSource({ quote: 'single' })
          return out
        }
      }
    ]

    return actions
  },
  async completed () {
    console.log('Update to 21.0.0 complete!')
  }
}
