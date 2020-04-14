const common = require('./../../common')
const templateDir = './../../../template'
const log = require('./../../../logger')

module.exports = {
  ...common,
  templateDir,
  actions () {
    const results = {
      ...this.answers,
      ...this.sao.opts.config
    }
    const actions = [
      {
        type: 'modify',
        files: 'package.json',
        handler (data, filepath) {
          // This is only for user want to install specific version of ripple
          if (results.version) {
            data.dependencies['@dpc-sdp/ripple-nuxt-tide'] = `${results.version}`
            data.devDependencies['@dpc-sdp/ripple-test-tools'] = `${results.version}`
          }
          return data
        }
      }
    ]

    return actions
  },
  async completed () {
    const results = {
      ...this.answers,
      ...this.sao.opts.config
    }
    await this.npmInstall({ npmClient: results.pm })
    log(`Update complete!`)
  }
}
