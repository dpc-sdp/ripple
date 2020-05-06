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
          data.sdp_version = '23.0.0'
          data.dependencies['@dpc-sdp/ripple-nuxt-tide'] = `1.8.0`
          data.devDependencies['@dpc-sdp/ripple-test-tools'] = `1.8.0`
          data.scripts['build:default'] = `nuxt build --modern=client`
          data.scripts['build:win32'] = `nuxt build --modern=client`
          data.scripts['start:default'] = `nuxt start --modern=client`
          data.scripts['start:win32'] = `nuxt start --modern=client`
          data.scripts['start:build'] = `nuxt build --modern=client && nuxt start --modern=client`
          // TODO: Dockerfile need to be updated https://github.com/dpc-sdp/ripple_platform/pull/7
          // Each existing project need to update Dockerfile according to above PR.
          return data
        }
      }
    ]

    return actions
  },
  async completed () {
    console.log('Update to 23.0.0 complete!')
  }
}
