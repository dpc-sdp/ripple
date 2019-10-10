const glob = require('glob-fs')({ gitignore: true })
const fs = require('fs')

function testPackageVersion () {
  // Get Version from Lerna to test packages against.
  const lerna = fs.readFileSync('lerna.json', 'utf-8')
  const currentVersion = JSON.parse(lerna).version
  const errors = []

  // Get all existing packages.
  let packages = glob.readdirSync('./packages/components/**/package.json')
  packages.forEach(item => {
    let pack = fs.readFileSync(item, 'utf-8')
    pack = JSON.parse(pack)
    // Check package version.
    if (pack.version !== currentVersion) {
      errors.push(`${pack.name} version is ${pack.version} but should be ${currentVersion}`)
    }
    // Check package dependency versions for ripple packages.
    for (let key in pack.dependencies) {
      if ((key.indexOf('@dpc-sdp/ripple-') === 0) && (pack.dependencies[key] !== currentVersion)) {
        errors.push(`${pack.name} dependency ${key} is ${pack.dependencies[key]} but should be ${currentVersion}`)
      }
    }
  })

  return errors
}

describe('Packages', () => {
  test('all package versions are up to date', async () => {
    expect(testPackageVersion()).toHaveLength(0)
  })
})
