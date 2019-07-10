/**
 * Generates a Package and folder for a new package, based off the default
 * templates.
 */

let Twig = require('twig')
let fs = require('fs')
let path = require('path')

if (process.argv.length < 5) {
  console.error('Missing arguments: npm run new-package "[Package name]" "[Package description]" "[Atoms / Molecules / Organisms]"')
  console.log('e.g. npm run new-package "My Package" "A package to..." "Organisms"')
  return true
}

let lerna = fs.readFileSync('./lerna.json', 'utf-8')
lerna = JSON.parse(lerna)

// Arguments
let packageName = process.argv.length > 2 ? process.argv[2] : 'My Package'
let description = process.argv.length > 3 ? process.argv[3] : 'A package for...'
let atom = process.argv.length > 4 ? process.argv[4] : 'Organisms'
let version = lerna.version

// Helper functions
function getSnakeCase (val) {
  return val.toLowerCase().replace(/\s/gi, '-')
}

function getTitleCase (val) {
  const arr = val.split(' ')
  for (let i = 0; i < arr.length; i++) {
    let word = arr[i]
    arr[i] = word[0].toUpperCase() + word.substr(1).toLowerCase()
  }
  return arr.join(' ')
}

function getTitleCaseNoSpace (val) {
  return getTitleCase(val).replace(/\s/gi, '')
}

function getCamelCase (val) {
  const word = getTitleCaseNoSpace(val)
  return (word[0].toLowerCase() + word.substr(1))
}

// Get Names
let data = {
  packageNaturalName: getTitleCase(packageName),
  packageSpacelessName: getTitleCaseNoSpace(packageName),
  packageFileName: getTitleCaseNoSpace(packageName),
  packageDemoDataName: getCamelCase(packageName),
  packageRippleName: 'Rpl' + getTitleCaseNoSpace(packageName),
  packageClassName: 'rpl-' + getSnakeCase(packageName),
  packagePackageName: 'ripple-' + getSnakeCase(packageName),
  packageRippleExportName: '{ ' + 'Rpl' + getTitleCaseNoSpace(packageName) + ' }',
  packageDescription: description,
  packageAtomFolder: getTitleCaseNoSpace(atom),
  packageVersion: version
}
const directory = './packages/' + data.packageAtomFolder + '/' + data.packageSpacelessName + '/'
const files = [
  { template: '.npmignore', output: '.npmignore' },
  { template: 'package_template.vue', output: data.packageSpacelessName + '.vue' },
  { template: 'index_template.js', output: 'index.js' },
  { template: 'LICENSE', output: 'LICENSE' },
  { template: 'package_template.json', output: 'package.json' },
  { template: 'stories_template.js', output: 'stories.js' }
]

// Make folder
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory)
}
// Create all files
files.forEach((item) => {
  Twig.renderFile(path.join(__dirname, item.template), data, (err, twigOutput) => {
    if (err) {
      console.log(err)
    } else {
      fs.writeFileSync(directory + item.output, twigOutput)
    }
  })
})

console.log(`Created "${getTitleCase(packageName)}"`)
