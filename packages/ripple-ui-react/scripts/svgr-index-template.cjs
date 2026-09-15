const path = require('node:path')

module.exports = function svgrIndexTemplate(filePaths) {
  const imports = filePaths.map(({ path: filePath }) => {
    const basename = path.basename(filePath, path.extname(filePath))
    return `import ${basename} from './${basename}'`
  })

  const namedExports = filePaths.map(({ path: filePath }) => {
    const basename = path.basename(filePath, path.extname(filePath))
    return `export { ${basename} }`
  })

  const registryEntries = filePaths.map(({ path: filePath, originalPath }) => {
    const basename = path.basename(filePath, path.extname(filePath))
    const iconName = path.basename(originalPath, path.extname(originalPath))
    return `  ${JSON.stringify(iconName)}: async () => ({ default: ${basename} })`
  })

  const iconNames = filePaths.map(({ originalPath }) =>
    JSON.stringify(path.basename(originalPath, path.extname(originalPath)))
  )

  return `${imports.join('\n')}\n\n${namedExports.join('\n')}\n\nconst customIconImports = {\n${registryEntries.join(',\n')}\n}\n\nexport const RplCustomIconNames = [${iconNames.join(', ')}]\nexport default customIconImports\n`
}
