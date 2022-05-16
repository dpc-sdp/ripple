const { paramCase, pascalCase } = require('change-case')
module.exports = {
  helpers: {
    rplcomponentname: function (string) {
      return `Rpl${pascalCase(string)}`
    },
    rplclassname: function (string) {
      return `rpl-${paramCase(string)}`
    }
  }
}
