import { paramCase, pascalCase, pascalCaseTransformMerge } from 'change-case'
export default {
  pascalCaseMerge: function (name) {
    return pascalCase(name, { transform: pascalCaseTransformMerge })
  },
  prefixedPascalCase: function (prefix, name) {
    return `${pascalCase(prefix)}${pascalCase(name)}`
  },
  prefixedParamCase: function (prefix, name) {
    return `${paramCase(prefix)}-${paramCase(name)}`
  }
}
