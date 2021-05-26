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
        files: '.eslintrc.js',
        handler (data) {
          const j = jscodeshift

          return j(data).find(j.Property).forEach(prop => {
            // Update eslint rules
            if (prop.value.key.name === 'rules') {
              const newRules = `// allow async-await
'generator-star-spacing': 'off',
// allow debugger during development
'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
// disable converting single item array to use dot-notation
'dot-notation': 'off',
// allow ternary operator in single line
'multiline-ternary': ['error', 'never'],
// currently being disabled as it's complaining on for loop
'prefer-const': 'off',
// we should use single quote for consistency, also allowing backticks
quotes: ['off', 'single', { allowTemplateLiterals: true }]`
              prop.value.value.properties = []
              prop.value.value.properties.push(newRules)
            }
          }).toSource({ quote: 'single' })
        }
      }
    ]
    return actions
  },
  async completed () {
    console.log('SDP 1.34.0:')
    console.log('Enable eslint rules')
  }
}
