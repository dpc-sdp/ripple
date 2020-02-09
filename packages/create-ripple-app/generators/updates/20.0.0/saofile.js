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

          // Add Lodash webpack plugins
          const lodashPlugin = rootData.find(j.Identifier, { name: 'LodashModuleReplacementPlugin' })
          if (lodashPlugin.length === 0) {
            const requireLodashPlugin = `const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')`
            rootData.get().node.program.body.unshift(requireLodashPlugin)
          }

          const defaultNode = rootData.find(j.ExportDefaultDeclaration)
          const build = defaultNode.find(j.Property, { key: { name: 'build' } })
          if (build.length) {
            console.warn('We found existing build configs. You need to manually merge new build configs in nuxt.config.js.')
          }
          const buildConfigs = `build: {
  babel: {
    plugins: [
      'lodash'
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      'shorthands': true,
      'caching': true,
      'collections': true,
      'paths': true
    })
  ]
}`
          defaultNode.find(j.Property, { key: { name: 'modules' } })
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
