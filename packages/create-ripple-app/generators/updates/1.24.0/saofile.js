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
          data.sdp_version = '1.24.0'
          return data
        }
      }
    ]
    return actions
  },
  async completed () {
    console.log('Update to 1.24.0 complete!')
  }
}
