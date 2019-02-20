/**
 * Adds package dependencies to:
 * * Root `./package.json`
 * * Components `./packages/.../package.json`
 *
 * Requires each ripple component package to have:
 *
 * 1. A `package.json` file with:
 *   - name
 * 2. A `lerna.json` file with:
 *   - version
 *
 * Script expects to be called via npm in the root directory:
 *
 *   `npm run package-dependencies`
 */

const utils = require('./dependency-utils')

// Get all ripple packages and add depdendencies.
const packages = utils.getPackageDirectories()

// Add all ripple `./packages/` to `./package.json`.
utils.addComponentsToRootPackage(packages)

// Add all imported ripple `./packages/` to `./packages/**/package.json`.
utils.fixMissingPackages(packages)
