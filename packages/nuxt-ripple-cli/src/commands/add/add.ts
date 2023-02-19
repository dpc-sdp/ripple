import path from 'node:path'
import { runner, Logger } from 'hygen'
import enquirer from 'enquirer'
import helpers from './helpers'

export default function add(template, directory, options) {
  const defaultTemplates = path.join(__dirname, '_templates')
  runner(
    [
      'add',
      template,
      ...Object.entries(options)
        .map((option) => [`--${option[0]}`, option[1]])
        .flat()
    ],
    {
      templates: defaultTemplates,
      helpers,
      /* @ts-ignore */
      createPrompter: () => enquirer,
      cwd: directory || process.cwd(),
      logger: new Logger(console.log.bind(console)),
      debug: true
    }
  )
}
