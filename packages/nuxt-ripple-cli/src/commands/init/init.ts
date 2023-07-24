import path from 'node:path'
import { runner, Logger } from 'hygen'
import enquirer from 'enquirer'
import objectToArgv from 'object-to-argv'

export default function init(template = 'site', projectFolder, options = {}) {
  const defaultTemplates = path.join(__dirname, '_templates')
  runner([template, 'latest', ...objectToArgv(options)], {
    templates: defaultTemplates,
    /* @ts-ignore */
    createPrompter: () => enquirer,
    cwd: projectFolder || process.cwd(),
    logger: new Logger(console.log.bind(console)),
    debug: true
  })
}
