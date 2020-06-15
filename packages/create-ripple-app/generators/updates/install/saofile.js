const common = require('./../../common')
const templateDir = './../../../template'
const log = require('./../../../logger')
const helper = require('./../../../helper')

module.exports = {
  ...common,
  templateDir,
  actions () {
    const results = {
      ...this.answers,
      ...this.sao.opts.config
    }
    // Set the ripple version based on SDP release version.
    // So we don't need to set ripple version manually in each update.
    const rippleVer = helper.getRippleVersion(results.release)
    const actions = [
      {
        type: 'modify',
        files: 'package.json',
        handler (data, filepath) {
          data.dependencies['@dpc-sdp/ripple-nuxt-tide'] = rippleVer
          data.devDependencies['@dpc-sdp/ripple-test-tools'] = rippleVer
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
    // Install dependencies to update lock files
    await this.npmInstall({ npmClient: results.pm })
    log(`Update complete!`)
  }
}
