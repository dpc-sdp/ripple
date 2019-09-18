const path = require('path')

module.exports = function () {
  // Override the default layout
  this.addLayout(path.resolve(__dirname, './layouts/default.vue'), 'default')
}
