const fs = require('fs')
const common = require('./../../common')
const templateDir = './../../../template'
// const jscodeshift = require('jscodeshift')

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
          data.version = results.release
          data.dependencies['@dpc-sdp/ripple-nuxt-tide'] = `^${results.version}`
          data.devDependencies['@dpc-sdp/ripple-test-tools'] = `^${results.version}`
          if (results.unit === true) {
            // Add `vue-jest` 3 dependency `babel-core`
            data.devDependencies['babel-core'] = `^7.0.0-bridge.0`
            data.scripts['test:unit'] = 'cross-env BASIC_AUTH=0 NODE_ENV=test jest --passWithNoTests'
          }
          if (results.e2e === true) {
            data.scripts['cy:run'] = `cypress run -e TAGS='not @skip or @smoke`
            data.scripts['test:e2e'] = 'cross-env TEST=1 BASIC_AUTH=0 start-server-and-test start:build http://localhost:3000 cy:run'
            data.scripts['test:smoke'] = 'cross-env TEST=1 BASIC_AUTH=0 start-server-and-test start:build http://localhost:3000 cy:run-smoke'
          }
          // Upgrade nuxt
          data.dependencies['nuxt'] = `2.9.2`
          return data
        }
      },
      {
        type: 'modify',
        files: 'nuxt.config.js',
        handler (data, filepath) {
          /*
          // example of using jscodeshift for changing the site value and not modifying anything else
          const j = jscodeshift
          const defaultNode = j(data).find(j.ExportDefaultDeclaration)
          const nuxtConfig = defaultNode.nodes()[0].declaration.properties
          const tide = nuxtConfig.filter(e => e.key.name === 'tide')
          const site = tide[0].value.properties.filter(p => p.key.name === 'site')[0]
          site.value.value = 123
          const out = defaultNode.toSource({ quote: 'single' })
          return out
          */
          return data
        }
      }
    ]

    if (fs.existsSync(`${this.outDir}/pages/Sitemap.vue`)) {
      actions.push({
        type: 'remove',
        files: `${this.outDir}/pages/Sitemap.vue`
      })
    }

    return actions
  },
  async completed () {
    const results = {
      ...this.answers,
      ...this.sao.opts.config
    }
    await this.npmInstall({ npmClient: results.pm })
    console.log('complete!')
  }
}
