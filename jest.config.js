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
    '.*\\.(vue)$': '<rootDir>/node_modules/jest-vue-preprocessor'
  },
  'transformIgnorePatterns': [
    'node_modules/(?!(@dpc-sdp*)/)',
    '/node_modules/(?!(@storybook/.*\\.vue$))'
  ]
}
