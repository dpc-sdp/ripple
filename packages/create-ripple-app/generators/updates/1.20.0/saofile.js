const fs = require('fs')
const common = require('./../../common')
const templateDir = './../../../template'

// Update from release 18.0.0 to 20.0.0
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
          data.sdp_version = '1.20.0'
          data.dependencies['@dpc-sdp/ripple-nuxt-tide'] = `1.5.7`
          data.devDependencies['@dpc-sdp/ripple-test-tools'] = `1.5.7`
          if (results.unit === true) {
            // Add `vue-jest` 3 dependency `babel-core`
            data.devDependencies['babel-core'] = `^7.0.0-bridge.0`
            data.scripts['test:unit'] = 'cross-env BASIC_AUTH=0 NODE_ENV=test jest --passWithNoTests'
          }
          if (results.integration === true) {
            data.scripts['cy:run'] = `cypress run -e TAGS='not @skip or @smoke'`
            data.scripts['test:integration'] = 'cross-env TEST=1 BASIC_AUTH=0 start-server-and-test start:build http://localhost:3000 cy:run'
          }
          // Upgrade nuxt
          data.dependencies['nuxt'] = `2.10.2`
          // Make sure it has cross-env
          data.devDependencies['cross-env'] = `^5.2.0`
          return data
        }
      }
    ]

    if (fs.existsSync(`${this.outDir}/pages/sitemap.vue`)) {
      actions.push({
        type: 'remove',
        files: `${this.outDir}/pages/sitemap.vue`
      })
    }

    return actions
  },
  async completed () {
    console.log('Update to 1.20.0 complete!')
  }
}
