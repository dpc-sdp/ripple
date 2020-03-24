#!/usr/bin/env node
const cucumberJunitConvert = require('cucumber-junit-convert')
const glob = require('glob')
const folder = process.argv.slice(2)[0]
if (!folder) {
  console.error('Exiting: no folder defined')
  process.exit(1)
}

try {
  const files = glob.sync(`${folder}/*.json`)
  if (!files || files.length === 0) {
    console.error('Exiting: no files to process')
    process.exit(1)
  }
  files.forEach(f => {
    const filename = f.replace(/\.[^/.]+$/, '')
    cucumberJunitConvert.convert({
      inputJsonFile: `${filename}.json`,
      outputXmlFile: `${filename}.xml`
    })
  })
  console.log(`Converted ${files.length} cucumber files`)
  process.exit(0)
} catch (error) {
  console.error('ERROR:', error)
  process.exit(1)
}
