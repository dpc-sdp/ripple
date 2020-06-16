#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const sao = require('sao')
const args = require('minimist')(process.argv.slice(2))
const compareVersions = require('compare-versions')
const log = require('./logger')
const { convertSdpVersion, needUpdate } = require('./helper')

const cli = async () => {
  // Set options from a config file path relative to CWD
  const configFile = args.config
  let configFileArgs = {}
  if (configFile && fs.existsSync(__dirname, configFile)) {
    configFileArgs = require(path.resolve(__dirname, configFile))
  }
  // param args take precedence
  const config = {
    ...configFileArgs,
    ...args
  }
  // split modules string into array
  if (typeof config.modules === 'string') {
    config.modules = config.modules.split(',')
  }

  // In a custom directory or current directory
  if (!process.argv[2]) {
    log('no project directory specified', 'error')
    process.exit(0)
  }

  const outDir = path.resolve(process.argv[2])
  const existing = fs.existsSync(`${outDir}/package.json`)

  let generator

  if (args.forcenew || existing) {
    const pkg = require(`${outDir}/package.json`)
    // If there is no `sdp_version`, fallback to `version`.
    let version = pkg.sdp_version || pkg.version
    // Convert old SDP release version like 18.0.0 to 1.18.0
    version = convertSdpVersion(version)

    let targetVersion = config.release

    if (!targetVersion) {
      targetVersion = 'latest'
    }

    // Do auto updates for 1.16.1 release and above.
    const minUpdateVersion = '1.16.1'
    // Quit if project under minimum version requirement
    if (compareVersions.compare(version, minUpdateVersion, '<')) {
      log('Cannot upgrade this version. Please use --forcenew flag to force new install.', 'error')
      process.exit(0)
    }

    log(`Your site ${outDir} current SDP version is ${version}`)

    // Load all update scripts
    const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())
    const updatesDir = path.join(__dirname, 'generators/updates')
    let updates = dirs(updatesDir)
    updates.splice(updates.indexOf('install'), 1)
    updates = updates.sort(compareVersions)

    // Run update saofile by given update name
    const runUpdateScript = async (name) => {
      generator = path.resolve(__dirname, `./generators/updates/${name}`)
      if (name === 'install') {
        log('Installing...')
      } else {
        log(`Updating ${outDir} to ${name}`)
      }

      await sao({ generator, outDir, logLevel: 2, config })
        .run()
        .catch((err) => {
          console.trace(err)
          process.exit(1)
        })
    }

    // Run all updates in version orders
    for (let i = 0; i < updates.length; i++) {
      const toVersion = updates[i]
      if (needUpdate(version, toVersion, targetVersion)) {
        await runUpdateScript(toVersion)
      }
    }

    // Install dependencies
    await runUpdateScript('install')
  } else {
    generator = path.resolve(__dirname, './generators/new')
    log(`Generating a new ripple project in ${outDir}`)
    sao({ generator, outDir, logLevel: 2, config })
      .run()
      .catch((err) => {
        console.trace(err)
        process.exit(1)
      })
  }
}

cli()
