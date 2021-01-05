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
 * Script expects to be called via yarn in the root directory:
 *
 *   `yarn run docs:storybook`
 */

let Twig = require('twig')
let fs = require('fs')
let path = require('path')
let glob = require('glob-fs')({ gitignore: true })
let wrap = require('wordwrap')(80)
let { getImportStatements, getImportStatementFromJS } = require('./get-imports')

/**
 * Find all component packages and load the package.json.
 */
function bootstrap () {
  const packages = glob.readdirSync('../packages/components/**/package.json')
  packages.forEach(item => {
    const packagePath = item.substr(0, (item.lastIndexOf('/') + 1))
    const directory = './' + packagePath
    const loadedPackageJSON = fs.readFileSync(`${directory}package.json`, 'utf8')
    const packageJSON = JSON.parse(loadedPackageJSON)
    loadAndPopulateReadMe(packageJSON, directory)
  })
}

/**
 * Find and generate a README.md for each component.
 * @param {Object} packageJSON package.json
 * @param {String} directory directory of package.json
 */
function loadAndPopulateReadMe (packageJSON, directory) {
  if (fs.existsSync(`${directory}README.md`)) {
    // Modify an existing readme
    const loadedReadme = fs.readFileSync(`${directory}README.md`, 'utf8')
    let replacedHTML = replaceGeneratedContent(loadedReadme, packageJSON, directory)
    writeReadme(directory, replacedHTML)
  } else {
    // Create a new readme
    let newHTML = tags.full.generate(packageJSON, directory)
    newHTML = `${tags.full.start}\n${newHTML}${tags.full.end}\n`
    writeReadme(directory, newHTML)
  }
}

/**
 * Find and replace all tags in a readme document.
 * @param {String} readme readme file contents
 * @param {Object} packageJSON package.json
 * @param {String} directory directory of package.json
 */
function replaceGeneratedContent (readme, packageJSON, directory) {
  let workingReadme = readme
  for (const type in tags) {
    const tag = tags[type]
    const tagStartPos = workingReadme.indexOf(tag.start) + tag.start.length
    const tagEndPos = workingReadme.indexOf(tag.end)
    if (tagStartPos > 0 && tagEndPos > 0) {
      let newReadme = ''
      newReadme += workingReadme.substring(0, tagStartPos)
      newReadme += '\n'
      newReadme += tag.generate(packageJSON, directory)
      newReadme += '\n'
      newReadme += workingReadme.substring(tagEndPos)
      workingReadme = newReadme
    }
  }
  return workingReadme
}

/**
 * Parse a stories.js file and extract all stories.
 * Generate a name and a storybook query string for each.
 * @param {String} story storybook 'stories.js' file
 */
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

/**
 * Strip the comment from a HTML string.
 */
function stripHtmlComments (html) {
  return html.replace(/<!--(.*?)-->\n/gi, '')
}

/**
 * Write a readme to a file.
 * @param {String} directory
 * @param {String} readme
 */
function writeReadme (directory, readme) {
  fs.writeFileSync(directory + 'README.md', readme)
}

/**
 * Define each type of documentation to generate.
 * Each documentation type can be linked to a set of <!-- tags -->.
 */
