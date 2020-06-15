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
        handler (data, filepath) {
          data.sdp_version = '1.23.0'
          data.dependencies['@dpc-sdp/ripple-nuxt-tide'] = `1.8.0`
          data.devDependencies['@dpc-sdp/ripple-test-tools'] = `1.8.0`
          data.scripts['build:default'] = `nuxt build --modern=client`
          data.scripts['build:win32'] = `nuxt build --modern=client`
          data.scripts['start:default'] = `nuxt start --modern=client`
          data.scripts['start:win32'] = `nuxt start --modern=client`
          data.scripts['start:build'] = `nuxt build --modern=client && nuxt start --modern=client`
          return data
        }
      }
    ]
    return actions
  },
  async completed () {
    console.log('Update to 1.23.0 complete!')
  }
}
