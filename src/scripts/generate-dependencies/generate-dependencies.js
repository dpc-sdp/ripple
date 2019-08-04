/**
 * Adds package dependencies to:
 * * Root `./package.json`
 * * Components `./components/.../package.json`
 *
 * Requires:
 *
 * 1. Each ripple component package to have a `package.json` file with:
 *   - name
 *   - version
 *
 * Script expects to be called via npm in the root directory:
 *
 *   `npm run package-dependencies`
 */

const utils = require('./dependency-utils')

// Get all ripple packages and add depdendencies.
const packages = utils.getPackageDirectories()

// Add all ripple `./components/` to `./package.json`.
utils.addComponentsToRootPackage(packages)

// Add all imported ripple `./components/` to `./components/**/package.json`.
utils.fixMissingPackages(packages)
