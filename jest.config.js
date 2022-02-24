module.exports = {
  verbose: true,
  testURL: 'http://localhost',
  collectCoverage: true,
  testMatch: ['**/unit/**/*.test.js', '**/*.test.js'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  setupFiles: ['<rootDir>/.jest/register-context.js', 'jest-canvas-mock'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.mdx?$': '@storybook/addon-docs/jest-transform-mdx',
    '^.+\\.stories\\.js|^.+\\.mdx?$':
      '@storybook/addon-storyshots/injectFileName',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': 'vue3-jest',
    '^.+\\.md?$': 'markdown-loader-jest',
    '^.+\\.html?$': 'html-loader-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!(ripple-*)/)'],
  moduleNameMapper: {
    // @TODO storybook storyshots fails with MDX.
    // Add it to filemock until they fix it. https://github.com/storybookjs/storybook/issues/7223#issuecomment-506912633
    '\\.(mdx|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|svg)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js'
  }
}
