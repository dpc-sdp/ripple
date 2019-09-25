module.exports = {
  verbose: true,
  moduleNameMapper: {
    '~(.*)$': '<rootDir>/$1', // Add nuxt root alias in jest
    '^vue$': 'vue/dist/vue.esm.js'
  },
  testURL: 'http://localhost',
  collectCoverage: true,
  testMatch: ['**/*.test.js'],
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!(@dpc-sdp*)/)']
}
