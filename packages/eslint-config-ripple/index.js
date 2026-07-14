module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: false
    }
  },
  env: {
    browser: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: ['@nuxt/eslint-config'],
  overrides: [
    {
      files: ['*.{vue,ts,js}'],
      rules: {
        // Override/add rules settings here
        'no-prototype-builtins': 'off',
        'vue/attribute-hyphenation': 'off',
        'vue/first-attribute-linebreak': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-v-html': 'off',
        'vue/v-on-event-hyphenation': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off', // allow explicit any types for now
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            varsIgnorePattern: 'props'
          }
        ],

        // Compatibility rules - remove when CI passes
        'no-extra-semi': 'off',
        'prefer-const': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/html-indent': 'off',
        'vue/html-self-closing': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off'
      }
    },
    {
      files: ['*.test.{ts,js}', '*.cy.{ts,js}'],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector:
              ':matches(MemberExpression[object.name="it"], MemberExpression[object.name="test"], MemberExpression[object.name="describe"])[property.name="only"]',
            message:
              'Do not commit .only in test files, this prevents other tests from running.'
          }
        ]
      }
    },
    {
      files: ['*.spec.ts'],
      parser: undefined // Will need to upgrade to eslint 10.x
    }
  ]
}
