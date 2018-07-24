/**
 * Generates a README.md for each individual package, based off the template
 * README_template.md.
 *
 * Requires each package to have:
 *
 *   1. A `package.json` file with:
 *     - name
 *     - description
 *     - dependencies
 *
 *   2. A `stories.js` file with the following functions defined:
 *     - `storiesOf('Story/Element', ...`
 *     - `.add('Button', ...`
 *
 * Script expects to be called via npm in the root directory:
 *
 *   `npm run docs`
 */

let Twig = require('twig')
let fs = require('fs')
let path = require('path')
let glob = require('glob-fs')({ gitignore: true })
let wrap = require('wordwrap')(80)

function generateTemplate (directory) {
  let data = {
    packageName: '',
    packageDescription: '',
    packageDependencies: '',
    storybookParams: []
  }

  // Get package data.
  let file = fs.readFileSync(directory + 'package.json', 'utf8')
  let jsonFile = JSON.parse(file)

  data.packageName = wrap(jsonFile.name)
  data.packageDescription = wrap(jsonFile.description)

  // Get dependencies.
  let deps = []
  for (let key in jsonFile.dependencies) {
    deps.push(key)
  }
  for (let i = 0; i < deps.length; i++) {
    const key = deps[i]
    if (i < deps.length - 1) {
      data.packageDependencies += '├── ' + key + '\n'
    } else {
      data.packageDependencies += '└── ' + key
    }
  }

  // Get story parameters.
  let story = fs.readFileSync(directory + 'stories.js', 'utf8')
  let storiesOf = /(?:storiesOf\(')(.+)(?:',)/g
  let storiesOfMatch = storiesOf.exec(story)

  let add = /(?:add\(')(.+)(?:',)/gim
  let addMatch = add.exec(story)
  while (addMatch !== null) {
    data.storybookParams.push({
      path: 'Storybook/' + addMatch[1],
      params: '?selectedKind=' + encodeURI(storiesOfMatch[1]) + '&selectedStory=' + encodeURI(addMatch[1])
    })
    addMatch = add.exec(story)
  }

  // Render template.
  Twig.renderFile(path.join(__dirname, '/README_template.md'), data, (err, html) => {
    if (err) {
      console.log(err)
    } else {
      // Strip comments & write.
      html = html.replace(/<!--(.*?)-->\n/gi, '')
      fs.writeFileSync(directory + 'README.md', html)
    }
  })
}

// Get all packages and generate.
let packages = glob.readdirSync('./packages/**/package.json')
packages.forEach(item => {
  let packagePath = item.substr(0, (item.lastIndexOf('/') + 1))
  generateTemplate('./' + packagePath)
})
