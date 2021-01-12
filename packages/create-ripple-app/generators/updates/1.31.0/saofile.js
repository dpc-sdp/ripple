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
          data.dependencies['nuxt'] = `2.14.10`
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

          // [SDPA-4658] GTM update
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
            .filter(p => p.parentPath.name !== 'elements')
            .forEach(p => { p.get('elements').push(j.template.expression`'@nuxtjs/gtm'`) })

          // Remove comment
          defaultNode.find(j.Property, { key: { name: 'modules' } })
            .find(j.ArrayExpression)
            .find(j.Literal)
            .forEach(p => {
              if (p.value.raw === `'@dpc-sdp/ripple-nuxt-tide'`) {
                p.value.comments = []
              }
            })

          // [SDPA-4688] Add preview module
          defaultNode.find(j.Property, { key: { name: 'tide' } })
            .find(j.Property, { key: { name: 'modules' } })
            .find(j.Property, { key: { name: 'site' } })
            .insertAfter('preview: 1')

          const out = rootData.toSource({ quote: 'single', trailingComma: false })
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
    console.log('[SDPA-4688] Preview relevant update')
  }
}
