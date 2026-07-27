import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { components } from '../components.config.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const packageJsonPath = path.resolve(__dirname, '../package.json')

const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'))

const nextExports = {
  '.': packageJson.exports['.']
}

for (const [name, component] of Object.entries(components)) {
  nextExports[`./${name}`] = {
    types: component.export.replace(/\.js$/, '.d.ts'),
    import: component.export,
    default: component.export
  }
}

packageJson.exports = nextExports

await fs.writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)