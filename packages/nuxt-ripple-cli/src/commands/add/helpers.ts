import { paramCase, pascalCase } from 'change-case'
export default {
  prefixedPascalCase: function (prefix, name) {
    return `${pascalCase(prefix)}${pascalCase(name)}`
  },
  prefixedParamCase: function (prefix, name) {
    return `${paramCase(prefix)}-${paramCase(name)}`
  }
}
