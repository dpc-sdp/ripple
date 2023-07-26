'use strict'

module.exports = {
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      extends: ['stylelint-config-standard', 'stylelint-config-html']
    },
    {
      files: ['*.css', '**/*.css'],
      extends: ['stylelint-config-standard', 'stylelint-config-prettier']
    }
  ],
  rules: {
    'color-hex-length': 'long',
    'selector-class-pattern':
      '^(rpl|tide)-[a-z0-9]+(?:-[a-z0-9$]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?(?:\\[.+\\])?$',
    'custom-property-pattern': '(rpl|local)-[a-z0-9]+(?:-[a-z0-9$()]+)+',
    'value-keyword-case': [
      'lower',
      {
        ignoreProperties: ['--rpl-type-font-family']
      }
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['for', 'each']
      }
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['$', 'v-bind']
      }
    ],
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['padding', 'margin']
      }
    ],
    'import-notation': null
  }
}
