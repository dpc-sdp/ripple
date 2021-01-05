const utils = require('./../generate-dependencies/dependency-utils')
let fs = require('fs')

const componentDirectory = '../packages/components'
const packages = utils.getPackageDirectories(componentDirectory)

let loadedReadme = fs.readFileSync('./../RIPPLE_COMPONENTS.md', 'utf8')
let replacedHTML = replaceGeneratedContent(loadedReadme)
fs.writeFileSync('./../RIPPLE_COMPONENTS.md', replacedHTML)


function replaceGeneratedContent (readme) {
  let workingReadme = readme
  const start = '<!-- GENERATED_DOCS -->'
  const end = '<!-- /GENERATED_DOCS -->'
  const tagStartPos = workingReadme.indexOf(start) + start.length
  const tagEndPos = workingReadme.indexOf(end)
  if (tagStartPos > 0 && tagEndPos > 0) {
    let newReadme = ''
    newReadme += workingReadme.substring(0, tagStartPos)
    newReadme += '\n'
    newReadme += generate()
    newReadme += '\n'
    newReadme += workingReadme.substring(tagEndPos)
    workingReadme = newReadme
  }
  return workingReadme
}

function generate() {
  let list = '| Package | Version | Description |\n| --- | --- | --- |\n'
  packages.forEach(pkg => {
    let pkgJson = fs.readFileSync(pkg)
    pkgJson = JSON.parse(pkgJson)
    list += `| [${pkgJson.name}](https://www.npmjs.com/package/${pkgJson.name}) | <a href="https://www.npmjs.com/package/${pkgJson.name}"><img src="https://img.shields.io/npm/v/${pkgJson.name}" alt="Version"></a> | ${pkgJson.description} |\n`
  })
  return list
}
