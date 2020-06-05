const common = require('./../../common')
const templateDir = './../../../template'
const log = require('./../../../logger')

module.exports = {
  ...common,
  templateDir,
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
