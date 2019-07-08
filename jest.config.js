module.exports = {
  'verbose': true,
  'testURL': 'http://localhost',
  'collectCoverage': true,
  'testMatch': ['**/unit/**/*.test.js'],
  'moduleFileExtensions': [
    'js',
    'json',
    'vue'
  ],
  'transform': {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  'transformIgnorePatterns': ['node_modules/(?!(@dpc-sdp*)/)']
}
