const common = require('./../../common')
const templateDir = './../../../template'

// Update from release 16.0.1 to 18.0.0
module.exports = {
  ...common,
  templateDir,
  actions () {
    const actions = [
      {
        type: 'modify',
        files: 'package.json',
        handler (data, filepath) {
          data.version = '18.0.0'
          data.dependencies['@dpc-sdp/ripple-nuxt-tide'] = `1.2.0`
          data.devDependencies['@dpc-sdp/ripple-test-tools'] = `1.2.0`
          return data
        }
      },
      // Update store file.
      {
        type: 'add',
        files: ['index.js'],
        templateDir: `${templateDir}/nuxt/store/`
      },
      {
        type: 'move',
        patterns: {
          'index.js': 'store/index.js'
        }
      }
    ]

    return actions
  },
  async completed () {
    console.log('Update to 18.0.0 complete!')
  }
}
