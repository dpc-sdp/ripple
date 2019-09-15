module.exports = {
  verbose: true,
  testURL: 'http://localhost',
  collectCoverage: true,
  testMatch: ['**/unit/**/*.test.js', '**/*.test.js'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  setupFiles: ['<rootDir>/.jest/register-context.js', 'jest-canvas-mock'],
  setupFilesAfterEnv: ['<rootDir>/.jest/moment.js'],
  reporters: ['default', 'jest-junit'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/jest-vue-preprocessor',
    '^.+\\.md?$': 'markdown-loader-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@dpc-sdp*|ol|ol-ext|storybook-addon-vue-info|@storybook*)/)'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|svg)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js'
  }
}
