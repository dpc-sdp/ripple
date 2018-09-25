/**
 * Generates a Component and folder for a new package, based off the default
 * templates.
 */

let Twig = require('twig')
let fs = require('fs')
let path = require('path')

if (process.argv.length < 5) {
  console.error('Missing arguments: npm run new-component "[Component name]" "[Component description]" "[Atoms / Molecules / Organisms]"')
  console.log('e.g. npm run new-component "My Component" "A component to..." "Organisms"')
  return true
}

let lerna = fs.readFileSync('./lerna.json', 'utf-8')
lerna = JSON.parse(lerna)

// Arguments
let componentName = process.argv.length > 2 ? process.argv[2] : 'My Component'
let description = process.argv.length > 3 ? process.argv[3] : 'A component for...'
let atom = process.argv.length > 4 ? process.argv[4] : 'Organisms'
let version = lerna.version

// Helper functions
function getSnakeCase (val) {
  return val.toLowerCase().replace(' ', '-')
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
  componentNaturalName: getTitleCase(componentName),
  componentSpacelessName: getTitleCaseNoSpace(componentName),
  componentFileName: getTitleCaseNoSpace(componentName),
  componentDemoDataName: getCamelCase(componentName),
  componentRippleName: 'Rpl' + getTitleCaseNoSpace(componentName),
  componentClassName: 'rpl-' + getSnakeCase(componentName),
  componentPackageName: 'ripple-' + getSnakeCase(componentName),
  componentRippleExportName: '{ ' + 'Rpl' + getTitleCaseNoSpace(componentName) + ' }',
  componentDescription: description,
  componentAtomFolder: getTitleCaseNoSpace(atom),
  componentVersion: version
}
const directory = './packages/' + data.componentAtomFolder + '/' + data.componentSpacelessName + '/'
const files = [
  { template: '.npmignore', output: '.npmignore' },
  { template: 'component_template.vue', output: data.componentSpacelessName + '.vue' },
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

console.log(`Created "${getTitleCase(componentName)}"`)
