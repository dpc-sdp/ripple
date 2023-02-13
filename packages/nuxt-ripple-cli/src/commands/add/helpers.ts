import { paramCase, pascalCase } from 'change-case'
export default {
  helpers: {
    tidepackagename: function (string) {
      return `Tide${pascalCase(string)}`
    },
    rplcomponentname: function (string) {
      return `Rpl${pascalCase(string)}`
    },
    rplclassname: function (string) {
      return `rpl-${paramCase(string)}`
    }
  }
}
