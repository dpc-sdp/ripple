const fs = require('fs')
const path = require('path')
const common = require('./../../common')
const jscodeshift = require('jscodeshift')
const templateDir = './../../../template'

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
          data.version = '22.0.0'
          data.dependencies['@dpc-sdp/ripple-nuxt-tide'] = `1.7.0`
          data.devDependencies['@dpc-sdp/ripple-test-tools'] = `1.7.0`
          data.scripts['cy:run'] = `cypress run -b chrome -e TAGS='not @skip or @smoke'`
          data.scripts['cy:record'] = `cypress run -b chrome -e TAGS='not @skip or @smoke' --record  --parallel --group $CIRCLE_JOB`
          if (data['cypress-cucumber-preprocessor']) {
            data['cypress-cucumber-preprocessor'].step_definitions = 'test/e2e/integration/'
          }
          return data
        }
      },
      {
        type: 'add',
        files: ['_cypress.json'],
        transform: true
      },
      {
        type: 'move',
        patterns: {
          '_cypress.json': 'cypress.json'
        }
      },
      {
        type: 'modify',
        files: 'nuxt.config.js',
        handler (data, filepath) {
          /*
          // https://astexplorer.net/
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
          const j = jscodeshift
          const rootData = j(data)

          const defaultNode = rootData.find(j.ExportDefaultDeclaration)
          const build = defaultNode.find(j.Property, { key: { name: 'build' } })
          if (build.length) {
            console.warn('We found existing build configs. You need to manually merge new build configs in nuxt.config.js.')
          }
          const buildConfigs = `build: {
  // Currently 'lodash' is mainly brought by Elastic search JS lib.
  // Below lodash optimization can be reviewed after we migrate to new ES JS client.
  babel: {
    plugins: [
      'lodash'
    ]
  },
  extend (config, { isServer, loaders: { vue } }) {
    const webpack = require('webpack')
    const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
    config.plugins.push(new LodashModuleReplacementPlugin({
      'caching': true,
      'collections': true,
      'paths': true,
      'shorthands': true
    }))
    // Load moment 'en-au' locale only for performance.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You need to change it if your site is not in Australia.
    config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\\\]locale$/, /en-au/))
  }
}`
          defaultNode.find(j.Property, { key: { name: 'css' } })
            .insertAfter(buildConfigs)
          const out = rootData.toSource({ quote: 'single' })
          return out
        }
      }
    ]

    if (results.smoke || results.e2e) {
      actions.push(
        {
          type: 'add',
          files: ['**'],
          templateDir: `${templateDir}/_tests/_common`
        }
      )
    }

    if (results.smoke) {
      actions.push({
        type: 'add',
        files: ['**'],
        templateDir: `${templateDir}/_tests/_smoke`
      })
    }
    if (results.e2e) {
      // only add tests for enabled modules
      results.modules.forEach(tideModule => {
        const hasTests = fs.existsSync(path.resolve(__dirname, `${templateDir}/_tests/_modules/test/e2e/integration/core-modules/${tideModule}`))
        if (hasTests) {
          actions.push(
            {
              type: 'add',
              files: [`./test/e2e/integration/core-modules/${tideModule}/**`, `./test/e2e/fixtures/${tideModule}/**`],
              templateDir: `${templateDir}/_tests/_modules`
            }
          )
        }
      })
    }

    return actions
  },
  async completed () {
    console.log('Update to 21.0.0 complete!')
  }
}
