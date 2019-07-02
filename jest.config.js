module.exports = {
  'verbose': true,
  'testURL': 'http://localhost',
  'collectCoverage': true,
  'testMatch': ['**/unit/**/*.test.js', '**/*.test.js'],
  'moduleFileExtensions': [
    'js',
    'json',
    'vue'
  ],
  'transform': {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/packages/ripple-ui-components/node_modules/vue-jest',
    '^.+\\.md?$': 'markdown-loader-jest'
  },
  'transformIgnorePatterns': [
    'node_modules/(?!(@dpc-sdp*)/)',
    'node_modules/(?!(@storybook/.*\\.vue$|storybook-addon-vue-info|ol))',
    'packages/ripple-ui-components/node_modules/(?!(@storybook/.*\\.vue$|storybook-addon-vue-info|ol))'
  ],
  'setupFiles': ['jest-canvas-mock']
}
