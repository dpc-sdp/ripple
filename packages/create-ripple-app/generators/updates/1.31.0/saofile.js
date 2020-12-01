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
          data.dependencies['run-script-os'] = `^1.1.3`
          data.devDependencies['babel-eslint'] = `^10.1.0`
          data.devDependencies['eslint-plugin-import'] = `^2.22.1`
          data.devDependencies['sass-resources-loader'] = `^2.1.1`
          data.devDependencies['start-server-and-test'] = `^1.11.6`
          return data
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
