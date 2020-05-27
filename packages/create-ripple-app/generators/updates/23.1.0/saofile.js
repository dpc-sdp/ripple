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
          data.sdp_version = '23.1.0'
          data.dependencies['@dpc-sdp/ripple-nuxt-tide'] = `1.9.0`
          data.devDependencies['@dpc-sdp/ripple-test-tools'] = `1.9.0`
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
          defaultNode.find(j.Property, { key: { name: 'build' } })
            .find(j.Property, { key: { name: 'extend' } })
            .insertAfter(`extractCSS: true`)
          const out = rootData.toSource({ quote: 'single' })
          return out
        }
      }
    ]
    return actions
  },
  async completed () {
    console.log('Update to 23.1.0 complete!')
  }
}
