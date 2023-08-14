import { saveSprite } from './../lib/svg-icon-utils.js'
import { join } from 'pathe'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

saveSprite(
  join(__dirname, './../../src/assets/icons/core'),
  join(__dirname, './../../src/assets/icons')
)
