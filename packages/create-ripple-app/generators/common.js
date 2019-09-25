const OPTIONS = require('./../options')
const TIDE_MODULES = require('./../tidemodules')

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
      ...tideModules
    }
  }
}
