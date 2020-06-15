const OPTIONS = require('./../options')
const TIDE_MODULES = require('./../tidemodules')
const helper = require('./../helper')

module.exports = {
  prompts () {
    const config = this.sao.opts.config
    const prompts = []

    Object.values(OPTIONS).forEach(option => {
      if (config[option.name] === undefined) {
        prompts.push(option)
      }
    })

    return prompts
  },
  templateData () {
    const results = {
      ...this.answers,
      ...this.sao.opts.config
    }

    // Set the sdp_version if user use "latest"
    if (results.release === 'latest') {
      results.release = helper.getLatestSdpRelease()
    }

    // Set the ripple package version based on SDP release version.
    const rippleVersion = helper.getRippleVersion(results.release)
    if (rippleVersion instanceof Error) {
      throw rippleVersion
    }
    const version = { version: rippleVersion }

    const tideModules = {}

    TIDE_MODULES.map(m => m.value).forEach(module => {
      if (results.modules.includes(module)) {
        tideModules[module] = 'yes'
      } else {
        tideModules[module] = 'no'
      }
    })

    return {
      ...results,
      ...version,
      ...tideModules
    }
  }
}
