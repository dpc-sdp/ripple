const { resolve } = require('path')
module.exports = function () {
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: './alert-plugin.js'
  })
}
