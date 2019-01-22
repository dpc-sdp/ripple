/**
 * Adds package dependencies to the ripple package.json file based on available
 * packages.
 *
 * Requires each ripple package to have:
 *
 *   1. A `package.json` file with:
 *     - name
 *
 * Script expects to be called via npm in the root directory:
 *
 *   `npm run package-dependencies`
 */

let fs = require('fs')
let glob = require('glob-fs')({ gitignore: true })

// Get Package JSON.
let packageJson = fs.readFileSync('./package.json')
packageJson = JSON.parse(packageJson)

// Strip existing @dpc-sdp keys.
for (let key in packageJson.dependencies) {
  if (key.indexOf('@dpc-sdp') === 0) {
    delete packageJson.dependencies[key]
  }
}

// Get all ripple packages and add depdendencies.
let packages = glob.readdirSync('./packages/**/package.json')
packages.forEach(pkg => {
  let pkgPath = pkg.substr(0, (pkg.lastIndexOf('/')))
  let pkgJson = fs.readFileSync(pkg)
  pkgJson = JSON.parse(pkgJson)
  packageJson.dependencies[pkgJson.name] = `file:${pkgPath}`
})

// Order dependencies alphabetically.
const orderedDependencies = {}
Object.keys(packageJson.dependencies).sort().forEach(function(key) {
  orderedDependencies[key] = packageJson.dependencies[key]
})
packageJson.dependencies = orderedDependencies

// Save to package.json.
fs.writeFileSync('./package.json', `${JSON.stringify(packageJson, null, 2)}\n`)
