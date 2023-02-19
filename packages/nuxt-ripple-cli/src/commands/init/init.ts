import path from 'node:path'
import { runner, Logger } from 'hygen'
import enquirer from 'enquirer'
export default function init(projectFolder) {
  const defaultTemplates = path.join(__dirname, '_templates')
  runner(['new', 'latest', ...process.argv.slice(4)], {
    templates: defaultTemplates,
    /* @ts-ignore */
    createPrompter: () => enquirer,
    cwd: projectFolder || process.cwd(),
    logger: new Logger(console.log.bind(console)),
    debug: true
  })
}
