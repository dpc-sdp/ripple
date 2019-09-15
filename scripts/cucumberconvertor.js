const cucumberJunitConvert = require('cucumber-junit-convert')
const glob = require('glob-fs')({ gitignore: false })

const files = glob.readdirSync('./test-results/cucumber/*.json')
files.forEach(f => {
  const filename = f.replace(/\.[^/.]+$/, '')
  cucumberJunitConvert.convert({
    inputJsonFile: `./${filename}.json`,
    outputXmlFile: `./${filename}.xml`
  })
})
