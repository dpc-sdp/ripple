const common = require('./../../common')
const templateDir = './../../../template'
const jscodeshift = require('jscodeshift')

module.exports = {
  ...common,
  templateDir,
  actions () {
    const actions = [
      {
        type: 'modify',
        files: 'package.json',
        handler (data) {
          data.dependencies['nuxt'] = `2.15.2`
          data.devDependencies['@babel/eslint-parser'] = `^7.12.13`
          data.devDependencies['@babel/eslint-plugin'] = `^7.12.13`
          data.devDependencies['cross-env'] = `^7.0.3`
          data.devDependencies['eslint'] = `^7.19.0`
          data.devDependencies['eslint-config-standard'] = `^16.0.2`
          data.devDependencies['eslint-friendly-formatter'] = `^4.0.1`
          data.devDependencies['eslint-loader'] = `^4.0.2`
          data.devDependencies['eslint-plugin-jest'] = `^24.1.3`
          data.devDependencies['eslint-plugin-node'] = `^11.1.0`
          data.devDependencies['eslint-plugin-promise'] = `^4.2.1`
          data.devDependencies['eslint-plugin-standard'] = `^5.0.0`
          data.devDependencies['eslint-plugin-vue'] = `^7.5.0`
          // Delete babel-eslint as this is now replaced with @babel/eslint-parser
          delete data.devDependencies['babel-eslint']
          return data
        }
      },
      {
        type: 'modify',
        files: '.eslintrc.js',
        handler (data) {
          const j = jscodeshift

          return j(data).find(j.Property).forEach(prop => {
            // Update eslint parser from babel-eslint to @babel/eslint-parser
            if (prop.value.value.value === 'babel-eslint') {
              prop.value.value.value = '@babel/eslint-parser'
            }

            // Disable babel configFile
            if (prop.value.key.name === 'parserOptions') {
              prop.value.value.properties.push(j.property(
                'init',
                j.identifier('requireConfigFile'),
                j.literal(false)
              ))
            }

            // Add eslint rules
            if (prop.value.key.name === 'rules') {
              const newRules = `// TODO enable the rules to achieve lint standard consistency towards projects
'array-bracket-spacing': 'off',
'array-callback-return': 'off',
'dot-notation': 'off',
'func-call-spacing': 'off',
'jest/expect-expect': 'off',
'jest/no-standalone-expect': 'off',
'jest/no-try-expect': 'off',
'jest/no-conditional-expect': 'off',
'lines-between-class-members': 'off',
'multiline-ternary': 'off',
'no-case-declarations': 'off',
'no-prototype-builtins': 'off',
'node/no-deprecated-api': 'off',
'prefer-const': 'off',
'prefer-regex-literals': 'off',
'quotes': ['off', 'single', { 'allowTemplateLiterals': true }],
'quote-props': 'off',
'vue/no-mutating-props': 'off',
'vue/no-unused-components': 'off',
'vue/no-use-v-if-with-v-for': 'off',
'vue/return-in-computed-property': 'off',
'no-trailing-spaces': 'off',
'object-curly-spacing': 'off',
'no-var': 'off'`
              prop.value.value.properties.push(newRules)
            }
          }).toSource({ quote: 'single' })
        }
      }
    ]
    return actions
  },
  async completed () {
    console.log('SDP 1.32.0:')
    console.log('Upgrade eslint plugins')
  }
}
