const common = require('./../../common')
const templateDir = './../../../template'

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
      }
    ]
    return actions
  },
  async completed () {
    console.log('SDP 1.26.0:')
    console.log('[SDPA-4339] Fixed oops banner')
  }
}
