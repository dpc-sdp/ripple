const glob = require('glob-fs')({ gitignore: true })
const fs = require('fs')

function testPackageDefinition () {
  const pack = fs.readFileSync('package.json', 'utf-8')

  // Get current packages
  const currDeps = JSON.parse(pack).dependencies
  let definedPackages = []
  for (let key in currDeps) {
    if (key.indexOf('@dpc-sdp') === 0) {
      definedPackages.push(key)
    }
  }

  // Get all existing packages.
  const neededDeps = []
  let packages = glob.readdirSync('./components/**/package.json')
  packages.forEach(item => {
    const pk = fs.readFileSync(item, 'utf-8')
    neededDeps.push(JSON.parse(pk).name)
  })

  // Check defined against needed.
  let packageMap = {}
  definedPackages.forEach(item => {
    packageMap[item] = { packageJson: true, component: false }
  })
  neededDeps.forEach(item => {
    if (packageMap[item] === undefined) {
      packageMap[item] = { packageJson: false, component: true }
    } else {
      packageMap[item].component = true
    }
  })
  let errors = []
  for (let key in packageMap) {
    const def = packageMap[key]
    if (def.packageJson === false || def.component === false) {
      errors.push(`Missing definition: ${key} -> package.json [${def.packageJson}], component [${def.component}]`)
    }
  }
  return errors
}

describe('Packages', () => {
  test('has all components been added to packages.json', async () => {
    expect(testPackageDefinition()).toHaveLength(0)
  })
})
