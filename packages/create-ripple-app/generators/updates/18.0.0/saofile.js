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
          data.dependencies['@dpc-sdp/ripple-nuxt-tide'] = `^${results.version}`
          data.devDependencies['@dpc-sdp/ripple-test-tools'] = `^${results.version}`
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
