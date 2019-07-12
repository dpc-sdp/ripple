/**
 * Generates a Package and folder for a new component, based off the default
 * templates.
 */

let Twig = require('twig')
let fs = require('fs')
let path = require('path')
const packageManager = 'yarn'
const componentDirectory = '../packages/components'

if (process.argv.length < 5) {
  console.error(`Missing arguments: ${packageManager} run new-component:storybook "[Component name]" "[Component description]" "[Atoms / Molecules / Organisms]"`)
  console.log(`e.g. ${packageManager} run new-component:storybook "My Component" "A component to..." "Organisms"`)
  return true
}

let pkg = fs.readFileSync('./package.json', 'utf-8')

// Arguments
let componentName = process.argv.length > 2 ? process.argv[2] : 'My Component'
let description = process.argv.length > 3 ? process.argv[3] : 'A component for...'
let atom = process.argv.length > 4 ? process.argv[4] : 'Organisms'
let version = JSON.parse(pkg).version

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
const directory = componentDirectory + '/' + data.componentAtomFolder + '/' + data.componentSpacelessName + '/'
const files = [
  { template: '.npmignore', output: '.npmignore' },
  { template: 'component_template.vue', output: data.componentSpacelessName + '.vue' },
  { template: 'index_template.js', output: 'index.js' },
  { template: 'LICENSE', output: 'LICENSE' },
  { template: 'component_template.json', output: 'package.json' },
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
console.log(`\nTo complete setup, run:`)
console.log(`- ${packageManager} run docs:storybook`)
console.log(`- ${packageManager} run package-dependencies:storybook\n`)
