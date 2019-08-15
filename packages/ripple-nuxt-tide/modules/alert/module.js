const { resolve } = require('path')
module.exports = function () {
  this.addPlugin({
    src: resolve(__dirname, 'alert-middleware.js'),
    fileName: './alert-middleware.js'
  })
}