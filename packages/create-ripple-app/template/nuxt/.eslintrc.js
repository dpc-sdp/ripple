// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    allowImportExportEverywhere: true
  },
  env: {
    browser: true,
    jest: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard',
    "plugin:jest/recommended"
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'jest'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
