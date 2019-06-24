module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    allowImportExportEverywhere: true
  },
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'jest'
  ],
  // add your custom rules here
  rules: {
    // allow debugger during development.
    // Currently there is a bug which causes breakpoint is not working.
    // https://github.com/nuxt/nuxt.js/issues/2734
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  globals: {}
}
