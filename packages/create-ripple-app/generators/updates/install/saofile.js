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
    // Set the sdp/ripple version based on SDP release version.
    // So we don't need to set sdp/ripple version manually in each update.
    const sdpVer = results.release === 'latest' ? helper.getLatestSdpRelease(results.release) : results.release
    const rippleVer = helper.getRippleVersion(sdpVer)
    const actions = [
      {
        type: 'modify',
        files: 'package.json',
        handler (data, filepath) {
          data.sdp_version = sdpVer
          data.dependencies['@dpc-sdp/ripple-nuxt-tide'] = rippleVer
          data.devDependencies['@dpc-sdp/ripple-test-tools'] = rippleVer
          return data
        }
      }
    ]

    // Regenerate lock to get latest deps for the project, also avoid possible version conflicts
    if (results.reinstall !== 'false' && results.reinstall !== false) {
      actions.push({
        type: 'remove',
        files: `package-lock.json`
      })
    }
    return actions
  },
  async completed () {
    const results = {
      ...this.answers,
      ...this.sao.opts.config
    }
    // Install dependencies to update lock files
    await this.npmInstall({ npmClient: results.pm })
    log(`Update to ${results.release} complete!`)
  }
}
