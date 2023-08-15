import { generateIconImports } from './../lib/svg-icon-utils.js'
import { join } from 'pathe'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

generateIconImports(
  join(__dirname, './../../src/assets/icons/custom'),
  join(__dirname, './../../src/assets/icons/custom.js')
)
