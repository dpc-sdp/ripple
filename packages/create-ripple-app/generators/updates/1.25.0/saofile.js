const common = require('./../../common')
const templateDir = './../../../template'

module.exports = {
  ...common,
  templateDir,
  actions () {
    const actions = [
      {
        type: 'modify',
        files: 'assets/_theme.scss',
        handler (data, filepath) {
          data = data.replace("success': #009ca6", "success': #027a83")
          return data
        }
      }
    ]
    return actions
  },
  async completed () {
    console.log('SDP 1.25.0: [SDPA-4441] replaced success color')
  }
}
