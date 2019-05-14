/**
 * Utility methods which provide functionality to
 * the `npm run package-dependencies` command.
 */

let fs = require('fs')

function getImportStatmentsFromVueFiles (directoryArray) {
  const importSet = new Set()
  directoryArray.forEach(vue => {
    const vueData = fs.readFileSync(vue, 'utf-8')
    // Find import statements in Styles / JavaScript.
    const regEx = new RegExp('(@import "~|import .* from \')(@dpc-sdp/ripple-.*)(\'|")', 'gi')
    let lastMatch = regEx.exec(vueData)
    while (lastMatch !== null) {
      if (lastMatch && lastMatch.length >= 2) {
        const importStatement = lastMatch[2]
        if (importStatement.indexOf('@dpc-sdp/ripple-') === 0) {
          const firstSlashPos = importStatement.indexOf('/')
          const secondSlashPos = importStatement.indexOf('/', firstSlashPos + 1)
          if (secondSlashPos < 0) {
            importSet.add(importStatement)
          } else {
            // Clip off any subfolders from import path.
            importSet.add(importStatement.substr(0, secondSlashPos))
          }
        }
      }
      lastMatch = regEx.exec(vueData)
    }
  })
  return importSet
}

function listMissingPackages (packageDirectories) {
  const missing = []
  packageDirectories.forEach(pkg => {
    // Get each package.
    let pkgPath = pkg.substr(0, (pkg.lastIndexOf('/')))
    let pkgObj = fs.readFileSync(pkg)
    pkgObj = JSON.parse(pkgObj)

    // Get vue files within folder.
    let vueglob = require('glob-fs')({ gitignore: true })
    let vues = vueglob.readdirSync(pkgPath + `/*.vue`)

    // Get imported ripple packages for used vues.
    const imports = getImportStatmentsFromVueFiles(vues)

    imports.forEach(neededPackage => {
      if (pkgObj.dependencies[neededPackage] == null) {
        missing.push(`${pkgPath} - missing dependency - "${neededPackage}"`)
      }
    })
  })
  return missing
}

function fixMissingPackages (packageDirectories) {
  // Get lerna version.
  let lerna = fs.readFileSync('./lerna.json', 'utf-8')
  lerna = JSON.parse(lerna)

  packageDirectories.forEach(pkg => {
    // Get each package.
    let pkgPath = pkg.substr(0, (pkg.lastIndexOf('/')))
    let pkgObj = fs.readFileSync(pkg)
    pkgObj = JSON.parse(pkgObj)

    // Get vue files within folder.
    let vueglob = require('glob-fs')({ gitignore: true })
    let vues = vueglob.readdirSync(pkgPath + `/*.vue`)

    // Get imported ripple packages for used vues.
    const imports = getImportStatmentsFromVueFiles(vues)

    // Strip existing @dpc-sdp keys.
    for (let key in pkgObj.dependencies) {
      if (key.indexOf('@dpc-sdp/ripple-') === 0) {
        delete pkgObj.dependencies[key]
      }
    }

    // Add ripple packages.
    imports.forEach(neededPackage => {
      pkgObj.dependencies[neededPackage] = lerna.version
    })

    orderDependencies(pkgObj)

    // Write package.json.
    fs.writeFileSync(pkg, `${JSON.stringify(pkgObj, null, 2)}\n`)
  })
}

function orderDependencies (obj) {
  const orderedDependencies = {}
  Object.keys(obj.dependencies).sort().forEach(key => {
    orderedDependencies[key] = obj.dependencies[key]
  })
  obj.dependencies = orderedDependencies
}

function getPackageDirectories () {
  let pkgglob = require('glob-fs')({ gitignore: true })
  return pkgglob.readdirSync('./packages/**/package.json')
}

function addComponentsToRootPackage (packageDirectories) {
  // Get root Package JSON.
  let packageJson = fs.readFileSync('./package.json')
  packageJson = JSON.parse(packageJson)

  // Strip existing @dpc-sdp keys from root package.
  for (let key in packageJson.dependencies) {
    if (key.indexOf('@dpc-sdp/ripple-') === 0) {
      delete packageJson.dependencies[key]
    }
  }

  // Add ripple packages to root dependencies.
  packageDirectories.forEach(pkg => {
    let pkgPath = pkg.substr(0, (pkg.lastIndexOf('/')))
    let pkgJson = fs.readFileSync(pkg)
    pkgJson = JSON.parse(pkgJson)
    packageJson.dependencies[pkgJson.name] = `file:${pkgPath}`
  })

  orderDependencies(packageJson)

  // Save root package.json.
  fs.writeFileSync('./package.json', `${JSON.stringify(packageJson, null, 2)}\n`)
}

module.exports = {
  listMissingPackages: listMissingPackages,
  fixMissingPackages: fixMissingPackages,
  getPackageDirectories: getPackageDirectories,
  orderDependencies: orderDependencies,
  addComponentsToRootPackage: addComponentsToRootPackage
}
