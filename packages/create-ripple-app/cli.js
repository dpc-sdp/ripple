#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const sao = require('sao')
const args = require('minimist')(process.argv.slice(2))
const compareVersions = require('compare-versions')

const log = (msg, lvl = 'info') => {
  switch (lvl) {
    case 'error':
      console.error(`ERROR: ${msg}`)
      break
    case 'info':
      console.info(`> ${msg}`)
      break
    default:
      console.log(`> ${msg}`)
      break
  }
}

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
    const version = pkg.version
    const targetVersion = config.release

    // Do auto updates for 18 release and above.
    // TODO: It may will have issues when complex refactoring happened in several versions with one script.
    // Can be reviewed later.
    const minUpdateVersion = '18.0.0'
    // Less than v18
    if (compareVersions(version, minUpdateVersion) === -1) {
      log('Cannot upgrade this version. Please use --forcenew flag to force new install.', 'error')
      process.exit(0)
    }

    log(`Your site ${outDir} current version is ${version}`)

    // Less than v20
    if (compareVersions(version, '20.0.0', '<=')) {
      if (path.resolve(__dirname, `./generators/updates/${minUpdateVersion}`)) {
        generator = path.resolve(__dirname, `./generators/updates/${minUpdateVersion}`)
        log(`Updating ${outDir} to 20.0.0`)

        await sao({ generator, outDir, logLevel: 2, config })
          .run()
          .catch((err) => {
            console.trace(err)
            process.exit(1)
          })
      }
    }

    // Less than v21
    if (compareVersions(version, '21.0.0', '<=') && compareVersions(targetVersion, '20.0.0', '>')) {
      if (path.resolve(__dirname, `./generators/updates/20.0.0`)) {
        generator = path.resolve(__dirname, `./generators/updates/20.0.0`)
        log(`Updating ${outDir} to 21.0.0`)
        await sao({ generator, outDir, logLevel: 2, config })
          .run()
          .catch((err) => {
            console.trace(err)
            process.exit(1)
          })
      }
    }

    generator = path.resolve(__dirname, `./generators/updates/install`)
    await sao({ generator, outDir, logLevel: 2, config })
      .run()
      .catch((err) => {
        console.trace(err)
        process.exit(1)
      })
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