const tags = {
  full: {
    start: '<!-- GENERATED_DOCS -->',
    end: '<!-- /GENERATED_DOCS -->',
    generate: (packageJSON, directory) => {
      const divider = '\n--------------------------------------------------------------------------------\n\n'
      let html = ''
      html += tags.title.generate(packageJSON, directory)
      html += `\n`
      html += tags.description.generate(packageJSON, directory)
      html += divider
      html += tags.install.generate(packageJSON, directory)
      html += divider
      html += tags.dependencygraph.generate(packageJSON, directory)
      html += divider
      html += tags.import.generate(packageJSON, directory)
      html += divider
      html += tags.usageandtests.generate(packageJSON, directory)
      html += divider
      html += tags.license.generate(packageJSON, directory)
      return html
    }
  },
  title: {
    start: '<!-- GENERATED_TITLE -->',
    end: '<!-- /GENERATED_TITLE -->',
    twig: Twig.twig({
      data: fs.readFileSync(path.join(__dirname, '/template_title.md'), 'utf-8')
    }),
    generate: (packageJSON, directory) => {
      let name = wrap(packageJSON.name)
      return stripHtmlComments(tags.title.twig.render({ packageName: name }))
    }
  },
  description: {
    start: '<!-- GENERATED_DESCRIPTION -->',
    end: '<!-- /GENERATED_DESCRIPTION -->',
    twig: Twig.twig({
      data: fs.readFileSync(path.join(__dirname, '/template_description.md'), 'utf-8')
    }),
    generate: (packageJSON, directory) => {
      let description = wrap(packageJSON.description)
      return stripHtmlComments(tags.description.twig.render({ packageDescription: description }))
    }
  },
  install: {
    start: '<!-- GENERATED_INSTALL -->',
    end: '<!-- /GENERATED_INSTALL -->',
    twig: Twig.twig({
      data: fs.readFileSync(path.join(__dirname, '/template_install.md'), 'utf-8')
    }),
    generate: (packageJSON, directory) => {
      return stripHtmlComments(tags.install.twig.render({ packageName: packageJSON.name }))
    }
  },
  dependencygraph: {
    start: '<!-- GENERATED_DEPENDENCY_GRAPH -->',
    end: '<!-- /GENERATED_DEPENDENCY_GRAPH -->',
    twig: Twig.twig({
      data: fs.readFileSync(path.join(__dirname, '/template_dependency_graph.md'), 'utf-8')
    }),
    generate: (packageJSON, directory) => {
      let dependencyGraph = ''
      let deps = []
      for (let key in packageJSON.dependencies) {
        deps.push(key)
      }
      for (let i = 0; i < deps.length; i++) {
        const key = deps[i]
        if (i < deps.length - 1) {
          dependencyGraph += '├── ' + key + '\n'
        } else {
          dependencyGraph += '└── ' + key
        }
      }
      return stripHtmlComments(tags.dependencygraph.twig.render({
        packageName: packageJSON.name,
        packageDependencies: dependencyGraph
      }))
    }
  },
  import: {
    start: '<!-- GENERATED_IMPORT -->',
    end: '<!-- /GENERATED_IMPORT -->',
    twig: Twig.twig({
      data: fs.readFileSync(path.join(__dirname, '/template_import.md'), 'utf-8')
    }),
    generate: (packageJSON, directory) => {
      let importString = ''
      let imports = getImportStatements(directory + 'package.json')
      imports.forEach((importStatement, idx) => {
        let print = importStatement
        if (print.length > 80) {
          print = print.replace(/,\s/gi, ',\n  ').replace(/{ /gi, '{\n  ').replace(/ }/gi, '\n}')
        }
        importString += ((idx > 0) ? '\n' : '') + print
      })
      // Get no-ssr imports.
      let noSSRImports = ''
      if (fs.existsSync(directory + 'no-ssr/index.js')) {
        let nossrImport = fs.readFileSync(directory + 'no-ssr/index.js', 'utf-8')
        const nossrImports = getImportStatementFromJS(nossrImport, packageJSON.name + '/no-ssr')
        nossrImports.forEach((importStatement, idx) => {
          let print = importStatement
          if (print.length > 80) {
            print = print.replace(/,\s/gi, ',\n  ').replace(/{ /gi, '{\n  ').replace(/ }/gi, '\n}')
          }
          noSSRImports += ((idx > 0) ? '\n' : '') + print
        })
      }
      return stripHtmlComments(tags.import.twig.render({
        packageImports: importString,
        noSsrPackageImports: noSSRImports
      }))
    }
  },
  usageandtests: {
    start: '<!-- GENERATED_USAGE_AND_TESTS -->',
    end: '<!-- /GENERATED_USAGE_AND_TESTS -->',
    twig: Twig.twig({
      data: fs.readFileSync(path.join(__dirname, '/template_usage_and_tests.md'), 'utf-8')
    }),
    generate: (packageJSON, directory) => {
      let storybookParams = []
      try {
        let storyFile = fs.readFileSync(directory + 'stories.js', 'utf8')
        let stories = getStoryOutline(storyFile)
        stories.forEach(story => {
          story.add.forEach(add => {
            storybookParams.push(add)
          })
        })
        return stripHtmlComments(tags.usageandtests.twig.render({
          storybookParams: storybookParams
        }))
      } catch (e) {
        // TODO: Update this function after we migrated all stories to mdx in https://github.com/dpc-sdp/ripple/pull/844.
        console.error(new Error('Failed to generate "Usage and Tests" doc for ' + directory))
      }
    }
  },
  license: {
    start: '<!-- GENERATED_LICENSE -->',
    end: '<!-- /GENERATED_LICENSE -->',
    twig: Twig.twig({
      data: fs.readFileSync(path.join(__dirname, '/template_license.md'), 'utf-8')
    }),
    generate: (packageJSON, directory) => {
      return stripHtmlComments(tags.license.twig.render())
    }
  }
}

bootstrap()
