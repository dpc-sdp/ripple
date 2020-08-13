const common = require('./../../common')
const templateDir = './../../../template'
const jscodeshift = require('jscodeshift')

module.exports = {
  ...common,
  templateDir,
  actions () {
    const actions = [
      {
        type: 'modify',
        files: 'static/img/oops-banner.svg',
        handler (data, filepath) {
          data = data.replace(' style="mix-blend-mode: overlay;"', '')
          return data
        }
      },
      {
        type: 'modify',
        files: 'nuxt.config.js',
        handler (data, filepath) {
          const j = jscodeshift
          const rootData = j(data)

          const defaultNode = rootData.find(j.ExportDefaultDeclaration)
          defaultNode.find(j.Property, { key: { name: 'extractCSS' } }).remove()
          const out = rootData.toSource({ quote: 'single' })
          return out
        }
      }
    ]
    return actions
  },
  async completed () {
    console.log('SDP 1.26.0:')
    console.log('[SDPA-4339] Fixed oops banner')
    console.log('[SW-258] Fixed extractCSS issue')
  }
}
