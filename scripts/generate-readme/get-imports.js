let fs = require('fs')

function getImportStatements (pkgdirectory) {
  const importStatements = []
  const pkg = fs.readFileSync(pkgdirectory, 'utf-8')
  const packageData = JSON.parse(pkg)
  const packageMain = packageData.main
  const packageName = packageData.name
  const importedFile = fs.readFileSync(pkgdirectory.replace('package.json', packageMain), 'utf-8')

  if (packageMain.indexOf('.js') > -1) {
    const reg = new RegExp('export\\s({|default)\\s*([A-Za-z]+)', 'gi')
    const batchCurlies = []
    let importDefault = null

    // Match
    let lastMatch = reg.exec(importedFile)
    while (lastMatch !== null) {
      if (lastMatch && lastMatch.length === 3) {
        const type = lastMatch[1]
        const name = lastMatch[2]
        if (type === '{') {
          batchCurlies.push(name)
        } else {
          importDefault = name
        }
      }
      lastMatch = reg.exec(importedFile)
    }
    // Add to array
    if (batchCurlies.length > 0) {
      importStatements.push(`import { ${batchCurlies.toString().replace(/,/gi, ', ')} } from '${packageName}'`)
    }
    if (importDefault !== null && batchCurlies.indexOf(importDefault) < 0) {
      importStatements.push(`import ${importDefault} from '${packageName}'`)
    }
  } else {
    // Assume a .vue file.
    const reg = new RegExp('name: \'(.*)\'', 'gi')
    let lastMatch = reg.exec(importedFile)
    if (lastMatch !== null) {
      importStatements.push(`import ${lastMatch[1]} from '${packageName}'`)
    }
  }
  return importStatements
}

module.exports = getImportStatements
