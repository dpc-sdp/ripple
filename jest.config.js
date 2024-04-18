module.exports = {
  verbose: true,
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  collectCoverage: true,
  testMatch: ['**/*.test.js', '**/*.test.ts'],
  moduleFileExtensions: ['js', 'ts', 'vue'],
  modulePathIgnorePatterns: ['node_modules', '.jest-test-results.json', 'dist'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.ts$': '<rootDir>/node_modules/ts-jest',
    '.*\\.vue$': '<rootDir>/node_modules/@vue/vue3-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!.pnpm)(?!(ripple-*|lodash-es)/)'],
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // @TODO storybook storyshots fails with MDX.
    // Add it to filemock until they fix it. https://github.com/storybookjs/storybook/issues/7223#issuecomment-506912633
    '\\.(mdx|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|svg)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^uncrypto': require.resolve('uncrypto')
  },
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js']
}
