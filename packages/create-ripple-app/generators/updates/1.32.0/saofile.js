const common = require('./../../common')
const templateDir = './../../../template'

module.exports = {
  ...common,
  templateDir,
  actions () {
    const actions = [
      {
        type: 'modify',
        files: 'package.json',
        handler (data) {
          data.dependencies['nuxt'] = `2.14.12`
          data.devDependencies['@babel/eslint-parser'] = `^7.12.1`
          data.devDependencies['@babel/eslint-plugin'] = `^7.12.1`
          data.devDependencies['cross-env'] = `^7.0.3`
          data.devDependencies['eslint'] = `^7.19.0`
          data.devDependencies['eslint-config-standard'] = `^16.0.2`
          data.devDependencies['eslint-friendly-formatter'] = `^4.0.1`
          data.devDependencies['eslint-loader'] = `^4.0.2`
          data.devDependencies['eslint-plugin-jest'] = `^24.1.3`
          data.devDependencies['eslint-plugin-node'] = `^11.1.0`
          data.devDependencies['eslint-plugin-promise'] = `^4.2.1`
          data.devDependencies['eslint-plugin-standard'] = `^5.0.0`
          data.devDependencies['eslint-plugin-vue'] = `^7.5.0`
          delete data.devDependencies['babel-eslint']
          return data
        }
      }
    ]
    return actions
  },
  async completed () {
    console.log('SDP 1.32.0:')
    console.log('Upgrade eslint plugins')
  }
}
