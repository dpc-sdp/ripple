module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    "vue"
  ],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
    "^.+\\.md?$": "markdown-loader-jest"
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(@storybook/.*\\.vue$|storybook-addon-vue-info))"
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
  verbose: true,
}
