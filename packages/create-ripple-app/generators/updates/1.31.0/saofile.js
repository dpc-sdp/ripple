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
        files: 'package.json',
        handler (data, filepath) {
          data.dependencies['nuxt'] = `2.14.7`
          data.dependencies['@nuxtjs/gtm'] = '^2.4.0'
          data.dependencies['run-script-os'] = `^1.1.3`
          data.devDependencies['babel-eslint'] = `^10.1.0`
          data.devDependencies['eslint-plugin-import'] = `^2.22.1`
          data.devDependencies['sass-resources-loader'] = `^2.1.1`
          data.devDependencies['start-server-and-test'] = `^1.11.6`
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
          defaultNode.find(j.Property, { key: { name: 'gtm' } }).remove()
          defaultNode.find(j.Property, { key: { name: 'build' } })
            .insertAfter(`gtm: {
  id: process.env.GTM_ID,
  pageTracking: true,
  pageViewEventName: 'routeChange',
  noscript: false
}`)

          defaultNode.find(j.Property, { key: { name: 'modules' } })
            .find(j.ArrayExpression)
            .forEach(p => p.get('elements').push(j.template.expression`'@nuxtjs/gtm'`))

          const out = rootData.toSource({ quote: 'single' })
          return out
        }
      }
    ]
    return actions
  },
  async completed () {
    console.log('SDP 1.31.0:')
    console.log('[SDPA-4647] Update dependencies')
    console.log('[SDPA-4658] Let GTM respect DNT')
  }
}
