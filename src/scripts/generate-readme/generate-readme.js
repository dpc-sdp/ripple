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
let { getImportStatements, getImportStatementFromJS } = require('./get-imports')

function getStoryOutline (story) {
  let storiesOf = /(?:storiesOf\(')([A-Za-z\/\s()]+)(?:',)/g
  let storyMatch = storiesOf.exec(story)
  let stories = []

  while (storyMatch !== null) {
    stories.push({
      storyName: storyMatch[1],
      storyIndex: storyMatch.index,
      add: []
    })
    storyMatch = storiesOf.exec(story)
  }

  for (let i = 0; i < stories.length; i++) {
    const element = stories[i]
    const strStart = element.storyIndex
    const strEnd = (i < stories.length - 1) ? stories[i+1].storyIndex : story.length
    // Check for adds
    const subStory = story.substring(strStart, strEnd)
    let add = /(?:add\([\n\s]*)(?:')(.+)(?:',)/gim
    let addMatch = add.exec(subStory)
    while (addMatch !== null) {
      const storyMatching = element.storyName.toLowerCase().replace(/\(|\)/g, '').replace(/\s|\/|\\/g, '-')
      const addMatching = addMatch[1].toLowerCase().replace(/\(|\)/g, '').replace(/\s|\/|\\/g, '-')
      stories[i].add.push({
        path: `Storybook/${element.storyName}/${addMatch[1].replace('\\', '')}`,
        params: `?path=/story/${storyMatching}--${addMatching}`
      })
      addMatch = add.exec(subStory)
    }
  }
  return stories
}

function generateTemplate (directory) {
  let data = {
    packageName: '',
    packageDescription: '',
    packageDependencies: '',
    packageImports: '',
    noSsrPackageImports: '',
    storybookParams: []
  }

  // Get imports.
  let imports = getImportStatements(directory + 'package.json')
  imports.forEach((importStatement, idx) => {
    let print = importStatement
    if (print.length > 80) {
      print = print.replace(/,\s/gi, ',\n  ').replace(/{ /gi, '{\n  ').replace(/ }/gi, '\n}')
    }
    data.packageImports += ((idx > 0) ? '\n' : '') + print
  })

  // Get package data.
  let file = fs.readFileSync(directory + 'package.json', 'utf8')
  let jsonFile = JSON.parse(file)

  data.packageName = wrap(jsonFile.name)
  data.packageDescription = wrap(jsonFile.description)

  // Get no-ssr imports.
  if (fs.existsSync(directory + 'no-ssr/index.js')) {
    let nossrImport = fs.readFileSync(directory + 'no-ssr/index.js', 'utf-8')
    const nossrImports = getImportStatementFromJS(nossrImport, data.packageName + '/no-ssr')
    nossrImports.forEach((importStatement, idx) => {
      let print = importStatement
      if (print.length > 80) {
        print = print.replace(/,\s/gi, ',\n  ').replace(/{ /gi, '{\n  ').replace(/ }/gi, '\n}')
      }
      data.noSsrPackageImports += ((idx > 0) ? '\n' : '') + print
    })
  }

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
  let storyFile = fs.readFileSync(directory + 'stories.js', 'utf8')
  let stories = getStoryOutline(storyFile)

  stories.forEach(story => {
    story.add.forEach(add => {
      data.storybookParams.push(add)
    })
  })

  // Add check for no-ssr folder.

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
let packages = glob.readdirSync('../packages/components/**/package.json')
packages.forEach(item => {
  let packagePath = item.substr(0, (item.lastIndexOf('/') + 1))
  generateTemplate('./' + packagePath)
})
