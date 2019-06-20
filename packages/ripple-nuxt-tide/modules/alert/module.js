const path = require('path')

module.exports = function () {
  const options = this.options.tide
  if (options.modules['alert'] === 1) {
    this.addPlugin(path.resolve(__dirname, 'plugin.js'))
    this.addPlugin(path.resolve(__dirname, 'localstorage.js'))
  }
}
