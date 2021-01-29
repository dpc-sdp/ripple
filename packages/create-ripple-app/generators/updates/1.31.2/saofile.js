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
          return data
        }
      }
    ]
    return actions
  },
  async completed () {
    console.log('SDP 1.31.2:')
    console.log('[SDPA-4937] Upgrade nuxt')
  }
}
