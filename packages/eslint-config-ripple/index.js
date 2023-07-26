module.exports = {
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: ['prettier', 'plugin:storybook/recommended', '@nuxt/eslint-config'],
  rules: {
    // override/add rules settings here
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/no-v-html': 'off',
    'no-prototype-builtins': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // allow explicit any types for now
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: 'props'
      }
    ]
  }
}
