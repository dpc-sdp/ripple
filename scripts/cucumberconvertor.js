const fs = require('fs')
const cucumberJunitConvert = require('cucumber-junit-convert')
const glob = require('glob-fs')({ gitignore: false })

const tests = glob.readdirSync('./test-results/cucumber/*.json')

tests.forEach(f => {
  const filename = f.replace(/\.[^/.]+$/, '')
  cucumberJunitConvert.convert({
    inputJsonFile: `./${filename}.json`,
    outputXmlFile: `./${filename}.xml`
  })
  try {
    fs.unlinkSync(f)
  } catch (err) {
    console.error(err)
  }
})
